declare global {
  namespace Express {
    interface Request {
      endUser?: Token;
      customFolder?: string;
    }
  }
}

export type JwtPayload = {
  userId?: string;
  username: string;
  createdAt: Date;
  iat?: number;
  exp?: number;
};
