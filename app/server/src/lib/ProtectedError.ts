interface TProtectedError {
    /**
     * Message that is sent downstream to the user client and is safe to display.
     */
    userMessage?: string;
    /**
     * Message that is specifically for internal use only / visible to devs.
     * Generally, this message is NOT safe to send to the user from a security perspective.
     */
    internalMessage?: string;
}

/**
 * Used to throw errors in the Prytaneum server while still providing useful messages to both the client and devs.
 * Not all errors will have an internal message, but some may to aid in debugging, while still allowing to show the client
 * some sort of message.
 */
export class ProtectedError extends Error implements TProtectedError {
    userMessage: string;

    internalMessage: string;

    // See https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#incorrect-and-correct-response-examples
    // for where these messages come from and when they are used.

    // Used when there is any type of login error: password mismatch, wrong email, etc.
    // See above OWASP link for more information.
    static loginErrorMessage = 'Login failed; Invalid user ID or password.';

    // Notably, this is the same message that is sent on success too.
    // This is intentional. See the above OWASP cheat sheet link for more information.
    static passwordRecoveryErrorMessage =
        'If that email address is in our database, we will send you an email to reset your password.';

    // Notably, this is the same message that is sent on success too.
    // This is intentional. See the above OWASP cheat sheet link for more information.
    static accountCreationErrorMessage = 'A link to activate your account has been emailed to the address provided.';

    static internalServerErrorMessage = 'Internal server error. Please try again later.';

    constructor(message: TProtectedError) {
        super(JSON.stringify(message, null, 4));

        this.userMessage = message.userMessage ?? '';
        this.internalMessage = message.internalMessage ?? '';

        Object.setPrototypeOf(this, ProtectedError.prototype);
    }
}
