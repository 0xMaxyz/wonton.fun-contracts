import { Blockchain, Event, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, address, beginCell, fromNano, toNano } from '@ton/core';
import type { EventAccountCreated } from '@ton/sandbox';
import { Manager } from '../wrappers/Manager';
import '@ton/test-utils';
import { buildOnchainMetadata } from '../helpers/jetton-helpers';
import { Token } from '../wrappers/Token';
import { JettonDefaultWallet } from '../build/Jetton/tact_JettonDefaultWallet';
import { sleep } from '@ton/blueprint';

describe('Manager', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let manager: SandboxContract<Manager>;
    let token: SandboxContract<Token>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        deployer = await blockchain.treasury('deployer');

        manager = blockchain.openContract(await Manager.fromInit(deployer.address, toNano('0.2')));

        const deployResult = await manager.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: manager.address,
            deploy: true,
            success: true,
        });
    });

    describe('Launch Token', () => {
        let tokenLauncher;
        let tokenReceiver;
        const jettonParams = {
            name: 'bitcoin',
            description: 'This is TON bitcoin!',
            symbol: 'BTC',
            image: 'https://en.wikipedia.org/wiki/Bitcoin#/media/File:Bitcoin.svg',
        };

        const content = buildOnchainMetadata(jettonParams);
        const max_supply = toNano(1e9);
        let deployerTokenWalletContract: SandboxContract<JettonDefaultWallet>;
        beforeEach(async function () {
            tokenLauncher = await blockchain.treasury('tokenLauncher');
            tokenReceiver = await blockchain.treasury('tokenReceiver');

            let balance = await manager.getBalance();
            console.log('Manager Balance Before: ', fromNano(balance));

            const result = await manager.send(
                tokenLauncher.getSender(),
                {
                    value: toNano(10),
                },
                {
                    $$type: 'NewToken',
                    max_supply: max_supply,
                    tokenLauncher: tokenLauncher.address,
                    content: content,
                    queryId: 0n,
                },
            );
            const tokenAddress = result.events
                .filter((x): x is EventAccountCreated => x.type == 'account_created')
                .map((x) => x.account)[0];

            console.log(tokenAddress);

            token = blockchain.openContract(Token.fromAddress(tokenAddress));

            console.log('CalcTokenAddress: ', token.address);
            console.log('Deployer Address: ', deployer.address);
            console.log('Token Owner:', await token.getOwner());

            // Get manager balance

            balance = await manager.getBalance();
            console.log('Manager Balance After: ', fromNano(balance));
            //console.log(result);

            // console.log(result);

            // expect(result.transactions).toHaveTransaction({
            //     body: beginCell().storeStringTail('Token Launched').endCell(),
            // });

            // await sleep(5000);

            // init token

            // const ownerAddress = await token.getOwner();

            // expect(ownerAddress).toBe(deployer.address);
            // get owner wallet contract for the deployed token
            // const deployerTokenWalletAddress = await token.getGetWalletAddress(deployer.address);
            // // open deployer wallet contract
            // deployerTokenWalletContract = blockchain.openContract(
            //     JettonDefaultWallet.fromAddress(deployerTokenWalletAddress),
            // );
        }, 20000);
        it('Does not allow to mint again', async function () {
            // const result = await token.send(
            //     deployer.getSender(),
            //     {
            //         value: 0n,
            //     },
            //     {
            //         $$type: 'Mint',
            //         amount: toNano('100'),
            //         receiver: deployer.address,
            //     },
            // );
            // console.log(result);
        });
        // it('Transfers from vault to other wallets', async function () {});
    });
});
