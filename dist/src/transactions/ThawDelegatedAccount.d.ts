import { Borsh, Transaction } from '@remitano-anhdt/mpl-core';
import { PublicKey, TransactionCtorFields } from '@solana/web3.js';
export declare class ThawDelegatedAccountArgs extends Borsh.Data {
    static readonly SCHEMA: any;
    instruction: number;
}
type ThawDelegatedAccountParams = {
    delegate: PublicKey;
    token_account: PublicKey;
    edition: PublicKey;
    mint: PublicKey;
};
export declare class ThawDelegatedAccount extends Transaction {
    constructor(options: TransactionCtorFields, params: ThawDelegatedAccountParams);
}
export {};
