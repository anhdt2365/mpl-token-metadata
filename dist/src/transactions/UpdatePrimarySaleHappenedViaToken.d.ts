import { Borsh, Transaction } from '@remitano-anhdt/mpl-core';
import { PublicKey, TransactionCtorFields } from '@solana/web3.js';
export declare class UpdatePrimarySaleHappenedViaTokenArgs extends Borsh.Data {
    static readonly SCHEMA: any;
    instruction: number;
}
type UpdatePrimarySaleHappenedViaTokenParams = {
    metadata: PublicKey;
    owner: PublicKey;
    tokenAccount: PublicKey;
};
export declare class UpdatePrimarySaleHappenedViaToken extends Transaction {
    constructor(options: TransactionCtorFields, params: UpdatePrimarySaleHappenedViaTokenParams);
}
export {};
