"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logTrace = exports.logDebug = exports.logInfo = exports.logError = void 0;
const debug_1 = __importDefault(require("debug"));
exports.logError = (0, debug_1.default)('mpl:tm-test:error');
exports.logInfo = (0, debug_1.default)('mpl:tm-test:info');
exports.logDebug = (0, debug_1.default)('mpl:tm-test:debug');
exports.logTrace = (0, debug_1.default)('mpl:tm-test:trace');
//# sourceMappingURL=log.js.map