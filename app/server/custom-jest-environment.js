const NodeEnvironment = require('jest-environment-node');

const buffer = require('buffer');
if (!buffer.SlowBuffer) {
    buffer.SlowBuffer = buffer.Buffer;
}

class CustomEnvironment extends NodeEnvironment {
    async setup() {
        await super.setup();
        this.global.Buffer = Buffer;
        this.global.Uint8Array = Uint8Array;
    }
}

module.exports = CustomEnvironment;
