import { FileType } from "../../../generated/prisma/enums";

export type CreatePackagePayload = {
  name: string;
  maxFolders: number;
  maxNestingLevel: number;
  allowedFileTypes: FileType[];
  maxFileSizeMB: number;
  totalFileLimit: number;
  filesPerFolder: number;
};

export type UpdatePackagePayload = {
  name?: string;
  maxFolders?: number;
  maxNestingLevel?: number;
  allowedFileTypes?: FileType[];
  maxFileSizeMB?: number;
  totalFileLimit?: number;
  filesPerFolder?: number;
};
