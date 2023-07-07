# AfroShare: Easily Share Your Afropolitan NFTs with Others

[AfroShare](https://near.org/tomiwa1a1.near/widget/AfroShare?alchemyApiKey=uB5QD-LyGRGbOa5--7aWs-dyqxjb3z24&address=0x8842da19ef17d1a10875e0ebddb6981e178b90d2&tokenId=1) is a decentralized application (dApp) that allows users to share their Afropolitan Non-Fungible Tokens (NFTs) with others.

Consider a token-gated event that requires an Afropolitan NFT. You hold an Afropolitan NFT, but you can't attend the token-gated event. However, you know someone who would love to attend but doesn't hold an Afropolitan NFT. AfroShare comes to the rescue!

<img width="593" alt="Screen Shot 2023-07-07 at 10 31 50 AM" src="https://github.com/atilatech/together/assets/9806858/7876e4d5-2ba0-48ff-a594-e7ace05b533a">


## Features
AfroShare allows you to:
- Rent out your NFT to another user
- Set an expiry date for the rental, after which the NFT is returned to you
- Introduce two levels of ownership: Owner and User
- Securely store the NFT as an [ERC-4907 Smart Contract](https://eips.ethereum.org/EIPS/eip-4907) ([ERC-721](https://eips.ethereum.org/EIPS/eip-721) extension)
- dApp deployed on Near BOS
  - Audit code and ownership signatures
  - Compose and remix additional NFT features
  - Support NFTs on multiple blockchain chains

## How it Works

<img width="760" alt="Screen Shot 2023-07-07 at 10 28 22 AM" src="https://github.com/atilatech/together/assets/9806858/3bd2e50e-6cee-45a2-b8c9-9b6667ab57ec">


### 1. Smart Contract
The NFT is stored as a Rentable NFT **ERC-4907 Smart Contract** with:
- Two user roles: Owner and User
- An expiry field that specifies the rental duration

View the [Rentable Afropolitan NFT Smart Contract on Etherscan](https://goerli.etherscan.io/address/0x8842da19ef17d1a10875e0ebddb6981e178b90d2#code),  [Opensea](https://testnets.opensea.io/assets/goerli/0x8842da19ef17d1a10875e0ebddb6981e178b90d2/) and [Github](https://github.com/atilatech/together/blob/master/contracts/RentableNFT.sol).

### 2. Near BOS Components
AfroShare is deployed on Near BOS, ensuring the dApp's security and reliability. The dApp is composed of three Near BOS components:
- **[AfroShare](https://near.org/tomiwa1a1.near/widget/AfroShare)**: The main application
- **[RentNFT](https://near.org/tomiwa1a1.near/widget/RentNFT)**: Handles the rental of NFTs
- **[TokenGate](https://near.org/tomiwa1a1.near/widget/TokenGate)**: Manages access to token-gated events
- **[TransferNFT](https://near.org/tomiwa1a1.near/widget/TransferNFT)**: Transfer Full ownership of the event

## Benefits
- Users can gain access to token-gated events even if they don’t own the required NFTs
- Owners can rent out their NFTs securely without losing ownership
- Facilitates interaction and collaboration within the Afropolitan community and their friends
