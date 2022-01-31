import { UserCryptedPassword } from './user_crypted_password';
import { UserEmail } from './user_email';
import { UserId } from './user_id';

export interface UserProps {
    id: UserId;
    email: UserEmail
    cryptedPassword: UserCryptedPassword;
}

export class User {
    private constructor(
        readonly id: UserId,
        readonly email: UserEmail,
        readonly cryptedPassword: UserCryptedPassword,
    ) {
        this.id = id;
        this.email = email;
        this.cryptedPassword = cryptedPassword;
    }

    static create(props: UserProps): User {
        return new User(props.id, props.email, props.cryptedPassword);
    }
}
