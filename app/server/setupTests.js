global.Buffer = global.Buffer || require('buffer').Buffer;
if (typeof Uint8Array !== 'undefined' && !Uint8Array.prototype.slice) {
  Uint8Array.prototype.slice = function(start, end) {
    return new Uint8Array(Array.prototype.slice.call(this, start, end));
  };
}
