import { toNano } from '@ton/core';
import { Manager } from '../wrappers/Manager';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const manager = provider.open(await Manager.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await manager.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(manager.address);

    console.log('ID', await manager.getId());
}
