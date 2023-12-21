export interface CustomError {
    type: string,
    code: number,
    message: string
}

export interface Validation {
    checked: boolean;
    name: Validator;
    clients: Validator;
}

export interface Validator {
    message: string;
    isValid: boolean;
}

export interface Errors {
    name: SingleError;
    clients: SingleError;
}

export interface SingleError {
    condition: boolean;
    message: string;
}