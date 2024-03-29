import { Borsh, StringPublicKey } from '@remitano-anhdt/mpl-core';
import { MetadataKey } from './constants';
type Args = {
    key: StringPublicKey;
    verified: boolean;
};
export declare class Collection extends Borsh.Data<Args> {
    static readonly SCHEMA: any;
    key: StringPublicKey;
    verified: boolean;
    constructor(args: Args);
}
type CollectionAuthorityRecordArgs = {
    bump: number;
};
export declare class CollctionAuthorityRecord extends Borsh.Data<CollectionAuthorityRecordArgs> {
    static readonly SCHEMA: any;
    key: MetadataKey;
    bump: number;
    constructor(args: CollectionAuthorityRecordArgs);
}
export {};
