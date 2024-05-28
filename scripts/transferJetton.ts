import { address, beginCell, contractAddress, toNano } from '@ton/core';
import { Manager } from '../wrappers/Manager';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../helpers/jetton-helpers';
import { Token } from '../wrappers/Token';
import { JettonDefaultWallet } from '../build/Jetton/tact_JettonDefaultWallet';

export async function run(provider: NetworkProvider) {
    //
    const jettonParams = {
        name: 'bitcoin',
        description: 'This is TON bitcoin!!!!!',
        symbol: 'BTC',
        image: 'https://i.pinimg.com/736x/6a/de/d6/6aded693f2f4fe3e41834d5ca9877a8b.jpg',
    };

    const content = buildOnchainMetadata(jettonParams);
    const max_supply = toNano(2e9);

    const init = await Token.init(provider.sender().address!, content, max_supply, provider.sender().address!);

    //
    const token = provider.open(Token.fromAddress(contractAddress(0, init)));
    console.log('Token address is: ', token.address);
    const max = await token.getGetWalletAddress(provider.sender().address!);

    const jettonWallet = provider.open(JettonDefaultWallet.fromAddress(max));
    console.log('My own address is: ', provider.sender().address!);
    console.log('My jetton wallet address is: ', max); // kQC6mRguhixA4xiEVWfrlwuVSMzoL86MT_CwzrLDeVOzO9hv

    const resp = await jettonWallet.send(
        provider.sender(),
        {
            value: toNano(0.3),
        },
        {
            to: address('0QAMIp2pmd5TiVsmH4B8FyTY5kuq43EGM1I8dGchMC5JTwMN'),
            $$type: 'TokenTransfer',
            amount: toNano(1000),
            forward_payload: beginCell().endCell(),
            custom_payload: null,
            forward_ton_amount: toNano(0.152),
            response_destination: provider.sender().address!,
            query_id: BigInt(Math.floor(Math.random() * 1e7)),
        },
    );
}
