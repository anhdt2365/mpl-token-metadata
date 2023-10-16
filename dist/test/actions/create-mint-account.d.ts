import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
export declare class CreateMint extends Transaction {
    private constructor();
    static createMintAccount(connection: Connection, payer: PublicKey): Promise<{
        mint: Keypair;
        createMintTx: CreateMint;
    }>;
}
