import { address, fromNano, toNano } from '@ton/core';
import { Token } from '../wrappers/Token';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../helpers/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: 'bitcoin',
        description: 'This is TON bitcoin!!!!!',
        symbol: 'BTC',
        image: 'https://i.pinimg.com/736x/6a/de/d6/6aded693f2f4fe3e41834d5ca9877a8b.jpg',
    };

    const content = buildOnchainMetadata(jettonParams);
    const max_supply = toNano(2e9);

    //const addr = address('0QAMIp2pmd5TiVsmH4B8FyTY5kuq43EGM1I8dGchMC5JTwMN');

    const token = provider.open(
        await Token.fromInit(provider.sender().address!, content, max_supply, provider.sender().address!),
    );

    await token.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        },
    );

    await provider.waitForDeploy(token.address);

    await token.send(
        provider.sender(),
        {
            value: toNano('0.3'),
        },
        {
            $$type: 'MintAll',
            receiver: provider.sender().address!,
        },
    );

    console.log('Token deployed at:', token.address);
}
