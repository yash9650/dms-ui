import { DocumentType } from "./document-type.enum";

export type TDocument = {
  id: number;
  type: DocumentType;
  name: string;
  completePath: string;
  fileSize: number;
  parentId?: number;
  createdAt: Date;
  updatedAt: Date;
};
