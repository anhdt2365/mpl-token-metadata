"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMint = void 0;
const assert_1 = require("assert");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
class CreateMint extends web3_js_1.Transaction {
    constructor(options, params) {
        const { feePayer } = options;
        (0, assert_1.strict)(feePayer != null, 'need to provide non-null feePayer');
        const { newAccountPubkey, lamports, decimals, owner, freezeAuthority } = params;
        super(options);
        this.add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: feePayer,
            newAccountPubkey,
            lamports,
            space: spl_token_1.MintLayout.span,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
        }));
        this.add((0, spl_token_1.createInitializeMintInstruction)(newAccountPubkey, decimals !== null && decimals !== void 0 ? decimals : 0, owner !== null && owner !== void 0 ? owner : feePayer, freezeAuthority !== null && freezeAuthority !== void 0 ? freezeAuthority : feePayer, spl_token_1.TOKEN_PROGRAM_ID));
    }
    static async createMintAccount(connection, payer) {
        const mint = web3_js_1.Keypair.generate();
        const mintRent = await connection.getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span, 'confirmed');
        const createMintTx = new CreateMint({ feePayer: payer }, {
            newAccountPubkey: mint.publicKey,
            lamports: mintRent,
        });
        return { mint, createMintTx };
    }
}
exports.CreateMint = CreateMint;
//# sourceMappingURL=create-mint-account.js.map