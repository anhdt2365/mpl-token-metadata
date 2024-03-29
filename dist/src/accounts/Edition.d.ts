/// <reference types="node" />
import { Borsh, Account, AnyPublicKey, StringPublicKey } from '@remitano-anhdt/mpl-core';
import { AccountInfo, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { Buffer } from 'buffer';
import { MetadataKey } from './constants';
type Args = {
    key: MetadataKey;
    parent: StringPublicKey;
    edition: BN;
};
export declare class EditionData extends Borsh.Data<Args> {
    static readonly SCHEMA: any;
    key: MetadataKey;
    parent: StringPublicKey;
    edition: BN;
    constructor(args: Args);
}
export declare class Edition extends Account<EditionData> {
    static readonly EDITION_PREFIX = "edition";
    constructor(key: AnyPublicKey, info: AccountInfo<Buffer>);
    static getPDA(mint: AnyPublicKey): Promise<PublicKey>;
    static isCompatible(data: Buffer): boolean;
}
export {};
