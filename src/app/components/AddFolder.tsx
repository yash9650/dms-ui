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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const AddFolderModel: React.FC<{
  parentId: number;
  dirName: string;
}> = ({ parentId, dirName }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
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
    setName("");
    setIsCreating(false);
    setOpen(false);
  };

  const create = async () => {
    setIsCreating(true);
    const apiRes = await api("/document/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        type: "folder",
        parentId: parentId,
      }),
    })
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });

    if (apiRes?.id) {
      toast.success("Folder created successfully.");
      handleClose();
      router.refresh();
    } else {
      setIsCreating(false);

      toast.error(apiRes.error || "Service unavailable", {
        description: apiRes.message || "Service unavailable",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen} modal>
      <DialogTrigger asChild>
        <Button size={"lg"}>Add new folder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create folder</DialogTitle>
          <DialogDescription>
            Create a new folder in {dirName} directory
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Folder name</Label>
            <Input
              id="name-1"
              name="folder name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={create}>
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
