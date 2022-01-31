import { User } from '../../../core/authentication/domain/models/user';
import { UserCryptedPassword } from '../../../core/authentication/domain/models/user_crypted_password';
import { UserEmail } from '../../../core/authentication/domain/models/user_email';
import { UserNotFound } from '../../../core/authentication/errors/user_not_found';
import { GetUserFromToken } from '../../../core/authentication/use_cases/queries/get_user_from_token';
import { JwtTokenProvider } from '../../../providers/authentication/jwt_token_provider';
import { expectedId } from '../../../providers/id_generator/iuid_provider_stub';
import { InMemoryUserRepository } from '../../../providers/persistence/in_memory/in_memory_user_repository';

const userTest = User.create({
    id: expectedId,
    email: UserEmail.create({ email: 'test@test.fr' }),
    cryptedPassword: UserCryptedPassword.create({ password: '1234' }),
});

describe('GIVEN i want to retrieve a user', () => {
    let userRepository: InMemoryUserRepository;
    let tokenProvider: JwtTokenProvider;
    let getUserFromToken: GetUserFromToken;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        tokenProvider = new JwtTokenProvider();
        getUserFromToken = new GetUserFromToken(
            userRepository,
            tokenProvider,
        );
    });

    describe('WHEN user exists', () => {
        test('THEN it return expected user dto', async () => {
            userRepository.populate([userTest]);

            const token = await tokenProvider.generateToken(userTest);

            expect(
                await getUserFromToken.execute({
                    token,
                }),
            ).toEqual({
                email: 'test@test.fr',
            });
        });
    });

    describe('WHEN user does not exists', () => {
        test('THEN it throw UserNotFound error', async () => {
            // User is not persisted here
            const token = await tokenProvider.generateToken(userTest);

            await expect(
                getUserFromToken.execute({
                    token,
                }),
            ).rejects.toThrow(UserNotFound);
        });
    });
});
