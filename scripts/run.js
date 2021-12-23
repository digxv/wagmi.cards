const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory("MyEpicNFT");
    const contract = await contractFactory.deploy()
    await contract.deployed()
    console.log('Contract deployed to --> ', contract.address)
}

const run = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        process.exit(1)
    }
}

run()