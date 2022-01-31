import { TokenProvider } from '../../services/token_provider';
import { Query } from './query';

export type IsAuthenticatedPayload = {
    token: string;
}

export class IsAuthenticated implements Query<IsAuthenticatedPayload, Promise<boolean>> {
    constructor(
        private authTokenProvider: TokenProvider,
    ) {
        this.authTokenProvider = authTokenProvider;
    }

    async execute(payload: IsAuthenticatedPayload): Promise<boolean> {
        return this.authTokenProvider.verifyToken(payload.token);
    }
}
