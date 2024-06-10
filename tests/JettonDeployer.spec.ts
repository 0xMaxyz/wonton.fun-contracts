import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { JettonDeployer } from '../wrappers/JettonDeployer';
import '@ton/test-utils';

describe('JettonDeployer', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jettonDeployer: SandboxContract<JettonDeployer>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jettonDeployer = blockchain.openContract(await JettonDeployer.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jettonDeployer.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonDeployer.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jettonDeployer are ready to use
    });
});
