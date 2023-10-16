"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = void 0;
const accounts_1 = require("../../src/accounts");
const utils_1 = require("../utils");
const create_metadata_1 = require("./create-metadata");
async function createCollection(connection, transactionHandler, payer) {
    const initMetadataData = new accounts_1.DataV2({
        uri: utils_1.URI,
        name: utils_1.NAME,
        symbol: utils_1.SYMBOL,
        sellerFeeBasisPoints: utils_1.SELLER_FEE_BASIS_POINTS,
        creators: null,
        collection: null,
        uses: null,
    });
    return await (0, create_metadata_1.createMasterEdition)(connection, transactionHandler, payer, initMetadataData, 0);
}
exports.createCollection = createCollection;
//# sourceMappingURL=create-collection.js.map