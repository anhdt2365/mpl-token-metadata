import { Borsh, Transaction } from '@remitano-anhdt/mpl-core';
import { PublicKey, TransactionCtorFields } from '@solana/web3.js';
export declare class VerifyCollectionArgs extends Borsh.Data {
    static readonly SCHEMA: any;
    instruction: number;
}
type VerifyCollectionParams = {
    metadata: PublicKey;
    collectionAuthorityRecord?: PublicKey;
    collectionAuthority: PublicKey;
    collectionMint: PublicKey;
    collectionMetadata: PublicKey;
    collectionMasterEdition: PublicKey;
};
export declare class VerifyCollection extends Transaction {
    constructor(options: TransactionCtorFields, params: VerifyCollectionParams);
}
export {};
