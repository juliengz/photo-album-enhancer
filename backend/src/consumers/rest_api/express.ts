/* eslint-disable no-unused-vars */

import { runInThisContext } from 'vm';
import express, { Express } from 'express';
import { Command } from '../../core/authentication/use_cases/commands/command';
import { CreateUserPayload } from '../../core/authentication/use_cases/commands/create_user';
import {
    GetUserFromTokenPayload,
    UserDTO,
} from '../../core/authentication/use_cases/queries/get_user_from_token';
import { Query } from '../../core/authentication/use_cases/queries/query';
import { SignInPayload } from '../../core/authentication/use_cases/queries/sign_in';
import { AuthenticationRouter } from './routers/authentication_router';
import { rootRouter } from './routers/root';

export interface RestApiConfig {
    port: string,
    isProduction: boolean,
}

export class RestApi {
    private readonly app: Express;

    constructor(
        // Authentication usecases
        private createUser: Command<CreateUserPayload, void>,
        private signIn: Query<SignInPayload, void>,
        private isAuhenticated: Query<any, Promise<boolean>>,
        private getUserFromToken: Query<GetUserFromTokenPayload, Promise<UserDTO>>,

        // Config
        private config: RestApiConfig,
    ) {
        this.createUser = createUser;
        this.signIn = signIn;
        this.isAuhenticated = isAuhenticated;
        this.getUserFromToken = getUserFromToken;

        this.app = express();
        this.init();
    }

    init() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(rootRouter);
        this.app.use(new AuthenticationRouter(
            this.createUser,
            this.signIn,
            this.isAuhenticated,
            this.getUserFromToken,
        ).getRouter());
    }

    start() {
        this.app.listen(this.config.port, () => {
            console.info(`⚡️[Rest Api]: Ready at http://localhost:${this.config.port}`);
        });
    }
}
