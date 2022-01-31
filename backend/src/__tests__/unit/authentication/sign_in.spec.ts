import { User } from '../../../core/authentication/domain/models/user';
import { UserCryptedPassword } from '../../../core/authentication/domain/models/user_crypted_password';
import { UserEmail } from '../../../core/authentication/domain/models/user_email';
import { InvalidCredential } from '../../../core/authentication/errors/invalid_credential';
import { PasswordHasher } from '../../../core/authentication/services/password_hasher';
import { SignIn } from '../../../core/authentication/use_cases/queries/sign_in';
import { JwtTokenProviderStub, expectedToken } from '../../../providers/authentication/jwt_token_provider_stub';
import BcryptHasher from '../../../providers/hashers/bcrypt_hasher';
import { expectedId } from '../../../providers/id_generator/iuid_provider_stub';
import { InMemoryUserRepository } from '../../../providers/persistence/in_memory/in_memory_user_repository';

describe('GIVEN i want to sign in', () => {
    let userRepository: InMemoryUserRepository;
    let tokenProvider: JwtTokenProviderStub;
    let passwordHasher: PasswordHasher;
    let signIn: SignIn;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        tokenProvider = new JwtTokenProviderStub();
        passwordHasher = new BcryptHasher();
        signIn = new SignIn(
            userRepository,
            tokenProvider,
            passwordHasher,
        );

        const userTest = User.create({
            id: expectedId,
            email: UserEmail.create({ email: 'test@test.fr' }),
            cryptedPassword: UserCryptedPassword.create({ password: passwordHasher.hash('1234') }),
        });

        userRepository.populate([userTest]);
    });

    describe('WHEN sign in parameters are valid', () => {
        test('THEN it authentify given user', async () => {
            expect(await signIn.execute({
                email: 'test@test.fr',
                password: '1234',
            })).toEqual({
                token: expectedToken,
            });
        });
    });

    describe('WHEN sign in parameters are not valid', () => {
        test('THEN it throw InvalidCredential error if email does not exist', async () => {
            await expect(signIn.execute({
                email: 'invalid-email@test.fr',
                password: '1234',
            })).rejects.toThrow(InvalidCredential);
        });
    });
});
