import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth"; 
import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma/enums";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
      };
    }
  }
}

export const protect = (requiredRole?: Role) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session?.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = {
        id: user.id,
        role: user.role,
      };

      next();
    } catch (error) {
      console.error("Auth Error:", error);
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};