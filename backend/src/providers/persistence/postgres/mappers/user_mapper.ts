/* eslint-disable class-methods-use-this */
import { User } from '../../../../core/authentication/domain/models/user';
import { UserCryptedPassword } from '../../../../core/authentication/domain/models/user_crypted_password';
import { UserEmail } from '../../../../core/authentication/domain/models/user_email';
import UserModel from '../orm/models/user_model';

interface toPersistenceProps {
    id: string;
    email: string
    password: string;
}

export class UserMapper {
    public static toPersistence(user: User): toPersistenceProps {
        return {
            id: user.id,
            email: user.email.toString(),
            password: user.cryptedPassword.toString(),
        };
    }

    public static toDomain(user: UserModel): User {
        return User.create({
            id: user.id,
            email: UserEmail.create({ email: user.email }),
            cryptedPassword: UserCryptedPassword.create({ password: user.password }),
        });
    }
}
