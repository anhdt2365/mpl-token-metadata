"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edition = exports.EditionData = void 0;
const mpl_core_1 = require("@remitano-anhdt/mpl-core");
const MetadataProgram_1 = require("../MetadataProgram");
const web3_js_1 = require("@solana/web3.js");
const buffer_1 = require("buffer");
const constants_1 = require("./constants");
class EditionData extends mpl_core_1.Borsh.Data {
    constructor(args) {
        super(args);
        this.key = constants_1.MetadataKey.EditionV1;
    }
}
exports.EditionData = EditionData;
EditionData.SCHEMA = EditionData.struct([
    ['key', 'u8'],
    ['parent', 'pubkeyAsString'],
    ['edition', 'u64'],
]);
class Edition extends mpl_core_1.Account {
    constructor(key, info) {
        super(key, info);
        if (!this.assertOwner(MetadataProgram_1.MetadataProgram.PUBKEY)) {
            throw (0, mpl_core_1.ERROR_INVALID_OWNER)();
        }
        if (!Edition.isCompatible(this.info.data)) {
            throw (0, mpl_core_1.ERROR_INVALID_ACCOUNT_DATA)();
        }
        this.data = EditionData.deserialize(this.info.data);
    }
    static async getPDA(mint) {
        return MetadataProgram_1.MetadataProgram.findProgramAddress([
            buffer_1.Buffer.from(MetadataProgram_1.MetadataProgram.PREFIX),
            MetadataProgram_1.MetadataProgram.PUBKEY.toBuffer(),
            new web3_js_1.PublicKey(mint).toBuffer(),
            buffer_1.Buffer.from(Edition.EDITION_PREFIX),
        ]);
    }
    static isCompatible(data) {
        return data[0] === constants_1.MetadataKey.EditionV1;
    }
}
exports.Edition = Edition;
Edition.EDITION_PREFIX = 'edition';
//# sourceMappingURL=Edition.js.map