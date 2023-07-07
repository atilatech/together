# AfroShare: Easily Share Your Afropolitan NFTs with Others

AfroShare is a decentralized application (dApp) that allows users to share their Afropolitan Non-Fungible Tokens (NFTs) with others.

Imagine a situation where you hold an Afropolitan NFT, but you can't attend a token-gated event. However, you know someone who would love to attend but does not hold an Afropolitan NFT. AfroShare comes to the rescue!

<img width="593" alt="Screen Shot 2023-07-07 at 10 31 50 AM" src="https://github.com/atilatech/together/assets/9806858/7876e4d5-2ba0-48ff-a594-e7ace05b533a">


## Features
AfroShare allows you to:
- Rent out your NFT to another user
- Set an expiry date for the rental, after which the NFT is returned to you
- Introduce two levels of ownership: Owner and User
- Securely store the NFT as an ERC-4907 Smart Contract (ERC-721 extension)
- Audit code and ownership signatures
- Compose and remix additional NFT features
- Support NFTs on multiple blockchain chains

## How it Works

<img width="760" alt="Screen Shot 2023-07-07 at 10 28 22 AM" src="https://github.com/atilatech/together/assets/9806858/3bd2e50e-6cee-45a2-b8c9-9b6667ab57ec">


### 1. Two Levels of Ownership
AfroShare introduces two levels of ownership:
- **Owner**: The original holder of the NFT
- **User**: The person who rents the NFT

### 2. Smart Contract
The NFT is stored as a Rentable NFT **ERC-4907 Smart Contract** with:
- Two user roles: Owner and User
- An expiry field that specifies the rental duration

1. View the [Rentable Afropolitan NFT Smart Contract on Etherscan](https://goerli.etherscan.io/address/0x8842da19ef17d1a10875e0ebddb6981e178b90d2#code),  [Opensea](https://testnets.opensea.io/assets/goerli/0x8842da19ef17d1a10875e0ebddb6981e178b90d2/) and [Github](https://github.com/atilatech/together/blob/b1cf121d7985bc204db0f9a53622c1e19069abb3/contracts/RentableNFT.sol).

### 3. Near BOS Components
AfroShare is deployed on Near BOS, ensuring the dApp's security and reliability. The dApp is composed of three Near BOS components:
- **[AfroShare](https://near.org/tomiwa1a1.near/widget/AfroShare)**: The main application
- **[RentNFT](https://near.org/tomiwa1a1.near/widget/RentNFT)**: Handles the rental of NFTs
- **[TokenGate](https://near.org/tomiwa1a1.near/widget/TokenGate)**: Manages access to token-gated events
- **[TransferNFT](https://near.org/tomiwa1a1.near/widget/TransferNFT)**: Transfer Full ownership of the event

## Benefits
- Users can gain access to token-gated events even if they don’t own the required NFTs
- Owners can rent out their NFTs securely without losing ownership
- Facilitates interaction and collaboration within the Afropolitan community

## Conclusion
AfroShare solves a real problem by enabling Afropolitan NFT holders to share their NFTs with others for token-gated events. By introducing levels of ownership and employing smart contracts, AfroShare ensures security and enhances the community experience.
