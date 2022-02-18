import { GraphQLError } from 'graphql';

class ValidationError extends GraphQLError {
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}

export default ValidationError;