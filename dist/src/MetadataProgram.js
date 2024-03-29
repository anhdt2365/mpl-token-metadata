"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataProgram = void 0;
const web3_js_1 = require("@solana/web3.js");
const mpl_core_1 = require("@remitano-anhdt/mpl-core");
class MetadataProgram extends mpl_core_1.Program {
    static async findEditionAccount(mint, editionNumber) {
        return web3_js_1.PublicKey.findProgramAddress([
            Buffer.from(MetadataProgram.PREFIX, 'utf8'),
            MetadataProgram.PUBKEY.toBuffer(),
            mint.toBuffer(),
            Buffer.from(MetadataProgram.EDITION, 'utf8'),
            Buffer.from(editionNumber, 'utf8'),
        ], MetadataProgram.PUBKEY);
    }
    static async findMasterEditionAccount(mint) {
        return web3_js_1.PublicKey.findProgramAddress([
            Buffer.from(MetadataProgram.PREFIX, 'utf8'),
            MetadataProgram.PUBKEY.toBuffer(),
            mint.toBuffer(),
            Buffer.from(MetadataProgram.EDITION, 'utf8'),
        ], MetadataProgram.PUBKEY);
    }
    static async findMetadataAccount(mint) {
        return web3_js_1.PublicKey.findProgramAddress([
            Buffer.from(MetadataProgram.PREFIX, 'utf8'),
            MetadataProgram.PUBKEY.toBuffer(),
            mint.toBuffer(),
        ], MetadataProgram.PUBKEY);
    }
    static async findUseAuthorityAccount(mint, authority) {
        return web3_js_1.PublicKey.findProgramAddress([
            Buffer.from(MetadataProgram.PREFIX, 'utf8'),
            MetadataProgram.PUBKEY.toBuffer(),
            mint.toBuffer(),
            Buffer.from(MetadataProgram.USER, 'utf8'),
            authority.toBuffer(),
        ], MetadataProgram.PUBKEY);
    }
    static async findCollectionAuthorityAccount(mint, authority) {
        return web3_js_1.PublicKey.findProgramAddress([
            Buffer.from(MetadataProgram.PREFIX, 'utf8'),
            MetadataProgram.PUBKEY.toBuffer(),
            mint.toBuffer(),
            Buffer.from(MetadataProgram.COLLECTION_AUTHORITY, 'utf8'),
            authority.toBuffer(),
        ], MetadataProgram.PUBKEY);
    }
    static async findProgramAsBurnerAccount() {
        return web3_js_1.PublicKey.findProgramAddress([
            Buffer.from(MetadataProgram.PREFIX, 'utf8'),
            MetadataProgram.PUBKEY.toBuffer(),
            Buffer.from(MetadataProgram.BURN, 'utf8'),
        ], MetadataProgram.PUBKEY);
    }
}
exports.MetadataProgram = MetadataProgram;
MetadataProgram.PREFIX = 'metadata';
MetadataProgram.EDITION = 'edition';
MetadataProgram.USER = 'user';
MetadataProgram.COLLECTION_AUTHORITY = 'collection_authority';
MetadataProgram.BURN = 'burn';
MetadataProgram.PUBKEY = new web3_js_1.PublicKey(mpl_core_1.config.programs.metadata);
//# sourceMappingURL=MetadataProgram.js.map