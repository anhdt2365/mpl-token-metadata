import { Borsh, Transaction } from '@remitano-anhdt/mpl-core';
import { PublicKey, TransactionCtorFields } from '@solana/web3.js';
export declare class FreezeDelegatedAccountArgs extends Borsh.Data {
    static readonly SCHEMA: any;
    instruction: number;
}
type FreezeDelegatedAccountParams = {
    delegate: PublicKey;
    token_account: PublicKey;
    edition: PublicKey;
    mint: PublicKey;
};
export declare class FreezeDelegatedAccount extends Transaction {
    constructor(options: TransactionCtorFields, params: FreezeDelegatedAccountParams);
}
export {};
