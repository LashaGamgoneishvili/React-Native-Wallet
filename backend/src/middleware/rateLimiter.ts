import { Request, Response, NextFunction } from "express";
import ratelimit from "../config/upstash.js";

const ratelimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // In a real app, prefer a per-user or per-IP key.
    // Example: const key = req.user?.id ?? req.ip;
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      res
        .status(429)
        .json({ message: "Too many requests, please try again later" });
      return;
    }

    next();
  } catch (error) {
    console.error("Rate limit error", error);
    next(error);
  }
};

export default ratelimiter;
