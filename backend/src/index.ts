import { RestApi } from './consumers/rest_api/express';
import { CreateUser } from './core/authentication/use_cases/commands/create_user';
import { GetUserFromToken } from './core/authentication/use_cases/queries/get_user_from_token';
import { IsAuthenticated } from './core/authentication/use_cases/queries/is_authenticated';
import { SignIn } from './core/authentication/use_cases/queries/sign_in';
import { JwtTokenProvider } from './providers/authentication/jwt_token_provider';
import PasswordHasher from './providers/hashers/bcrypt_hasher';
import { UuidProvider } from './providers/id_generator/iuid_provider';
import { PostgresUserRepository } from './providers/persistence/postgres/repository/postgres_user_repository';

(async () => {
    // Providers
    const userRepository = new PostgresUserRepository();
    const passwordHasher = new PasswordHasher();
    const uuidProvider = new UuidProvider();
    const tokenProvider = new JwtTokenProvider();

    // Use cases
    const createUser = new CreateUser(userRepository, passwordHasher, uuidProvider);
    const signIn = new SignIn(userRepository, tokenProvider, passwordHasher);
    const isAuthenticated = new IsAuthenticated(tokenProvider);
    const getuserFromToken = new GetUserFromToken(userRepository, tokenProvider);

    const restApi = new RestApi(
        createUser,
        signIn,
        isAuthenticated,
        getuserFromToken,
        {
            port: '8000',
            isProduction: false,
        },
    );
    restApi.start();
})();
