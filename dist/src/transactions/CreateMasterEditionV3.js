"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMasterEditionV3 = exports.CreateMasterEditionV3Args = void 0;
const mpl_core_1 = require("@remitano-anhdt/mpl-core");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const MetadataProgram_1 = require("../MetadataProgram");
class CreateMasterEditionV3Args extends mpl_core_1.Borsh.Data {
    constructor() {
        super(...arguments);
        this.instruction = 17;
    }
}
exports.CreateMasterEditionV3Args = CreateMasterEditionV3Args;
CreateMasterEditionV3Args.SCHEMA = CreateMasterEditionV3Args.struct([
    ['instruction', 'u8'],
    ['maxSupply', { kind: 'option', type: 'u64' }],
]);
class CreateMasterEditionV3 extends mpl_core_1.Transaction {
    constructor(options, params) {
        super(options);
        const { feePayer } = options;
        const { edition, metadata, updateAuthority, mint, mintAuthority, maxSupply } = params;
        const data = CreateMasterEditionV3Args.serialize({
            maxSupply: maxSupply || null,
        });
        this.add(new web3_js_1.TransactionInstruction({
            keys: [
                {
                    pubkey: edition,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: mint,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: updateAuthority,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    pubkey: mintAuthority,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    pubkey: feePayer,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    pubkey: metadata,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: spl_token_1.TOKEN_PROGRAM_ID,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: web3_js_1.SystemProgram.programId,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                    isSigner: false,
                    isWritable: false,
                },
            ],
            programId: MetadataProgram_1.MetadataProgram.PUBKEY,
            data,
        }));
    }
}
exports.CreateMasterEditionV3 = CreateMasterEditionV3;
//# sourceMappingURL=CreateMasterEditionV3.js.map