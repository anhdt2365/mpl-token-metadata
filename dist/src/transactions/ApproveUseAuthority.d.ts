import { Borsh, Transaction } from '@remitano-anhdt/mpl-core';
import { PublicKey, TransactionCtorFields } from '@solana/web3.js';
export declare class ApproveUseAuthorityArgs extends Borsh.Data {
    static readonly SCHEMA: any;
    instruction: number;
    numberOfUses: number;
}
type ApproveUseAuthorityParams = {
    useAuthorityRecord: PublicKey;
    user: PublicKey;
    owner: PublicKey;
    ownerTokenAccount: PublicKey;
    metadata: PublicKey;
    mint: PublicKey;
    burner: PublicKey;
    numberOfUses: number;
};
export declare class ApproveUseAuthority extends Transaction {
    constructor(options: TransactionCtorFields, params: ApproveUseAuthorityParams);
}
export {};
