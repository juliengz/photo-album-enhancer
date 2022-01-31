import { User } from '../../../core/authentication/domain/models/user';
import {
    UserRepository,
} from '../../../core/authentication/repositories/user_repository';

export class InMemoryUserRepository implements UserRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    async persist(user: User): Promise<void> {
        this.users.push(user);
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findById(id: string): Promise<User | null> {
        const founduser = this.users.find((user) => user.id === id);

        return founduser || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const founduser = this.users.find((user) => user.email.toString() === email);

        return founduser || null;
    }

    async exists(user: User): Promise<boolean> {
        return (await this.findById(user.id)) != null;
    }

    populate(users: User[]):void {
        this.users = users;
    }
}
