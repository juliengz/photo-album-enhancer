/* eslint-disable class-methods-use-this */

import bcrypt from 'bcrypt';
import { PasswordHasher } from '../../core/authentication/services/password_hasher';

export default class BcryptHasher implements PasswordHasher {
    hash(plainValue: string): string {
        return bcrypt.hashSync(plainValue, 10);
    }

    async compare(plainValue: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plainValue, hash);
    }
}
