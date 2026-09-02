const NodeEnvironment = require('jest-environment-node');

class CustomEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
        this.global.Buffer = Buffer;
        this.global.Uint8Array = Uint8Array;
    }
}

module.exports = CustomEnvironment;
