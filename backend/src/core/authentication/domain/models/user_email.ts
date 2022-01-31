/* eslint-disable class-methods-use-this */
import { EmailMustBeValid } from '../errors/email_must_be_valid';

interface UserEmailProps {
    email: string;
}

export class UserEmail {
    private constructor(
        readonly email: string,
    ) {
        this.checkEmailIsValid(email);

        this.email = email;
    }

    static create(props: UserEmailProps): UserEmail {
        return new UserEmail(props.email);
    }

    private checkEmailIsValid(email: string): void {
        // eslint-disable-next-line max-len
        const REGEXP_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!REGEXP_EMAIL.test(String(email).toLowerCase())) {
            throw new EmailMustBeValid(`Email given ${email} is not a valid email`);
        }
    }

    public toString(): string {
        return this.email;
    }
}
