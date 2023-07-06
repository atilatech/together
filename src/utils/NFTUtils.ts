import { ethers } from 'ethers';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
export class NFTUtils {

    static transferNFT = async (NFTAddress: string, tokenId: string, destinationAddress: string) => {
        // Using ethers to transfer NFT
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Instantiate the NFT contract
        const contract = new ethers.Contract(NFTAddress, NFT.abi, signer);

        // Transfer the NFT
        try {
            console.log({contract})
            // // for ambiguous functions (two functions with the same name), the signature must also be specified
            const transaction = await contract['safeTransferFrom(address,address,uint256)'](signer.getAddress(), destinationAddress, Number.parseInt(tokenId));
            // const transaction = await contract.safeTransferFrom(signer.getAddress(), destinationAddress, Number.parseInt(tokenId));
            await transaction.wait();
            console.log("NFT transferred successfully!");

            console.log("Transaction Hash:", transaction.hash);
            console.log("Transaction URL:", `https://goerli.etherscan.io/tx/${transaction.hash}`);

            return transaction;

        } catch (error) {
            console.error("Error transferring NFT:", error);
        }
    }
}
