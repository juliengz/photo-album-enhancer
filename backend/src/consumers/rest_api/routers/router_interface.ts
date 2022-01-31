import { Router } from 'express';

export interface RestApiRouter{
    getRouter(): Router
}
