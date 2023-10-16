"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.killStuckProcess = exports.dump = void 0;
const util_1 = require("util");
const tape_1 = __importDefault(require("tape"));
__exportStar(require("./address-labels"), exports);
__exportStar(require("./consts"), exports);
__exportStar(require("./log"), exports);
__exportStar(require("./metadata"), exports);
function dump(x) {
    console.log((0, util_1.inspect)(x, { depth: 5 }));
}
exports.dump = dump;
function killStuckProcess() {
    tape_1.default.onFinish(() => process.exit(0));
}
exports.killStuckProcess = killStuckProcess;
//# sourceMappingURL=index.js.map