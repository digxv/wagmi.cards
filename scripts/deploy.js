const main = async () => {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Web3Gifts = await ethers.getContractFactory("WagmiCards");
    const web3gifts = await Web3Gifts.deploy("wagmi.cards", "wagmi.cards", "ipfs://QmXqUMkNLRdpjHfwoAomzXPz9HfTLMZVsnjsX9HwbHJaBe");

    console.log("Contract address:", web3gifts.address);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
})