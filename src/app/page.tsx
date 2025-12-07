import { api } from "@/lib/fetcher";
import DocumentList from "./components/DocumentList";
import { decodeObject } from "@/lib/helper";
import { TPagination } from "@/types/pagination.type";
import { TDocument } from "@/types/document.type";
import { TFolderPath } from "@/types/folder-path.type";

const DEFAULT_PAGE_SIZE = 10;

export default async function DocumentManagement({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const search = params.search ?? null;
  const folderPath: TFolderPath[] = params.folderPath
    ? decodeObject(params.folderPath as string)
    : [
        {
          name: "Root",
          parentId: null,
        },
      ];
  const documentPaginationRes: TPagination<TDocument> = await api(
    "/document/list",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
        limit: DEFAULT_PAGE_SIZE,
        parentId: search
          ? undefined
          : folderPath[folderPath.length - 1].parentId,
        search,
      }),
    }
  );

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
