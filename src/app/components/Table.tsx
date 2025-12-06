import { ChevronDown, FileText, Folder, MoreVertical } from "lucide-react";

type TTableProps = {
  columns: any[];
  data: any[];
  onRowClick: (row: any) => void;
};

const Table: React.FC<TTableProps> = ({ columns, data, onRowClick }) => {
  function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 B";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;

    const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];

    const index = Math.floor(Math.log(bytes) / Math.log(k));

    const value = bytes / Math.pow(k, index);

    return parseFloat(value.toFixed(dm)) + " " + sizes[index];
  }

  function formatDate(dateInput: string | number | Date): string {
    const date = new Date(dateInput);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // Apr
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 py-3 text-left text-sm font-medium ${
                  col.className || ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {col.label}
                  {col.sortable && <ChevronDown size={16} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr
              key={row.id}
              onDoubleClick={() => {
                onRowClick(row);
              }}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <td className="px-4 py-3 w-8">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
