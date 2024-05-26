import { address, toNano } from '@ton/core';
import { Manager } from '../wrappers/Manager';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../helpers/jetton-helpers';
import { Token } from '../wrappers/Token';

export async function run(provider: NetworkProvider) {
    const token = provider.open(Token.fromAddress(address('EQD4gLPu3VjMh9CFmd2aPJB8Je6cT2DBPFl2OLb4ytKeOW-G')));

    await token.send(
        provider.sender(),
        {
            value: toNano('0.3'),
        },
        {
            $$type: 'MintAll',
            amount: 0n,
        },
    );
}
