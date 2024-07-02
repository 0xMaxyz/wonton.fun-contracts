// import { toNano } from '@ton/core';
// import { JD } from '../wrappers/JettonDeployer';
// import { NetworkProvider } from '@ton/blueprint';

// export async function run(provider: NetworkProvider) {
//     const jettonDeployer = provider.open(await JD.fromInit(provider.sender().address!));

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



// PART 1

// import { Address, toNano } from '@ton/core';
// import { JD } from '../wrappers/JettonDeployer';
// import { NetworkProvider } from '@ton/blueprint';

// export async function run(provider: NetworkProvider) {
//     const jettonDeployer = provider.open(JD.fromAddress(Address.parse("kQDT1yw8sz-v1WCZwx_OSh9Ij07HXgLCv-UzvjuFZDrwVBm_"))); // current contract address

//     await jettonDeployer.send(
//         provider.sender(),
//         {
//             value: toNano('0.05'),
//         },
//         {
//             $$type: 'ChangeOwnerMsg',
//             new_owner: Address.parse('0QA8Gw78r0eRSfkHm_6CjQloZXCyH-MU-da_9GwBdAcDP4EO'), // new wallet
//         },
//     );

//     // It is possiblr yo check for seqno before and after tx but since it is just one tx, it can be checked using tonviewer
// }

// import { Address, toNano } from '@ton/core';
// import { JD } from '../wrappers/JettonDeployer';
// import { NetworkProvider } from '@ton/blueprint';

// export async function run(provider: NetworkProvider) {
//     const jettonDeployer = provider.open(JD.fromAddress(Address.parse("kQDT1yw8sz-v1WCZwx_OSh9Ij07HXgLCv-UzvjuFZDrwVBm_")));

//     const newOwner = await jettonDeployer.getOwner();
//     console.log('new owner is: ', newOwner);
// }

