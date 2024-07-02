// import { Address, toNano } from '@ton/core';
// import { JD } from '../wrappers/JettonDeployer';
// import { NetworkProvider } from '@ton/blueprint';

// export async function run(provider: NetworkProvider) {
//     const jettonDeployer = provider.open(JD.fromAddress(Address.parse("Current contract address")));

//     await jettonDeployer.send(
//         provider.sender(),
//         {
//             value: toNano('0.05'),
//         },
//         {
//             $$type: 'ChangeOwnerMsg',
//             new_owner: Address.parse('0QA8Gw78r0eRSfkHm_6CjQloZXCyH-MU-da_9GwBdAcDP4EO'),
//         },
//     );

//     // It is possiblr yo check for seqno before and after tx but since it is just one tx, it can be checked using tonviewer
// }


// TEST deploy from high load

// import { toNano } from '@ton/core';
// import { JD } from '../wrappers/JettonDeployer';
// import { NetworkProvider } from '@ton/blueprint';

// import {
//     Address,
//     TonClient,
//     beginCell,
//     JettonMaster,
//     toNano,
//     SendMode,
// } from "@ton/ton";
// import { HighloadWalletV2 } from "@scaleton/highload-wallet";

// import { mnemonicToPrivateKey } from "@ton/crypto";

// export async function run() {
//     // const jettonDeployer = provider.open(await JD.fromInit(provider.sender().address!));

//     // await jettonDeployer.send(
//     //     provider.sender(),
//     //     {
//     //         value: toNano('0.05'),
//     //     },
//     //     {
//     //         $$type: 'Deploy',
//     //         queryId: 0n,
//     //     },
//     // );

//     // await provider.waitForDeploy(jettonDeployer.address);


//     //  high load

//     const keyPair = await mnemonicToPrivateKey(process.env.WALLET_MNEMONIC!.split(" "));

//     let tonClient = new TonClient({
//         endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
//         apiKey: process.env.TONCENTER_API_KEY,
//     });

//     // Initialize HighloadWallet
//     let highloadWallet = new HighloadWalletV2(keyPair.publicKey);

//     // Initialize contract provider and sender
//     let provider = tonClient.provider(
//         highloadWallet.address,
//         highloadWallet.init
//     );

//     // provider

//     const jettonDeployer = provider.open(await JD.fromInit(Address.parse('0QA8Gw78r0eRSfkHm_6CjQloZXCyH-MU-da_9GwBdAcDP4EO')));

//     // Deploy contract

//     await jettonDeployer.send(
//         provider.sender(),
//         {
//             value: toNano('0.05'),
//         },
//         {
//             $$type: 'Deploy',
//             queryId: 0n,
//         },
//     );

//     await provider.waitForDeploy(jettonDeployer.address);
// }
