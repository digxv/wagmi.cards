require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: `0.8.0`,
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_STAGING_ALCHEMY_KEY,
      accounts: [process.env.RINKEBY_PRIVATE_KEY],
    },
    // mainnet: {
    //   url: process.env.RINKEBY_STAGING_ALCHEMY_KEY,
    //   accounts: [process.env.RINKEBY_PRIVATE_KEY],
    // },
  },
  // gas...,
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};