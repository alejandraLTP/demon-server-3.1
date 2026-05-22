import { Request, Response } from "express";
import { maintainSSEConnection } from "../../utils/sseHandler";

export const connectSSE = (req: Request, res: Response) => {
  maintainSSEConnection(res);
};
