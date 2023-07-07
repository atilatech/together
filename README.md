# Together

A marketplace for buying and selling things together with friends.

![safe-space-demo-0 0 2](https://user-images.githubusercontent.com/9806858/216753361-7f4dab8a-5df7-4fcb-a671-5ca6e209eb24.gif)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/atilatech/together)

## Quickstart


```
git clone https://github.com/atilatech/together
cd safe-space
# git checkout <version> #optional if you want to use a specific version e.g. git checkout 0.4.0
yarn install
yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deploying smart contracts

1. Get some tokens to pay the gas fees for deploying the smart contracts:
    1. Ethereum Goerli: https://goerlifaucet.com

```bash
cp example.env .env
touch .privatekey
# put environment variables in .env and .privatekey
source .env
npx hardhat deploy --chain-id 5
```

1. Deploy the smart contract: `npx hardhat deploy --chain-id [chainId]`
    1. If you want to deploy just the NFT or the Market without deploying everything run:
        1.  `npx hardhat deploy:nft --chain-id [chainId]`
        1.  `npx hardhat deploy:market --chain-id [chainId]`
        1.  `npx hardhat deploy:rentableNFT --chain-id [chainId]`
    1. Here are some examples:
        1. Ethereum Goerli: `npx hardhat deploy --chain-id 5`
        1. Ethereum Goerli: `npx hardhat deploy:rentableNFT --chain-id 5`

### Verifying Smart Contract on Etherscan

1. Get Etherscan API Key: https://etherscan.io/myapikey
    1. Similar process for Other networks
1. Set environment variable in `.secrets`: `export ETHERSCAN_API_KEY=""`
1. `npx hardhat verify --network goerli [smart_contract_address_you_just deployed]`
    1. Example: `npx hardhat verify --network goerli 0x85942528541a1d7db9e9d84a074d0b2204c94b5a`
    1. To see a list of other networks: `npx hardhat verify --list-networks`

### Updating Contracts
`npx hardhat test`

`npx hardhat compile`

Note: Compile step may not be necessary if you already run `test`

## Contracts
1. NFT Marketplace: https://goerli.etherscan.io/address/0xa0a3c753387050d1949d6b8db672fff724b635c1#code

1. NFT: https://goerli.etherscan.io/address/0x85942528541a1d7db9e9d84a074d0b2204c94b5a#code

## Deploying an NFT to an existing Smart Contract

1. Get your infura API key.
1. Add it to `.env`
1. Edit `server/nfts.json`


```bash
source .env
node server/CreateNFT.js 'server/nfts.json'
```

### NFT Metadata Samples

1. [Afropolitan NFTs](https://docs.moralis.io/web3-data-api/evm/reference/get-multiple-nfts?tokens=[{%22token_address%22:%220xe652f7ef26d4ed34de2d83d4eebf291bd60ed2af%22,%22token_id%22:%220%22}]&normalizeMetadata=true&media_items=true&chain=eth)

2. [Near BOS Sample Endpoint](https://near.org/tomiwa1a1.near/widget/AfroShare?alchemyApiKey=uB5QD-LyGRGbOa5--7aWs-dyqxjb3z24&address=0x01431e11c0dea3a643a5ad73a605aa54ca4c085e&tokenId=1)


1. Normal NFT: https://goerli.etherscan.io/address/0x01431e11c0dea3a643a5ad73a605aa54ca4c085e#events

1. Rentable NFT: https://goerli.etherscan.io/address/0x8842da19ef17d1a10875e0ebddb6981e178b90d2#events