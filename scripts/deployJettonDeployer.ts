import { toNano } from '@ton/core';
import { JD } from '../wrappers/JettonDeployer';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jettonDeployer = provider.open(await JD.fromInit(provider.sender().address!));

    await jettonDeployer.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        },
    );

    await provider.waitForDeploy(jettonDeployer.address);
}
