import { Role } from "../../generated/prisma/enums";

declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      role: Role;
    }

    interface Request {
      user?: UserPayload;
      file?: Multer.File;
    }
  }
}

export {};