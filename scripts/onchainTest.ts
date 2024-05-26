import { address, toNano } from '@ton/core';
import { Manager } from '../wrappers/Manager';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../helpers/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const manager = provider.open(Manager.fromAddress(address('EQAraJXZSWWRaPLKzlROAgXTPzvxALWgqJAwD4FY3g1iCRtS')));

    const jettonParams = {
        name: 'bitcoin',
        description: 'TON bitcoin!',
        symbol: 'BTC',
        image: 'https://i.pinimg.com/736x/6a/de/d6/6aded693f2f4fe3e41834d5ca9877a8b.jpg',
    };

    const content = buildOnchainMetadata(jettonParams);
    const max_supply = toNano(1e9);

    await manager.send(
        provider.sender(),
        {
            value: toNano('0.7'),
        },
        {
            $$type: 'NewToken',
            content: content,
            max_supply: max_supply,
            tokenLauncher: provider.sender().address!,
            queryId: 2n,
        },
    );
}
