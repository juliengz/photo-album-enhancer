/* eslint-disable no-unused-vars */

import { User } from '../domain/models/user';
import { Repository } from './repository';

export interface UserRepository extends Repository<User> {
    findByEmail(email: string): Promise<User | null>;
}
