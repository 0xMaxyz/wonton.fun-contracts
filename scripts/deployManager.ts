import { toNano } from '@ton/core';
import { Manager } from '../wrappers/Manager';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const manager = provider.open(await Manager.fromInit(provider.sender().address!, toNano('0.203')));

    await manager.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 3n,
        },
    );

    await provider.waitForDeploy(manager.address);

    console.log(await manager.getOwner());
}
