export interface CreateFolderPayload {
  userId: string;
  name: string;
  parentId?: string;
}

export interface UpdateFolderPayload {
  userId: string;
  folderId: string;
  name: string;
}