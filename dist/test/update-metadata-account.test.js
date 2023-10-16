"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const mpl_token_metadata_1 = require("../src/mpl-token-metadata");
const utils_1 = require("./utils");
const amman_1 = require("@metaplex-foundation/amman");
(0, utils_1.killStuckProcess)();
(0, tape_1.default)('update-metadata-account: toggle primarySaleHappened', async (t) => {
    const { connection, transactionHandler, payer, metadata, initialMetadata } = await (0, utils_1.initMetadata)();
    t.notOk(initialMetadata.primarySaleHappened, 'initially sale has not happened');
    const tx = new mpl_token_metadata_1.UpdateMetadata({}, {
        metadata,
        updateAuthority: payer.publicKey,
        primarySaleHappened: true,
    });
    await transactionHandler.sendAndConfirmTransaction(tx, [payer]);
    const updatedMetadata = await (0, utils_1.getMetadataData)(connection, metadata);
    t.ok(updatedMetadata.primarySaleHappened, 'after update sale happened');
    (0, utils_1.assertMetadataDataUnchanged)(t, initialMetadata, updatedMetadata, 'primarySaleHappened');
});
(0, tape_1.default)('update-metadata-account: update with same data', async (t) => {
    const { connection, transactionHandler, payer, metadata, initialMetadata } = await (0, utils_1.initMetadata)();
    const tx = new mpl_token_metadata_1.UpdateMetadata({}, {
        metadata,
        metadataData: initialMetadata.data,
        updateAuthority: payer.publicKey,
    });
    await transactionHandler.sendAndConfirmTransaction(tx, [payer]);
    const updatedMetadata = await (0, utils_1.getMetadataData)(connection, metadata);
    (0, utils_1.assertMetadataDataUnchanged)(t, initialMetadata, updatedMetadata);
});
(0, tape_1.default)('update-metadata-account: uri', async (t) => {
    const { connection, transactionHandler, payer, metadata, initialMetadata } = await (0, utils_1.initMetadata)();
    const tx = new mpl_token_metadata_1.UpdateMetadata({}, {
        metadata,
        metadataData: new mpl_token_metadata_1.MetadataDataData({ ...initialMetadata.data, uri: `${utils_1.URI}-updated` }),
        updateAuthority: payer.publicKey,
    });
    await transactionHandler.sendAndConfirmTransaction(tx, [payer]);
    const updatedMetadata = await (0, utils_1.getMetadataData)(connection, metadata);
    t.equal(updatedMetadata.data.uri, `${utils_1.URI}-updated`, 'updates uri');
    (0, utils_1.assertMetadataDataDataUnchanged)(t, initialMetadata.data, updatedMetadata.data, ['uri']);
});
(0, tape_1.default)('update-metadata-account: name and symbol', async (t) => {
    const { connection, transactionHandler, payer, metadata, initialMetadata } = await (0, utils_1.initMetadata)();
    const tx = new mpl_token_metadata_1.UpdateMetadata({}, {
        metadata,
        metadataData: new mpl_token_metadata_1.MetadataDataData({
            ...initialMetadata.data,
            name: `${utils_1.NAME}-updated`,
            symbol: `${utils_1.SYMBOL}++`,
        }),
        updateAuthority: payer.publicKey,
    });
    await transactionHandler.sendAndConfirmTransaction(tx, [payer]);
    const updatedMetadata = await (0, utils_1.getMetadataData)(connection, metadata);
    t.equal(updatedMetadata.data.name, `${utils_1.NAME}-updated`, 'updates name');
    t.equal(updatedMetadata.data.symbol, `${utils_1.SYMBOL}++`, 'updates symbol');
    (0, utils_1.assertMetadataDataDataUnchanged)(t, initialMetadata.data, updatedMetadata.data, [
        'name',
        'symbol',
    ]);
});
(0, tape_1.default)('update-metadata-account: update symbol too long', async (t) => {
    const { transactionHandler, payer, metadata, initialMetadata } = await (0, utils_1.initMetadata)();
    const tx = new mpl_token_metadata_1.UpdateMetadata({}, {
        metadata,
        metadataData: new mpl_token_metadata_1.MetadataDataData({
            ...initialMetadata.data,
            symbol: `${utils_1.SYMBOL}-too-long`,
        }),
        updateAuthority: payer.publicKey,
    });
    try {
        await transactionHandler.sendAndConfirmTransaction(tx, [payer]);
        t.fail('expected transaction to fail');
    }
    catch (err) {
        (0, amman_1.assertError)(t, err, [/custom program error/i, /Symbol too long/i]);
    }
});
//# sourceMappingURL=update-metadata-account.test.js.map