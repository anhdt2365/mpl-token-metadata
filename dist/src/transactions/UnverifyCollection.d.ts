import { Borsh, Transaction } from '@remitano-anhdt/mpl-core';
import { PublicKey, TransactionCtorFields } from '@solana/web3.js';
export declare class UnVerifyCollectionArgs extends Borsh.Data {
    static readonly SCHEMA: any;
    instruction: number;
}
type UnVerifyCollectionParams = {
    metadata: PublicKey;
    collectionAuthorityRecord?: PublicKey;
    collectionAuthority: PublicKey;
    collectionMint: PublicKey;
    collectionMetadata: PublicKey;
    collectionMasterEdition: PublicKey;
};
export declare class UnVerifyCollection extends Transaction {
    constructor(options: TransactionCtorFields, params: UnVerifyCollectionParams);
}
export {};
