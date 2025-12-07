"use client";
import { useEffect, useState } from "react";
import { Input, Pagination, Table } from "@/app/components";
import { useRouter, useSearchParams } from "next/navigation";
import { encodeObject } from "@/lib/helper";
import { AddFolderModel } from "./AddFolder";
import { UploadFile } from "./UploadFile";
import { TDocument } from "@/types/document.type";
import { TFolderPath } from "@/types/folder-path.type";

const DocumentList: React.FC<{
  data: TDocument[];
  currentPage: number;
  totalPages: number;
  folderPath: TFolderPath[];
}> = ({ data, currentPage, totalPages, folderPath }) => {
  const param = useSearchParams();
  const searchParam = param.get("search");

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const showCompletePath = Boolean(searchParam);

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { label: "Created by" },
    { key: "createdAt", label: "Date", sortable: true },
    { label: "File size" },
    { label: "", className: "w-12" },
  ];

  const navigate = ({
    nFolderPath = folderPath,
    page = currentPage,
    search = searchParam,
  }) => {
    const encodeStr = encodeObject(nFolderPath);
    let url = `/?page=${page}&folderPath=${encodeStr}`;
    if (search) {
      url += `&search=${search}`;
    }
    router.push(url);
  };

  const handleRowClick = (doc: TDocument) => {
    if (doc.type === "folder") {
      const newFolderPath = [...folderPath];
      newFolderPath.push({
        name: doc.name,
        parentId: doc.id,
      });
      navigate({ nFolderPath: newFolderPath });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if ((!searchParam && !searchQuery) || searchParam === searchQuery) {
        return;
      }

      navigate({
        search: searchQuery,
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-6">Documents</h1>

          <div className="grid grid-cols-12 items-center justify-between gap-4 sm:flex">
            <div className="sm:flex-1 col-span-full sm:max-w-md">
              <Input
                placeholder="Search"
                iconName={"search"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <UploadFile
                parentId={folderPath[folderPath.length - 1].parentId}
                dirName={folderPath[folderPath.length - 1].name}
              />
              <AddFolderModel
                parentId={folderPath[folderPath.length - 1].parentId}
                dirName={folderPath[folderPath.length - 1].name}
              />
            </div>
          </div>
        </div>
        <div>
          {!showCompletePath &&
            folderPath.map((pathDetail, i) => {
              if (i === folderPath.length - 1) {
                return (
                  <span
                    key={pathDetail.name + i}
                    className="px-2 py-1 text-primary"
                  >
                    {pathDetail.name}
                  </span>
                );
              }
              return (
                <span
                  className="text-muted-foreground"
                  key={pathDetail.name + i}
                >
                  <span
                    className="hover:bg-gray-100 cursor-pointer px-2 y-1 rounded-sm"
                    onClick={() => {
                      const nFolderPath = folderPath.slice(0, i + 1);
                      navigate({ nFolderPath });
                    }}
                  >
                    {pathDetail.name}
                  </span>
                  <span> &gt; </span>
                </span>
              );
            })}
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table
            columns={columns}
            data={data}
            onRowClick={handleRowClick}
            showCompletePath={showCompletePath}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              navigate({ nFolderPath: folderPath, page });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
