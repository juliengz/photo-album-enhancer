/* eslint-disable class-methods-use-this */
import { PasswordCantBeEmpty } from '../errors/password_cant_be_empty';

interface UserCryptedPasswordProps {
    password: string;
}

export class UserCryptedPassword {
    private constructor(
        readonly password: string,
    ) {
        this.checkPasswordIsNotEmpty(password);

        this.password = password;
    }

    static create(props: UserCryptedPasswordProps): UserCryptedPassword {
        return new UserCryptedPassword(props.password);
    }

    private checkPasswordIsNotEmpty(password: string): void {
        if (password === null || password === undefined || password.length === 0) {
            throw new PasswordCantBeEmpty('Password is null or undefined');
        }
    }

    public toString(): string {
        return this.password;
    }
}
