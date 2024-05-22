// import { getHttpEndpoint } from '@orbs-network/ton-access';
// import exp from 'constants';
// import dotenv from 'dotenv';
// import { OpenedContract, TonClient, WalletContractV4, internal } from 'ton';
// import { KeyPair, mnemonicToWalletKey } from 'ton-crypto';
// dotenv.config();

// let key: KeyPair;
// let initialized: boolean;
// let wallet: WalletContractV4;
// let endpoint: string;
// let client: TonClient;
// let walletContract: OpenedContract<WalletContractV4>;

// const faucet = 'EQCSES0TZYqcVkgoguhIb8iMEo4cvaEwmIrU5qbQgnN8fmvP';

// const sleep = async function (ms: number): Promise<void> {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// };

// const initialize = async function () {
//     if (!initialized) {
//         //
//         const mnemonic: string[] = process.env.MNEMONIC!.split(' ');
//         key = await mnemonicToWalletKey(mnemonic);
//         wallet = WalletContractV4.create({
//             publicKey: key.publicKey,
//             workchain: 0,
//         });
//         endpoint = await getHttpEndpoint({ network: 'testnet' });
//         client = new TonClient({ endpoint });
//         walletContract = client.open(wallet);

//         initialized = true;
//     }
// };

// const transferTokens = async function () {
//     const seqno = await walletContract.getSeqno();

//     await walletContract.sendTransfer({
//         secretKey: key.secretKey,
//         seqno: seqno,
//         messages: [
//             internal({
//                 to: faucet,
//                 value: '0.1',
//                 body: 'Heyyy',
//                 bounce: false,
//             }),
//         ],
//     });
//     console.log('Previous Nounce: ', seqno);
//     await sleep(10000);
//     console.log('New Nounce: ', await walletContract.getSeqno());
// };

// const testDeployed = async function () {
//     await initialize();
//     if (await client.isContractDeployed(wallet.address)) {
//         console.log(wallet.address, ': Deployed');
//     } else {
//         console.log(wallet.address, ': Not Deployed');
//     }
// };

// initialize()
//     .then(async () => await testDeployed())
//     .then(async () => await transferTokens())
//     .then(async () => await testDeployed())
//     .catch((e) => console.log(e));
