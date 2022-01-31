import { InvalidCredential } from '../../errors/invalid_credential';
import { UserRepository } from '../../repositories/user_repository';
import { PasswordHasher } from '../../services/password_hasher';
import { TokenProvider } from '../../services/token_provider';
import { Query } from './query';

export interface TokenDTO {
    token: string;
  }

export type SignInPayload = {
    email: string;
    password: string;
}

export class SignIn implements Query<SignInPayload, Promise<TokenDTO>> {
    constructor(
        private userRepository: UserRepository,
        private tokenProvider: TokenProvider,
        private passwordHasher: PasswordHasher,
    ) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
        this.passwordHasher = passwordHasher;
    }

    async execute(payload: SignInPayload): Promise<TokenDTO> {
        const user = await this.userRepository.findByEmail(payload.email);

        if (!user) throw new InvalidCredential();

        const matchPassword = await this.passwordHasher.compare(
            payload.password,
            user.cryptedPassword.toString(),
        );
        if (!matchPassword) throw new InvalidCredential();

        return {
            token: await this.tokenProvider.generateToken(user),
        };
    }
}
