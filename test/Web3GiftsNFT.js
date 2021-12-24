const { expect } = require("chai");

describe("Web3 Gifts contract", () => {
    let Web3Gifts, web3gifts, ac1, ac2, acs;

    beforeEach(async() => {
        Web3Gifts = await ethers.getContractFactory("WagmiCards");
        web3gifts = await Web3Gifts.deploy("Web3Gifts", "W3G", "ipfs://");
        [ac1, ac2, ...acs] = await ethers.getSigners();
    });

    describe("Web3 Gifts", () => {
        it("Deploys successfully", async() => {
            const address = await web3gifts.address;
            const name = await web3gifts.name();
            const symbol = await web3gifts.symbol();
            const contrat_metadata = await web3gifts.contractURI();
            
            expect(address).to.be.not.equal(0x0);
            expect(address).to.be.a("string");
            expect(name).to.be.equal("Web3Gifts");
            expect(symbol).to.be.equal("W3G");
            expect(contrat_metadata).to.be.equal("ipfs://");
        });

        it("Mint NFT", async() => {
            let ac1_balance_prev = await ac1.getBalance();
            ac1_balance_prev = Number(ac1_balance_prev.toString());

            await web3gifts.mint("ipfs://", ac2.address, 1234, "Hello, merry christmas!", {value: ethers.utils.parseEther("1")});
            const tokenURI = await web3gifts.tokenURI(1);
            const owner = await web3gifts.ownerOf(1);
            expect(tokenURI).to.be.equal("ipfs://");
            expect(owner).to.be.equal(ac2.address);

            let ac1_balance_new = await ac1.getBalance();
            ac1_balance_new = Number(ac1_balance_new.toString());

            expect(ac1_balance_prev).to.be.greaterThan(ac1_balance_new);
        });

        it("Get Gifts", async () => {
            await web3gifts.mint("ipfs://", ac2.address, 1234, "Hello, merry christmas!", {value: ethers.utils.parseEther("1")});
            await web3gifts.mint("ipfs://", ac2.address, 1234, "Hello, merry christmas!", {value: ethers.utils.parseEther("1")});
            await web3gifts.mint("ipfs://", ac2.address, 1234, "Hello, merry christmas!", {value: ethers.utils.parseEther("1")});

            const result = await web3gifts.getAllGifts(ac2.address);

            expect(result).to.have.lengthOf(3);
        })

        it("Redeem", async() => {
            let ac2_balance_prev = await ac2.getBalance();
            ac2_balance_prev = Number(ac2_balance_prev.toString());

            await web3gifts.mint("ipfs://", ac2.address, 1234, "Hello, merry christmas!", {value: ethers.utils.parseEther("1")});
            await web3gifts.connect(ac2).redeem(1);

            let ac2_balance_new = await ac2.getBalance();
            ac2_balance_new = Number(ac2_balance_new.toString());

            expect(ac2_balance_new).to.be.greaterThan(ac2_balance_prev);
        })

        it("Redeem All", async () => {
            await web3gifts.mint("ipfs://", ac2.address, 1234, "Hello, merry christmas!", {value: ethers.utils.parseEther("1")});
            await web3gifts.mint("ipfs://", ac2.address, 1234, "Hello, merry christmas!", {value: ethers.utils.parseEther("1")});
            await web3gifts.mint("ipfs://", ac2.address, 1234, "Hello, merry christmas!", {value: ethers.utils.parseEther("1")});

            const result_prev = await web3gifts.getAllGifts(ac2.address);

            result_prev.forEach(gift => {
                expect(gift.redeemed).to.be.false;
            })

            await web3gifts.connect(ac2).redeemAll();

            const result_new = await web3gifts.getAllGifts(ac2.address);

            result_new.forEach(gift => {
                expect(gift.redeemed).to.be.true;
            })
        })
    })
})