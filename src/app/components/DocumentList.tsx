"use client";
import { useState } from "react";
import { Button, Input, Pagination, Table } from "@/app/components";
import { useRouter } from "next/navigation";
import { encodeObject } from "@/lib/helper";
import { AddFolderModel } from "./AddFolder";
import { UploadFile } from "./UploadFile";

const DocumentList: React.FC<{
  data: any[];
  currentPage: number;
  totalPages: number;
  folderPath: any[];
}> = ({ data, currentPage, totalPages, folderPath }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const columns = [
    { label: "", className: "w-8" },
    { label: "Name", sortable: true },
    { label: "Created by", sortable: true },
    { label: "Date", sortable: true },
    { label: "File size", sortable: true },
    { label: "", className: "w-12" },
  ];

  const navigate = (nFolderPath = folderPath, page = currentPage) => {
    const encodeStr = encodeObject(nFolderPath);
    router.push(`/?page=${page}&folderPath=${encodeStr}`);
  };

  const handleRowClick = (doc: any) => {
    if (doc.type === "folder") {
      const newFolderPath = [...folderPath];
      newFolderPath.push({
        name: doc.name,
        parentId: doc.id,
      });
      navigate(newFolderPath);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-6">Documents</h1>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
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
        {/* Table */}
        <div>
          {folderPath.map((pathDetail, i) => {
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
              <span className="text-muted-foreground" key={pathDetail.name + i}>
                <span
                  className="hover:bg-gray-100 cursor-pointer px-2 y-1 rounded-sm"
                  onClick={() => {
                    const newFolderPath = folderPath.slice(0, i + 1);
                    navigate(newFolderPath);
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
          <Table columns={columns} data={data} onRowClick={handleRowClick} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              navigate(folderPath, page);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
