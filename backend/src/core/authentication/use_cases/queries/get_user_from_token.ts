import { UserNotFound } from '../../errors/user_not_found';
import { UserRepository } from '../../repositories/user_repository';
import { TokenProvider } from '../../services/token_provider';
import { Query } from './query';

export interface UserDTO {
    email: string;
  }

export interface GetUserFromTokenPayload {
    token: string;
  }

export class GetUserFromToken implements Query<GetUserFromTokenPayload, Promise<UserDTO>> {
    constructor(
        private userRepository: UserRepository,
        private authTokenProvider: TokenProvider,
    ) {
        this.userRepository = userRepository;
        this.authTokenProvider = authTokenProvider;
    }

    async execute(payload: GetUserFromTokenPayload): Promise<UserDTO> {
        const decodedToken = this.authTokenProvider.decodeToken(payload.token);

        const user = await this.userRepository.findById(decodedToken.id);

        if (!user) throw new UserNotFound();

        return {
            email: user.email.toString(),
        };
    }
}
