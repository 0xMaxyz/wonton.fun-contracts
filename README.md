# th

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`


I updated the smart-contracts repo
1. create .env file, use the .env.example to see what fields this file should have
2. to deploy a new deployer contract, use the following script
./deploy.sh
if you want to deploy on mainnet use (I didn't test it on mainnet but it works on testnet)
./deploy.sh --mainnet
it uses toncenter api, so the required env vars shall be present (I didn't add checking for env vars in the script)
