import { User } from '../../domain/models/user';
import { UserCryptedPassword } from '../../domain/models/user_crypted_password';
import { UserEmail } from '../../domain/models/user_email';
import { UserWithEmailExists } from '../../errors/user_with_email_exists';
import { UserRepository } from '../../repositories/user_repository';
import { PasswordHasher } from '../../services/password_hasher';
import { UniqueIdProvider } from '../../services/unique_id_provider';
import { Command } from './command';

export type CreateUserPayload = {
    email: string;
    password: string;
}

export class CreateUser implements Command<CreateUserPayload, void> {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: PasswordHasher,
        private idProvider: UniqueIdProvider,
    ) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.idProvider = idProvider;
    }

    async execute(payload: CreateUserPayload): Promise<void> {
        const userWithEmail = await this.userRepository.findByEmail(payload.email);

        if (userWithEmail) {
            throw new UserWithEmailExists(`User with Email "${payload.email}" already exists`);
        }

        const id = this.idProvider.generateId();
        const email = UserEmail.create({ email: payload.email });
        const cryptedPassword = UserCryptedPassword.create({ password: this.passwordHasher.hash(payload.password) });

        const user = User.create({
            id,
            email,
            cryptedPassword,
        });

        await this.userRepository.persist(user);
    }
}
