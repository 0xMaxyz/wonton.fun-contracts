#!/bin/bash
source .env
clear

deploy_testnet() {
    echo "Deploying to Testnet..."
    yarn blueprint run deployJettonDeployer --mnemonic --custom "https://testnet.toncenter.com/api/v2/jsonRPC" --custom-type testnet --custom-key $TONCENTER_API_KEY --tonviewer
}

deploy_mainnet() {
    echo "Deploying to Mainnet..."
    yarn blueprint run deployJettonDeployer --mnemonic --custom "https://toncenter.com/api/v2/jsonRPC" --custom-type mainnet --custom-key $TONCENTER_API_KEY --tonviewer
}

# updateEnv() {
#     env_file=".env"
#     if [ -f "$env_file" ]; then
#         # Check if DEPLOYER_ADDRESS already exists in the file
#         if grep -q "^DEPLOYER_ADDRESS=" "$env_file"; then
#             # Update the existing line using a different delimiter (e.g., |)
#             sed -i "s|^DEPLOYER_ADDRESS=.*|DEPLOYER_ADDRESS=$contract_address|" "$env_file"
#         else
#             # Add the DEPLOYER_ADDRESS variable to the file
#             echo "DEPLOYER_ADDRESS=$contract_address" >>"$env_file"
#         fi
#     else
#         # Create the .env file with the DEPLOYER_ADDRESS variable
#         echo "DEPLOYER_ADDRESS=$contract_address" >"$env_file"
#     fi

#     echo "Updated .env with DEPLOYER_ADDRESS=$contractAddress"
# }

show_help() {
    echo "Usage: $0 [--testnet | --mainnet], default: --testnet"
    echo
    echo "Options:"
    echo "  --testnet   Deploy to testnet."
    echo "  --mainnet   Deploy to mainnet."
}

if [ $# -eq 0 ]; then
    deploy_testnet
fi

while [ $# -gt 0 ]; do
    case "$1" in
    --testnet)
        deploy_testnet
        exit 1
        ;;
    --mainnet)
        deploy_mainnet
        exit 1
        ;;
    *)
        echo "Invalid option: $1"
        show_help
        exit 1
        ;;
    esac
done
