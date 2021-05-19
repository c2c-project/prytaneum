/* eslint-disable */

/**
 * custom plugin for graphql-code-generator so that we can easily get the raw sdl of the entire schema
 * more info here https://www.graphql-code-generator.com/docs/custom-codegen/write-your-plugin
 * we need to do this so that way relay can work
 */
const { printSchema } = require('graphql');

module.exports = {
    plugin: (schema, documents, config) => {
        return printSchema(schema);
    },
};
