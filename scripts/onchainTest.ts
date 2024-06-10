import { address, toNano } from '@ton/core';
import { JD } from '../wrappers/JettonDeployer';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../helpers/jetton-helpers';
import dotenv from 'dotenv';
dotenv.config();

export async function run(provider: NetworkProvider) {
    const manager = provider.open(JD.fromAddress(address(process.env.DEPLOYER_ADDRESS!)));

    const jettonParams = {
        name: `Max ${Math.random() * 1e4}`,
        description: 'MaXX',
        symbol: 'MX',
        image: 'this is image address',
    };

    const content = buildOnchainMetadata(jettonParams);
    const max_supply = toNano(1e9);

    await manager.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'NewToken',
            content: content,
            max_supply: max_supply,
            tokenLauncher: provider.sender().address!,
            queryId: 0n,
            website: 'website',
            telegram: 'telegram',
            twitter: 'twitter',
        },
    );
}
