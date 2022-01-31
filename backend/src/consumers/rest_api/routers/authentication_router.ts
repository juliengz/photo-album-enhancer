import { Request, Response, Router } from 'express';
import { Command } from '../../../core/authentication/use_cases/commands/command';
import { CreateUserPayload } from '../../../core/authentication/use_cases/commands/create_user';
import { GetUserFromTokenPayload, UserDTO } from '../../../core/authentication/use_cases/queries/get_user_from_token';
import { IsAuthenticatedPayload } from '../../../core/authentication/use_cases/queries/is_authenticated';
import { Query } from '../../../core/authentication/use_cases/queries/query';
import { SignInPayload } from '../../../core/authentication/use_cases/queries/sign_in';
import { isAuthorized } from '../middleware/isAuthorized';
import { RestApiRouter } from './router_interface';

export class AuthenticationRouter implements RestApiRouter {
    private router: Router = Router();

    constructor(
        private createUser: Command<CreateUserPayload, void>,
        private signIn: Query<SignInPayload, void>,
        private isAuthenticated: Query<IsAuthenticatedPayload, Promise<boolean>>,
        private getUserFromToken: Query<GetUserFromTokenPayload, Promise<UserDTO>>,
    ) {
        this.createUser = createUser;
        this.signIn = signIn;
        this.isAuthenticated = isAuthenticated;
        this.getUserFromToken = getUserFromToken;
        this.loadRoutes();
    }

    private loadRoutes(): void {
        this.router.post(
            '/sign-up',
            async (req: Request, res:Response) => {
                const { email, password } = req.body;

                try {
                    this.createUser.execute({ email, password });

                    return res.status(200).send('User created');
                } catch (error) {
                    return res.status(400).send(error);
                }
            },
        );

        this.router.post(
            '/sign-in',
            async (req: Request, res:Response) => {
                const { email, password } = req.body;

                try {
                    const response = await this.signIn.execute({ email, password });

                    return res.status(200).send(response);
                } catch (error) {
                    return res.status(400).send(error);
                }
            },
        );

        this.router.get(
            '/me',
            isAuthorized(this.isAuthenticated),
            async (req: Request, res:Response) => {
                const authHeader = req.headers.authorization;

                if (authHeader) {
                    try {
                        const token = authHeader.split(' ')[1];
                        const response = await this.getUserFromToken.execute({ token });

                        return res.status(200).send(response);
                    } catch (error) {
                        return res.status(400).send(error);
                    }
                }

                return res.status(401).send();
            },
        );
    }

    getRouter(): Router {
        return this.router;
    }
}
