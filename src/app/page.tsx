import { api } from "@/lib/fetcher";
import DocumentList from "./components/DocumentList";
import { decodeObject } from "@/lib/helper";

const DEFAULT_PAGE_SIZE = 10;

export default async function DocumentManagement({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const folderPath = params.folderPath
    ? decodeObject(params.folderPath as string)
    : [
        {
          name: "Root",
          parentId: null,
        },
      ];

  const documentPaginationRes = await api("/document/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      skip: (page - 1) * DEFAULT_PAGE_SIZE,
      limit: DEFAULT_PAGE_SIZE,
      parentId: folderPath[folderPath.length - 1].parentId,
    }),
  });

  return (
    <main>
      <DocumentList
        data={documentPaginationRes.data}
        currentPage={documentPaginationRes.currentPage}
        totalPages={documentPaginationRes.totalPages}
        folderPath={folderPath}
      />
    </main>
  );
}
