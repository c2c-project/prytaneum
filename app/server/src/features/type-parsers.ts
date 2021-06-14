import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { Resolvers } from '@local/graphql-types';

/**
 * The date type expects a date string from the client 
 * and sends a date string to the server
 * code is pretty much copy paste from: https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/#example-the-date-scalar
 * further reading: https://graphql.org/graphql-js/constructing-types/
 */
export const resolvers: Resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value: string) {
            return new Date(value); // value from the client
        },
        serialize(value: Date) {
            return value.toISOString(); // value sent to the client
        },
        parseLiteral(ast) {
            // eslint-disable-next-line react/destructuring-assignment
            if (ast.kind === Kind.INT) {
                return new Date(ast.value); // ast value is always in string format
            }
            return null;
        },
    }),
};
