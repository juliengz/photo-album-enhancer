/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import { TokenProvider } from '../../core/authentication/services/token_provider';
import { expectedId } from '../id_generator/iuid_provider_stub';

export const expectedToken = 'valid_token';

export class JwtTokenProviderStub implements TokenProvider {
    generateToken(token: string): Promise<string> {
        return Promise.resolve(expectedToken);
    }

    verifyToken(token: string): Promise<boolean> {
        if (token === expectedToken) return Promise.resolve(true);

        return Promise.resolve(false);
    }

    decodeToken(token: string): any {
        return {
            id: expectedId,
        };
    }
}
