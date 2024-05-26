import { address, fromNano, toNano } from '@ton/core';
import { Token } from '../wrappers/Token';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../helpers/jetton-helpers';
import { JettonDefaultWallet } from '../build/Jetton/tact_JettonDefaultWallet';
import { WalletContractV4 } from '@ton/ton';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: 'bitcoin',
        description: 'This is TON bitcoin!!!!',
        symbol: 'BTC',
        image: 'https://i.pinimg.com/736x/6a/de/d6/6aded693f2f4fe3e41834d5ca9877a8b.jpg',
    };

    const content = buildOnchainMetadata(jettonParams);
    const max_supply = toNano(1e9);

    const addr = address('0QAMIp2pmd5TiVsmH4B8FyTY5kuq43EGM1I8dGchMC5JTwMN');

    //const token = provider.open(await Token.fromInit(addr, content, max_supply, addr));

    // const owner = address('0QAMIp2pmd5TiVsmH4B8FyTY5kuq43EGM1I8dGchMC5JTwMN');
    // const master = address('kQAP3ULhCe1tWGExbVHs7B45elt33RDwYiQiymJRXjsRiQA1');
    // const token = provider.open(Token.fromAddress(master));
    // const walletAddress = await token.getGetWalletAddress(owner);
    // console.log('Real wallet address is: ', walletAddress);
    // const walletFromInit = provider.open(await JettonDefaultWallet.fromInit(owner, master));
    // console.log('Address from Init: ', walletFromInit.address);
    // const wallet = provider.open(JettonDefaultWallet.fromAddress(walletAddress));
    // const walletData = await wallet.getGetWalletData();
    // console.log('Account Balance is: ', fromNano(walletData.balance));

    const requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
    };
    const response = await fetch('https://toncenter.com/api/v3/jetton/masters?limit=128&offset=0', requestOptions);
    if (response.ok) {
        console.log(await response.json());
    }

    // await token.send(
    //     provider.sender(),
    //     {
    //         value: toNano('0.1'),
    //     },
    //     {
    //         $$type: 'Deploy',
    //         queryId: 3n,
    //     },
    // );

    // await provider.waitForDeploy(token.address);

    // await token.send(
    //     provider.sender(),
    //     {
    //         value: toNano('0.3'),
    //     },
    //     {
    //         $$type: 'MintAll',
    //         amount: 0n,
    //     },
    // );

    // console.log('Token deployed at:', token.address);
}
