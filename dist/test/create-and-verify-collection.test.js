"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const mpl_token_metadata_1 = require("../src/mpl-token-metadata");
const utils_1 = require("./utils");
const amman_1 = require("@metaplex-foundation/amman");
const web3_js_1 = require("@solana/web3.js");
const actions_1 = require("./actions");
const accounts_1 = require("../src/accounts");
const transactions_1 = require("../src/transactions");
(0, utils_1.killStuckProcess)();
(0, tape_1.default)('verify-collection', async (t) => {
    var _a, _b;
    const payer = web3_js_1.Keypair.generate();
    const connection = new web3_js_1.Connection(utils_1.connectionURL, 'confirmed');
    const transactionHandler = new amman_1.PayerTransactionHandler(connection, payer);
    await (0, amman_1.airdrop)(connection, payer.publicKey, 2);
    const collectionNft = await (0, actions_1.createCollection)(connection, transactionHandler, payer);
    const initMetadataData = new mpl_token_metadata_1.DataV2({
        uri: utils_1.URI,
        name: utils_1.NAME,
        symbol: utils_1.SYMBOL,
        sellerFeeBasisPoints: utils_1.SELLER_FEE_BASIS_POINTS,
        creators: null,
        collection: new accounts_1.Collection({ key: collectionNft.mint.publicKey.toBase58(), verified: false }),
        uses: null,
    });
    const collectionMemberNft = await (0, actions_1.createMasterEdition)(connection, transactionHandler, payer, initMetadataData, 0);
    console.log('collectionMemberNft', collectionMemberNft.metadata.toBase58());
    const updatedMetadataBeforeVerification = await (0, utils_1.getMetadataData)(connection, collectionMemberNft.metadata);
    t.ok(updatedMetadataBeforeVerification.collection, 'collection should be not null');
    t.not((_a = updatedMetadataBeforeVerification.collection) === null || _a === void 0 ? void 0 : _a.verified, 'collection should be not be verified');
    const collectionVerifyCollectionTransaction = new mpl_token_metadata_1.VerifyCollection({ feePayer: payer.publicKey }, {
        metadata: collectionMemberNft.metadata,
        collectionAuthority: payer.publicKey,
        collectionMint: collectionNft.mint.publicKey,
        collectionMetadata: collectionNft.metadata,
        collectionMasterEdition: collectionNft.masterEditionPubkey,
    });
    await transactionHandler.sendAndConfirmTransaction(collectionVerifyCollectionTransaction, [
        payer,
    ]);
    const updatedMetadataAfterVerification = await (0, utils_1.getMetadataData)(connection, collectionMemberNft.metadata);
    t.ok(updatedMetadataAfterVerification.collection, 'collection should be not null');
    t.ok((_b = updatedMetadataAfterVerification.collection) === null || _b === void 0 ? void 0 : _b.verified, 'collection should be verified');
});
(0, tape_1.default)('set-and-verify-collection', async (t) => {
    var _a;
    const payer = web3_js_1.Keypair.generate();
    const connection = new web3_js_1.Connection(utils_1.connectionURL, 'confirmed');
    const transactionHandler = new amman_1.PayerTransactionHandler(connection, payer);
    await (0, amman_1.airdrop)(connection, payer.publicKey, 2);
    const collectionNft = await (0, actions_1.createCollection)(connection, transactionHandler, payer);
    const initMetadataData = new mpl_token_metadata_1.DataV2({
        uri: utils_1.URI,
        name: utils_1.NAME,
        symbol: utils_1.SYMBOL,
        sellerFeeBasisPoints: utils_1.SELLER_FEE_BASIS_POINTS,
        creators: null,
        collection: null,
        uses: null,
    });
    const collectionMemberNft = await (0, actions_1.createMasterEdition)(connection, transactionHandler, payer, initMetadataData, 0);
    const updatedMetadataBeforeVerification = await (0, utils_1.getMetadataData)(connection, collectionMemberNft.metadata);
    t.not(updatedMetadataBeforeVerification.collection, 'collection should be null');
    const collectionVerifyCollectionTransaction = new transactions_1.SetAndVerifyCollectionCollection({ feePayer: payer.publicKey }, {
        metadata: collectionMemberNft.metadata,
        collectionAuthority: payer.publicKey,
        updateAuthority: payer.publicKey,
        collectionMint: collectionNft.mint.publicKey,
        collectionMetadata: collectionNft.metadata,
        collectionMasterEdition: collectionNft.masterEditionPubkey,
    });
    const txDetails = await transactionHandler.sendAndConfirmTransaction(collectionVerifyCollectionTransaction, [payer], { skipPreflight: true });
    (0, utils_1.logDebug)(txDetails.txSummary.logMessages.join('\n'));
    const updatedMetadataAfterVerification = await (0, utils_1.getMetadataData)(connection, collectionMemberNft.metadata);
    t.ok(updatedMetadataAfterVerification.collection, 'collection should be not null');
    t.ok((_a = updatedMetadataAfterVerification.collection) === null || _a === void 0 ? void 0 : _a.verified, 'collection should be verified');
});
(0, tape_1.default)('Delegated Authority', (t) => {
    t.test('Fail: Verify Collection', async (t) => {
        var _a;
        const payer = web3_js_1.Keypair.generate();
        const connection = new web3_js_1.Connection(utils_1.connectionURL, 'confirmed');
        const transactionHandler = new amman_1.PayerTransactionHandler(connection, payer);
        await (0, amman_1.airdrop)(connection, payer.publicKey, 2);
        const collectionNft = await (0, actions_1.createCollection)(connection, transactionHandler, payer);
        const initMetadataData = new mpl_token_metadata_1.DataV2({
            uri: utils_1.URI,
            name: utils_1.NAME,
            symbol: utils_1.SYMBOL,
            sellerFeeBasisPoints: utils_1.SELLER_FEE_BASIS_POINTS,
            creators: null,
            collection: new accounts_1.Collection({ key: collectionNft.mint.publicKey.toBase58(), verified: false }),
            uses: null,
        });
        const collectionMemberNft = await (0, actions_1.createMasterEdition)(connection, transactionHandler, payer, initMetadataData, 0);
        const updatedMetadataBeforeVerification = await (0, utils_1.getMetadataData)(connection, collectionMemberNft.metadata);
        t.ok(updatedMetadataBeforeVerification.collection, 'collection should be null');
        t.false((_a = updatedMetadataBeforeVerification.collection) === null || _a === void 0 ? void 0 : _a.verified, 'collection cant be verified');
        const delegatedAuthority = web3_js_1.Keypair.generate();
        await (0, amman_1.airdrop)(connection, delegatedAuthority.publicKey, 2);
        const dARecord = await mpl_token_metadata_1.MetadataProgram.findCollectionAuthorityAccount(collectionNft.mint.publicKey, delegatedAuthority.publicKey);
        const collectionVerifyCollectionTransaction = new mpl_token_metadata_1.VerifyCollection({ feePayer: payer.publicKey }, {
            metadata: collectionMemberNft.metadata,
            collectionAuthority: delegatedAuthority.publicKey,
            collectionMint: collectionNft.mint.publicKey,
            collectionMetadata: collectionNft.metadata,
            collectionMasterEdition: collectionNft.masterEditionPubkey,
            collectionAuthorityRecord: dARecord[0],
        });
        const txDetails = await transactionHandler.sendAndConfirmTransaction(collectionVerifyCollectionTransaction, [delegatedAuthority], { skipPreflight: true });
        (0, utils_1.logDebug)(txDetails.txSummary.logMessages.join('\n'));
        t.deepEqual(txDetails.txSummary.err, { InstructionError: [0, { Custom: 81 }] }, 'Collection Update Authority is invalid');
    });
    t.test('Fail: Set and Verify Collection', async (t) => {
        const payer = web3_js_1.Keypair.generate();
        const connection = new web3_js_1.Connection(utils_1.connectionURL, 'confirmed');
        const transactionHandler = new amman_1.PayerTransactionHandler(connection, payer);
        await (0, amman_1.airdrop)(connection, payer.publicKey, 2);
        const collectionNft = await (0, actions_1.createCollection)(connection, transactionHandler, payer);
        const initMetadataData = new mpl_token_metadata_1.DataV2({
            uri: utils_1.URI,
            name: utils_1.NAME,
            symbol: utils_1.SYMBOL,
            sellerFeeBasisPoints: utils_1.SELLER_FEE_BASIS_POINTS,
            creators: null,
            collection: null,
            uses: null,
        });
        const collectionMemberNft = await (0, actions_1.createMasterEdition)(connection, transactionHandler, payer, initMetadataData, 0);
        const updatedMetadataBeforeVerification = await (0, utils_1.getMetadataData)(connection, collectionMemberNft.metadata);
        t.notOk(updatedMetadataBeforeVerification.collection, 'collection should be null');
        const delegatedAuthority = web3_js_1.Keypair.generate();
        await (0, amman_1.airdrop)(connection, delegatedAuthority.publicKey, 2);
        const dARecord = await mpl_token_metadata_1.MetadataProgram.findCollectionAuthorityAccount(collectionNft.mint.publicKey, delegatedAuthority.publicKey);
        const collectionVerifyCollectionTransaction = new transactions_1.SetAndVerifyCollectionCollection({ feePayer: delegatedAuthority.publicKey }, {
            metadata: collectionMemberNft.metadata,
            collectionAuthority: delegatedAuthority.publicKey,
            updateAuthority: payer.publicKey,
            collectionMint: collectionNft.mint.publicKey,
            collectionMetadata: collectionNft.metadata,
            collectionMasterEdition: collectionNft.masterEditionPubkey,
            collectionAuthorityRecord: dARecord[0],
        });
        const txDetails = await transactionHandler.sendAndConfirmTransaction(collectionVerifyCollectionTransaction, [delegatedAuthority], { skipPreflight: true });
        (0, utils_1.logDebug)(txDetails.txSummary.logMessages.join('\n'));
        t.deepEqual(txDetails.txSummary.err, { InstructionError: [0, { Custom: 81 }] }, 'Collection Update Authority is invalid');
    });
    t.test('Success: Verify Collection', async (t) => {
        var _a, _b;
        const payer = web3_js_1.Keypair.generate();
        const connection = new web3_js_1.Connection(utils_1.connectionURL, 'confirmed');
        const transactionHandler = new amman_1.PayerTransactionHandler(connection, payer);
        await (0, amman_1.airdrop)(connection, payer.publicKey, 2);
        const collectionNft = await (0, actions_1.createCollection)(connection, transactionHandler, payer);
        const initMetadataData = new mpl_token_metadata_1.DataV2({
            uri: utils_1.URI,
            name: utils_1.NAME,
            symbol: utils_1.SYMBOL,
            sellerFeeBasisPoints: utils_1.SELLER_FEE_BASIS_POINTS,
            creators: null,
            collection: new accounts_1.Collection({ key: collectionNft.mint.publicKey.toBase58(), verified: false }),
            uses: null,
        });
        const collectionMemberNft = await (0, actions_1.createMasterEdition)(connection, transactionHandler, payer, initMetadataData, 0);
        const updatedMetadataBeforeVerification = await (0, utils_1.getMetadataData)(connection, collectionMemberNft.metadata);
        t.ok(updatedMetadataBeforeVerification.collection, 'collection should not be null');
        t.false((_a = updatedMetadataBeforeVerification.collection) === null || _a === void 0 ? void 0 : _a.verified, 'collection cant be verified');
        const delegatedAuthority = web3_js_1.Keypair.generate();
        await (0, amman_1.airdrop)(connection, delegatedAuthority.publicKey, 2);
        const dARecord = await mpl_token_metadata_1.MetadataProgram.findCollectionAuthorityAccount(collectionNft.mint.publicKey, delegatedAuthority.publicKey);
        const approveTransaction = new mpl_token_metadata_1.ApproveCollectionAuthority({ feePayer: payer.publicKey }, {
            collectionAuthorityRecord: dARecord[0],
            newCollectionAuthority: delegatedAuthority.publicKey,
            updateAuthority: payer.publicKey,
            metadata: collectionNft.metadata,
            mint: collectionNft.mint.publicKey,
        });
        const approveTxnDetails = await transactionHandler.sendAndConfirmTransaction(approveTransaction, [payer], { skipPreflight: true });
        (0, utils_1.logDebug)(approveTxnDetails.txSummary.logMessages.join('\n'));
        const collectionVerifyCollectionTransaction = new mpl_token_metadata_1.VerifyCollection({ feePayer: payer.publicKey }, {
            metadata: collectionMemberNft.metadata,
            collectionAuthority: delegatedAuthority.publicKey,
            collectionMint: collectionNft.mint.publicKey,
            collectionMetadata: collectionNft.metadata,
            collectionMasterEdition: collectionNft.masterEditionPubkey,
            collectionAuthorityRecord: dARecord[0],
        });
        const txDetails = await transactionHandler.sendAndConfirmTransaction(collectionVerifyCollectionTransaction, [delegatedAuthority], { skipPreflight: true });
        (0, utils_1.logDebug)(txDetails.txSummary.logMessages.join('\n'));
        const updatedMetadataAfterVerification = await (0, utils_1.getMetadataData)(connection, collectionMemberNft.metadata);
        t.ok(updatedMetadataAfterVerification.collection, 'collection should not be null');
        t.true((_b = updatedMetadataAfterVerification.collection) === null || _b === void 0 ? void 0 : _b.verified, 'collection is verified');
    });
    t.test('Success: Set and Verify Collection', async (t) => {
        var _a;
        const payer = web3_js_1.Keypair.generate();
        const connection = new web3_js_1.Connection(utils_1.connectionURL, 'confirmed');
        const transactionHandler = new amman_1.PayerTransactionHandler(connection, payer);
        await (0, amman_1.airdrop)(connection, payer.publicKey, 2);
        const collectionNft = await (0, actions_1.createCollection)(connection, transactionHandler, payer);
        const initMetadataData = new mpl_token_metadata_1.DataV2({
            uri: utils_1.URI,
            name: utils_1.NAME,
            symbol: utils_1.SYMBOL,
            sellerFeeBasisPoints: utils_1.SELLER_FEE_BASIS_POINTS,
            creators: null,
            collection: null,
            uses: null,
        });
        const collectionMemberNft = await (0, actions_1.createMasterEdition)(connection, transactionHandler, payer, initMetadataData, 0);
        const updatedMetadataBeforeVerification = await (0, utils_1.getMetadataData)(connection, collectionMemberNft.metadata);
        t.not(updatedMetadataBeforeVerification.collection, 'collection should be null');
        const delegatedAuthority = web3_js_1.Keypair.generate();
        await (0, amman_1.airdrop)(connection, delegatedAuthority.publicKey, 2);
        const dARecord = await mpl_token_metadata_1.MetadataProgram.findCollectionAuthorityAccount(collectionNft.mint.publicKey, delegatedAuthority.publicKey);
        const approveTransaction = new mpl_token_metadata_1.ApproveCollectionAuthority({ feePayer: payer.publicKey }, {
            collectionAuthorityRecord: dARecord[0],
            newCollectionAuthority: delegatedAuthority.publicKey,
            updateAuthority: payer.publicKey,
            metadata: collectionNft.metadata,
            mint: collectionNft.mint.publicKey,
        });
        const approveTxnDetails = await transactionHandler.sendAndConfirmTransaction(approveTransaction, [payer], { skipPreflight: true });
        (0, utils_1.logDebug)(approveTxnDetails.txSummary.logMessages.join('\n'));
        const collectionVerifyCollectionTransaction = new transactions_1.SetAndVerifyCollectionCollection({ feePayer: delegatedAuthority.publicKey }, {
            metadata: collectionMemberNft.metadata,
            collectionAuthority: delegatedAuthority.publicKey,
            updateAuthority: payer.publicKey,
            collectionMint: collectionNft.mint.publicKey,
            collectionMetadata: collectionNft.metadata,
            collectionMasterEdition: collectionNft.masterEditionPubkey,
            collectionAuthorityRecord: dARecord[0],
        });
        await transactionHandler.sendAndConfirmTransaction(collectionVerifyCollectionTransaction, [delegatedAuthority], { skipPreflight: true });
        const updatedMetadataAfterVerification = await (0, utils_1.getMetadataData)(connection, collectionMemberNft.metadata);
        t.ok(updatedMetadataAfterVerification.collection, 'collection should not be null');
        t.true((_a = updatedMetadataAfterVerification.collection) === null || _a === void 0 ? void 0 : _a.verified, 'collection is verified');
    });
});
//# sourceMappingURL=create-and-verify-collection.test.js.map