export abstract class AbstractValidator {
    private errors: any = {};

    getErrors(): {}|null {
        return (
            Object.entries(this.errors).length === 0
            && this.errors.constructor === Object
        )
            ? null
            : this.errors;
    }

    addErrors(key: string, errorLabel: String) {
        this.errors[key] = [...[errorLabel], ...((key in this.errors) ? this.errors[key] : [])];
    }
}
