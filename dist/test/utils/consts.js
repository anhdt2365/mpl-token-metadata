"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionURL = exports.DEVNET = exports.programIds = void 0;
const amman_1 = require("@metaplex-foundation/amman");
const web3_js_1 = require("@solana/web3.js");
exports.programIds = {
    metadata: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
    vault: 'vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn',
    auction: 'auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8',
    metaplex: 'p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98',
};
exports.DEVNET = (0, web3_js_1.clusterApiUrl)('devnet');
exports.connectionURL = process.env.USE_DEVNET != null ? exports.DEVNET : amman_1.LOCALHOST;
//# sourceMappingURL=consts.js.map