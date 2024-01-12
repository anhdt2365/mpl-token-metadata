import { Borsh, Transaction } from '@remitano-anhdt/mpl-core';
import { PublicKey, TransactionCtorFields } from '@solana/web3.js';
export declare class RemoveCreatorVerificationArgs extends Borsh.Data {
    static readonly SCHEMA: any;
    instruction: number;
}
type RemoveCreatorVerificationParams = {
    metadata: PublicKey;
    creator: PublicKey;
};
export declare class RemoveCreatorVerification extends Transaction {
    constructor(options: TransactionCtorFields, params: RemoveCreatorVerificationParams);
}
export {};
