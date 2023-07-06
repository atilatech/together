// RentableNFT.test.js
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("RentableNFT", function () {
    let rentableNFTInstance, accounts, RentableNFT;

    before(async function () {
        RentableNFT = await ethers.getContractFactory("RentableNFT")
        rentableNFTInstance = await RentableNFT.deploy();
        await rentableNFTInstance.deployed();
        accounts = await ethers.getSigners();
    });

    describe("Standards Support", function () {
        it("should support the ERC721 and ERC4907 standards", async () => {
            const ERC721InterfaceId = "0x80ac58cd";
            const ERC4907InterfaceId = "0xad092b5c";
            const isERC721 = await rentableNFTInstance.supportsInterface(ERC721InterfaceId);
            const isERC4907 = await rentableNFTInstance.supportsInterface(ERC4907InterfaceId);
            
            expect(isERC721).to.equal(true, "RentableNFT is not an ERC721");
            expect(isERC4907).to.equal(true, "RentableNFT is not an ERC4907");
        });
    });

    describe("User Information", function () {
        it("should not set UserInfo if not the owner", async () => {
            const expirationDatePast = 1660252958; // Aug 8 2022
            await rentableNFTInstance.mint("fakeURI");
            await expect(
                rentableNFTInstance.setUser(1, accounts[1], expirationDatePast, { from: accounts[1] })
            ).to.be.revertedWith("Ownable: caller is not the owner");
            
            const user = await rentableNFTInstance.userOf(1);
            const date = await rentableNFTInstance.userExpires(1);
            
            expect(user).to.equal(ethers.constants.ZERO_ADDRESS, "NFT user is not zero address");
            expect(date).to.equal(0, "NFT expiration date is not 0");
        });

        it("should return the correct UserInfo", async () => {
            const expirationDatePast = 1660252958; // Aug 8 2022
            const expirationDateFuture = 4121727755; // Aug 11 2100
            await rentableNFTInstance.mint("fakeURI");
            await rentableNFTInstance.mint("fakeURI");
            const expiredTx = await rentableNFTInstance.setUser(2, accounts[1].address, expirationDatePast);
            const unexpiredTx = await rentableNFTInstance.setUser(3, accounts[2].address, expirationDateFuture);
            console.log({expiredTx});
            console.log({unexpiredTx});
            const expiredNFTUser = await rentableNFTInstance.userOf(2);
            const expiredNFTDate = await rentableNFTInstance.userExpires(2);
            const unexpiredNFTUser = await rentableNFTInstance.userOf(3);
            const unexpiredNFTDate = await rentableNFTInstance.userExpires(3);
            
            expect(expiredNFTUser).to.equal(ethers.constants.ZERO_ADDRESS, "Expired NFT has wrong user");
            expect(expiredNFTDate).to.equal(expirationDatePast, "Expired NFT has wrong expiration date");
            expectEvent(expiredTx, "UpdateUser", { tokenId: "2", user: accounts[1], expires: expirationDatePast.toString() });
            expect(unexpiredNFTUser).to.equal(accounts[2], "Expired NFThas wrong user");
            expect(unexpiredNFTDate).to.equal(expirationDateFuture, "Expired NFT has wrong expiration date");
            expectEvent(unexpiredTx, "UpdateUser", { tokenId: "3", user: accounts[2], expires: expirationDateFuture.toString() });
            
            // Burn NFT
            const burnTx = await rentableNFTInstance.burn(3);
            
            // Assert UserInfo was deleted
            const burnedNFTUser = await rentableNFTInstance.userOf(3);
            const burnedNFTDate = await rentableNFTInstance.userExpires(3);
            expect(burnedNFTUser).to.equal(ethers.constants.ZERO_ADDRESS, "NFT user is not zero address");
            expect(burnedNFTDate).to.equal(0, "NFT expiration date is not 0");
            expectEvent(burnTx, "UpdateUser", { tokenId: "3", user: ethers.constants.ZERO_ADDRESS, expires: "0" });
        });
    });
});
