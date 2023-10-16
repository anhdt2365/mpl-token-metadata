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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMasterEdition = exports.mintAndCreateMetadataV2 = exports.mintAndCreateMetadata = exports.createMetadata = exports.createMetadataV2 = void 0;
const utils_1 = require("../utils");
const amman_1 = require("@metaplex-foundation/amman");
const assert_1 = require("assert");
const mpl_token_metadata_1 = require("../../src/mpl-token-metadata");
const bn_js_1 = __importDefault(require("bn.js"));
const spl = __importStar(require("@solana/spl-token"));
const create_mint_account_1 = require("./create-mint-account");
async function createMetadataV2({ transactionHandler, publicKey, mint, metadataData, updateAuthority, }) {
    const metadata = await mpl_token_metadata_1.Metadata.getPDA(mint);
    const createMetadataTx = new mpl_token_metadata_1.CreateMetadataV2({ feePayer: publicKey }, {
        metadata,
        metadataData,
        updateAuthority: updateAuthority !== null && updateAuthority !== void 0 ? updateAuthority : publicKey,
        mint: mint,
        mintAuthority: publicKey,
    });
    const createTxDetails = await transactionHandler.sendAndConfirmTransaction(createMetadataTx, [], {
        skipPreflight: false,
    });
    return { metadata, createTxDetails };
}
exports.createMetadataV2 = createMetadataV2;
async function createMetadata({ transactionHandler, publicKey, editionMint, metadataData, updateAuthority, }) {
    const metadata = await mpl_token_metadata_1.Metadata.getPDA(editionMint);
    const createMetadataTx = new mpl_token_metadata_1.CreateMetadata({ feePayer: publicKey }, {
        metadata,
        metadataData,
        updateAuthority: updateAuthority !== null && updateAuthority !== void 0 ? updateAuthority : publicKey,
        mint: editionMint,
        mintAuthority: publicKey,
    });
    const createTxDetails = await transactionHandler.sendAndConfirmTransaction(createMetadataTx, [], amman_1.defaultSendOptions);
    return { metadata, createTxDetails };
}
exports.createMetadata = createMetadata;
async function mintAndCreateMetadata(connection, transactionHandler, payer, args) {
    const { mint, createMintTx } = await create_mint_account_1.CreateMint.createMintAccount(connection, payer.publicKey);
    const mintRes = await transactionHandler.sendAndConfirmTransaction(createMintTx, [mint], amman_1.defaultSendOptions);
    (0, utils_1.addLabel)('mint', mint);
    (0, amman_1.assertConfirmedTransaction)(assert_1.strict, mintRes.txConfirmed);
    const initMetadataData = new mpl_token_metadata_1.MetadataDataData(args);
    const { createTxDetails, metadata } = await createMetadata({
        transactionHandler,
        publicKey: payer.publicKey,
        editionMint: mint.publicKey,
        metadataData: initMetadataData,
    });
    (0, utils_1.addLabel)('metadata', metadata);
    (0, utils_1.logDebug)(createTxDetails.txSummary.logMessages.join('\n'));
    return { mint, metadata };
}
exports.mintAndCreateMetadata = mintAndCreateMetadata;
async function mintAndCreateMetadataV2(connection, transactionHandler, payer, args) {
    const mint = await spl.Token.createMint(connection, payer, payer.publicKey, null, 0, spl.TOKEN_PROGRAM_ID);
    const fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(payer.publicKey);
    await mint.mintTo(fromTokenAccount.address, payer.publicKey, [], 1);
    (0, utils_1.addLabel)('mint', mint.publicKey);
    const initMetadataData = args;
    const { createTxDetails, metadata } = await createMetadataV2({
        transactionHandler,
        publicKey: payer.publicKey,
        mint: mint.publicKey,
        metadataData: initMetadataData,
    });
    (0, utils_1.addLabel)('metadata', metadata);
    (0, utils_1.logDebug)(createTxDetails.txSummary.logMessages.join('\n'));
    return { mint, metadata };
}
exports.mintAndCreateMetadataV2 = mintAndCreateMetadataV2;
async function createMasterEdition(connection, transactionHandler, payer, args, maxSupply) {
    const { mint, metadata } = await mintAndCreateMetadataV2(connection, transactionHandler, payer, args);
    const masterEditionPubkey = await mpl_token_metadata_1.MasterEdition.getPDA(mint.publicKey);
    const createMev3 = new mpl_token_metadata_1.CreateMasterEditionV3({ feePayer: payer.publicKey }, {
        edition: masterEditionPubkey,
        metadata: metadata,
        updateAuthority: payer.publicKey,
        mint: mint.publicKey,
        mintAuthority: payer.publicKey,
        maxSupply: new bn_js_1.default(maxSupply),
    });
    const createTxDetails = await transactionHandler.sendAndConfirmTransaction(createMev3, [], {
        skipPreflight: true,
    });
    return { mint, metadata, masterEditionPubkey, createTxDetails };
}
exports.createMasterEdition = createMasterEdition;
//# sourceMappingURL=create-metadata.js.map