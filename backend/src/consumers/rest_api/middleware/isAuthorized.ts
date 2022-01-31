/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { IsAuthenticatedPayload } from '../../../core/authentication/use_cases/queries/is_authenticated';
import { Query } from '../../../core/authentication/use_cases/queries/query';

export const isAuthorized = (isAuthenticated: Query<IsAuthenticatedPayload, Promise<boolean>>) => async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        if (await isAuthenticated.execute({ token })) {
            next();
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
};
