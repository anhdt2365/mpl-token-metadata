/// <reference types="@solana/spl-token" />
import { Connection, Keypair } from '@solana/web3.js';
import { TransactionHandler } from '@metaplex-foundation/amman';
export declare function createCollection(connection: Connection, transactionHandler: TransactionHandler, payer: Keypair): Promise<{
    mint: import("@solana/spl-token").Token;
    metadata: import("@solana/web3.js").PublicKey;
    masterEditionPubkey: import("@solana/web3.js").PublicKey;
    createTxDetails: import("@metaplex-foundation/amman").ConfirmedTransactionDetails;
}>;
