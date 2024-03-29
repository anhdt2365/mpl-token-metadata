import { Borsh, Transaction } from '@remitano-anhdt/mpl-core';
import { PublicKey, TransactionCtorFields } from '@solana/web3.js';
export declare class UtilizeArgs extends Borsh.Data {
    static readonly SCHEMA: any;
    instruction: number;
    numberOfUses: number;
}
type UtilizeParams = {
    numberOfUses: number;
    metadata: PublicKey;
    mint: PublicKey;
    tokenAccount: PublicKey;
    owner: PublicKey;
    useAuthority?: PublicKey;
    burner?: PublicKey;
};
export declare class Utilize extends Transaction {
    constructor(options: TransactionCtorFields, params: UtilizeParams);
}
export {};
