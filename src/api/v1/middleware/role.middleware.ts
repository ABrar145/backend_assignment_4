import { Request, Response, NextFunction } from "express";

const authorizeRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

export default authorizeRole;
