// RentableNFT.test.js
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("RentableNFT", function () {
    let rentableNFTInstance, accounts;

    before(async function () {
        const RentableNFT = await ethers.getContractFactory("RentableNFT");
        rentableNFTInstance = await RentableNFT.deploy();
        accounts = await ethers.getSigners();
    });

    describe("Standards Support", function () {
        it("should support the ERC721 and ERC4907 standards", async () => {
            const ERC721InterfaceId = "0x80ac58cd";
            const ERC4907InterfaceId = "0xad092b5c";
            const isERC721 = await rentableNFTInstance.supportsInterface(ERC721InterfaceId);
            const isERC4907 = await rentableNFTInstance.supportsInterface(ERC4907InterfaceId);

            expect(isERC721).to.be.true;
            expect(isERC4907).to.be.true;
        });
    });

    describe("User Information", function () {
        it("should not set UserInfo if not the owner", async () => {
            const expirationDatePast = Math.floor(Date.now() / 1000) + 60; // Expires in 1 minute
            await rentableNFTInstance.connect(accounts[0]).mint("fakeURI");
            await expect(
                rentableNFTInstance.connect(accounts[1]).setUser(1, accounts[1].address, expirationDatePast)
            ).to.be.revertedWith("ERC721: transfer caller is not owner nor approved");

            const user = await rentableNFTInstance.userOf(1);
            const date = await rentableNFTInstance.userExpires(1);

            expect(user).to.equal(ethers.constants.AddressZero);
            expect(date).to.equal(0);
        });

        it("should set and return the correct UserInfo", async () => {
            const expirationDateFuture = Math.floor(Date.now() / 1000) + 3600; // Expires in 1 hour
            await rentableNFTInstance.connect(accounts[0]).mint("fakeURI");

            const setUserTx = await rentableNFTInstance.connect(accounts[0]).setUser(2, accounts[1].address, expirationDateFuture);
            await setUserTx.wait();

            const user = await rentableNFTInstance.userOf(2);
            const date = await rentableNFTInstance.userExpires(2);

            expect(user).to.equal(accounts[1].address);
            expect(date).to.equal(expirationDateFuture);
        });

        it("should clear UserInfo upon transfer", async () => {
            const expirationDateFuture = Math.floor(Date.now() / 1000) + 3600; // Expires in 1 hour
            await rentableNFTInstance.connect(accounts[0]).mint("fakeURI");
            await rentableNFTInstance.connect(accounts[0]).setUser(3, accounts[1].address, expirationDateFuture);

            await rentableNFTInstance.connect(accounts[0]).transferFrom(accounts[0].address, accounts[2].address, 3);

            const userAfterTransfer = await rentableNFTInstance.userOf(3);
            const dateAfterTransfer = await rentableNFTInstance.userExpires(3);

            expect(userAfterTransfer).to.equal(ethers.constants.AddressZero);
            expect(dateAfterTransfer).to.equal(0);
        });
    });
});
