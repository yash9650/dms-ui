import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/fetcher";
import { useState } from "react";
import { toast } from "sonner";
import FileUpload, { UploadedFile, UploadFileStatus } from "./FileUpload";
import { useRouter } from "next/navigation";

export const UploadFile: React.FC<{
  parentId: number | null;
  dirName: string;
}> = ({ parentId, dirName }) => {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const router = useRouter();

  const handleOpen = (o: boolean) => {
    if (isCreating) {
      return;
    }

    if (!o) {
      handleClose();
      return;
    }

    setOpen(true);
  };

  const handleClose = () => {
    setFiles([]);
    setIsCreating(false);
    setOpen(false);
  };

  const create = async (file: UploadedFile) => {
    const apiRes = await api("/document/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: file.file.name,
        fileSize: file.file.size,
        type: "file",
        parentId: parentId,
      }),
    })
      .then((res) => res)
      .catch((err) => {
        return err;
      });

    setFiles((old) => {
      const foundFile = old.find((f) => f.id === file.id);
      if (foundFile) {
        foundFile.status = apiRes?.id
          ? UploadFileStatus.SUCCESS
          : UploadFileStatus.ERROR;

        if (!apiRes.id) {
          foundFile.errorMessage =
            apiRes.message || apiRes.error || "Service unavailable";
        }
      }

      return [...old];
    });

    if (!apiRes?.id) {
      return false;
    }
    handleFileRemoved(file.id);
    return true;
  };

  const handleFileRemoved = (fileId: string) => {
    setFiles((prev) =>
      prev.map((item) => {
        if (!fileId) {
          return {
            ...item,
            isVanishing: true,
          };
        }
        return item.id === fileId ? { ...item, isVanishing: true } : item;
      })
    );

    setTimeout(() => {
      setFiles((prev) =>
        prev.filter((item) => (fileId ? item.id !== fileId : false))
      );
    }, 300);
  };

  const saveChanges = async () => {
    setIsCreating(true);
    const filePromises = await Promise.all(files.map((file) => create(file)));

    if (filePromises.some((s) => !s)) {
      toast.error("Failed to upload some files");
    } else {
      toast.success("Files saved successfully.");
      handleClose();
      router.refresh();
    }
    setIsCreating(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen} modal>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Upload files</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Upload new files in {dirName} directory
          </DialogDescription>
        </DialogHeader>
        <div>
          <FileUpload
            files={files}
            maxSizeMB={1000}
            onFileRemoved={(fileId) => {
              setFiles((old) => {
                const f = [...old];
                const i = f.findIndex((file) => file.id === fileId);

                if (i !== -1) {
                  f.splice(i, 1);
                }

                return f;
              });
            }}
            onFilesAdded={(files) => {
              setFiles((old) => {
                return [...old, ...files];
              });
            }}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={saveChanges}>
            {isCreating ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
