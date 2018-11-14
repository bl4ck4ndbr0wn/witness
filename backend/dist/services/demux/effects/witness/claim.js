"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function claim(state, payload, blockInfo, context) {
  const claim = {
    claimant: payload.data.claimant,
    category: payload.data.category,
    content: payload.data.content,
    witnesses: payload.data.witnesses
  };
  context.socket.emit("claim", claim);
}

var _default = claim;
exports.default = _default;
//# sourceMappingURL=claim.js.map