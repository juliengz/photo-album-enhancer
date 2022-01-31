import { EmailMustBeValid } from '../../../core/authentication/domain/errors/email_must_be_valid';
import { PasswordCantBeEmpty } from '../../../core/authentication/domain/errors/password_cant_be_empty';
import { User } from '../../../core/authentication/domain/models/user';
import { UserCryptedPassword } from '../../../core/authentication/domain/models/user_crypted_password';
import { UserEmail } from '../../../core/authentication/domain/models/user_email';
import { UserWithEmailExists } from '../../../core/authentication/errors/user_with_email_exists';
import { PasswordHasher } from '../../../core/authentication/services/password_hasher';
import { CreateUser, CreateUserPayload } from '../../../core/authentication/use_cases/commands/create_user';
import BcryptHasher from '../../../providers/hashers/bcrypt_hasher';
import { expectedId, UuidProviderStub } from '../../../providers/id_generator/iuid_provider_stub';
import { InMemoryUserRepository } from '../../../providers/persistence/in_memory/in_memory_user_repository';

const existingUser: User = User.create({
    id: expectedId,
    email: UserEmail.create({ email: 'test@test.fr' }),
    cryptedPassword: UserCryptedPassword.create({ password: '1234' }),
});

const validPayload: CreateUserPayload = {
    email: 'test@test.fr',
    password: 'test',
};

describe('GIVEN i want to create a new List', () => {
    let userRepository: InMemoryUserRepository;
    let passworHasherProvider: PasswordHasher;
    let idGenerator: UuidProviderStub;
    let createUser: CreateUser;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        idGenerator = new UuidProviderStub();
        passworHasherProvider = new BcryptHasher();
        createUser = new CreateUser(
            userRepository,
            passworHasherProvider,
            idGenerator,
        );
    });

    describe('WHEN parameters are valid', () => {
        test('THEN the User should be created', async () => {
            await createUser.execute(validPayload);

            const user = await userRepository.findById(expectedId);

            expect(user).not.toBe(null);
        });
    });

    describe('WHEN user with email already exist', () => {
        test('THEN it throw UserWithEmailExists error', async () => {
            userRepository.populate([existingUser]);

            const payload: CreateUserPayload = {
                email: existingUser.email.toString(),
                password: 'test',
            };

            await expect(
                () => createUser.execute(payload),
            ).rejects.toThrow(UserWithEmailExists);
        });
    });

    describe('WHEN email is invalid', () => {
        test('THEN it throws EmailMustBeValid error', async () => {
            const invalidPayload: CreateUserPayload = {
                ...validPayload,
                email: 'invalid_mail',
            };

            await expect(
                () => createUser.execute(invalidPayload),
            ).rejects.toThrow(EmailMustBeValid);
        });
    });

    describe('WHEN password is empty', () => {
        test('THEN it throws PasswordCantBeEmpty error', async () => {
            const invalidPayload: CreateUserPayload = {
                ...validPayload,
                password: '',
            };

            await expect(
                () => createUser.execute(invalidPayload),
            ).rejects.toThrow(PasswordCantBeEmpty);
        });
    });
});
