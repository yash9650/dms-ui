import { formatBytes, formatDate } from "@/lib/helper";
import { TDocument } from "@/types/document.type";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  FileText,
  Folder,
  MoreVertical,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TTableProps = {
  columns: any[];
  data: TDocument[];
  onRowClick: (row: TDocument) => void;
  showCompletePath: boolean;
};

const Table: React.FC<TTableProps> = ({
  columns,
  data,
  onRowClick,
  showCompletePath,
}) => {
  const [sortBy, setSortBy] = useState<{
    key: keyof TDocument;
    order: "asc" | "desc";
  } | null>(null);

  const [selectedRows, setSelectedRows] = useState(new Set<number>());
  let clickTimer: NodeJS.Timeout | null = null;
  const checkboxRef = useRef<any>(null);

  function sort(): TDocument[] {
    const sortedData = [...data];
    if (!sortBy) return sortedData;
    sortedData.sort((a, b) => {
      switch (sortBy.key) {
        case "createdAt":
          const aTime = new Date(a.createdAt).getTime();
          const bTime = new Date(b.createdAt).getTime();

          return sortBy.order === "asc" ? aTime - bTime : bTime - aTime;
        default:
          return sortBy.order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
      }
    });
    return sortedData;
  }

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((doc) => doc.id)));
    }
  };

  function handleRowSelect(id: number) {
    setSelectedRows((old) => {
      const newSelected = new Set(old);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate =
        selectedRows.size > 0 && selectedRows.size < data.length;
    }
  }, [selectedRows]);

  useEffect(() => {
    setSortBy(null);
    setSelectedRows(new Set());
  }, [data]);

  return (
    <div className="overflow-x-auto min-h-[575px]">
      <table className="w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th>
              <input
                type="checkbox"
                ref={checkboxRef}
                disabled={data.length === 0}
                checked={selectedRows.size === data.length && data.length != 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 py-3 text-left text-sm font-medium ${
                  col.className || ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {col.label}
                  {col.sortable && sortBy?.key !== col.key && (
                    <ArrowUpDown
                      size={16}
                      onClick={() => {
                        setSortBy({
                          key: col.key,
                          order: "asc",
                        });
                      }}
                    />
                  )}
                  {col.sortable && sortBy?.key === col.key && (
                    <>
                      {sortBy?.order === "asc" ? (
                        <ChevronUp
                          size={16}
                          onClick={() => {
                            setSortBy({
                              key: col.key,
                              order: "desc",
                            });
                          }}
                        />
                      ) : (
                        <ChevronDown
                          size={16}
                          onClick={() => {
                            setSortBy(null);
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="h-[550px] text-center align-middle">
                <strong>No data available</strong>
                <span className="block text-muted-foreground">
                  Add new files and folders
                </span>
              </td>
            </tr>
          )}
          {sort().map((row) => (
            <tr
              key={row.id}
              onDoubleClick={() => {
                onRowClick(row);
              }}
              onClick={(e) => {
                if (e.detail === 2) {
                  if (clickTimer) clearTimeout(clickTimer);
                  clickTimer = null;
                  onRowClick(row);
                  return;
                }

                clickTimer = setTimeout(() => {
                  handleRowSelect(row.id);
                  clickTimer = null;
                }, 200);
              }}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <td className="px-4 py-3 w-8">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedRows.has(row.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleRowSelect(row.id);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {row.type === "folder" ? (
                    <Folder className="text-yellow-500" size={20} />
                  ) : (
                    <FileText className="text-blue-500" size={20} />
                  )}
                  <span className="text-sm text-gray-900">{row.name}</span>
                </div>
                {showCompletePath && (
                  <span className="block text-xs text-muted-foreground">
                    {"Root/" + row.completePath}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">John Doe</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {formatDate(row.createdAt)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {row.fileSize ? formatBytes(row.fileSize) : "-"}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <MoreVertical size={18} className="text-gray-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
