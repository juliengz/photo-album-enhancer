import { Request, Response, Router } from 'express';

export const rootRouter = Router();

rootRouter.get('/', (req: Request, res: Response) => res.send('⚡️[Rest Api]: Ready'));
