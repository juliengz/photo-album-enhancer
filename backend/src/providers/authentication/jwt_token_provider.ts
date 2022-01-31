/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import jwt, { VerifyErrors } from 'jsonwebtoken';
import { User } from '../../core/authentication/domain/models/user';
import { TokenProvider } from '../../core/authentication/services/token_provider';

export const JWT_SECRET_TOKEN_KEY = 'secret_token_key!';
export const JWT_TOKEN_EXPIRATION_TIME = '30d';

export class JwtTokenProvider implements TokenProvider {
    async generateToken(user: User): Promise<string> {
        return jwt.sign(
            { id: user.id, name: user.email.toString() },
            JWT_SECRET_TOKEN_KEY,
            { expiresIn: JWT_TOKEN_EXPIRATION_TIME },
        );
    }

    decodeToken(token: string): any {
        return jwt.verify(token, JWT_SECRET_TOKEN_KEY);
    }

    async verifyToken(token: string): Promise<boolean> {
        let isVerified = false;

        jwt.verify(token, JWT_SECRET_TOKEN_KEY, (err: VerifyErrors | null) => {
            if (err) {
                return;
            }

            isVerified = true;
        });

        return isVerified;
    }
}
