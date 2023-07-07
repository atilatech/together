# AfroShare: Easily Share Your Afropolitan NFTs with Others

AfroShare is a decentralized application (dApp) that allows users to share their Afropolitan Non-Fungible Tokens (NFTs) with others.

Imagine a situation where you hold an Afropolitan NFT, but you can't attend a token-gated event. However, you know someone who would love to attend but does not hold an Afropolitan NFT. AfroShare comes to the rescue!

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

### 1. Two Levels of Ownership
AfroShare introduces two levels of ownership:
- **Owner**: The original holder of the NFT
- **User**: The person who rents the NFT

### 2. Smart Contract
The NFT is stored as an **ERC-4907 Smart Contract** with:
- Two user roles: Owner and User
- An expiry field that specifies the rental duration

### 3. Near BOS Deployment
AfroShare is deployed on Near BOS, ensuring the dApp's security and reliability. The dApp is composed of three Near BOS components:
- **AfroShare**: The main application
- **RentNFT**: Handles the rental of NFTs
- **TokenGate**: Manages access to token-gated events

## Benefits
- Users can gain access to token-gated events even if they don’t own the required NFTs
- Owners can rent out their NFTs securely without losing ownership
- Facilitates interaction and collaboration within the Afropolitan community

## Conclusion
AfroShare solves a real problem by enabling Afropolitan NFT holders to share their NFTs with others for token-gated events. By introducing levels of ownership and employing smart contracts, AfroShare ensures security and enhances the community experience.