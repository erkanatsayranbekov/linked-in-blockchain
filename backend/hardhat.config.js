require('@nomicfoundation/hardhat-toolbox');

module.exports = {
	solidity: {
		version: "0.8.24",
		settings: {
			optimizer: {
				enabled: true
			}
		}
	},
	allowUnlimitedContractSize: true,
	networks: {
		hardhat: {
			chanId: 31337
		},
		sepolia: {
			url: `https://eth-sepolia.g.alchemy.com/v2/RNTpoz6tGxuzLCjIZTBvQOTW-ohDn0id`,
			accounts: ['ac29b531519b4cf0834b9cf5416dcfc6ccdb945047eb9fd196191d46a762bc5d']
		}
	},
	paths: {
		artifacts: '../frontend/artifacts'
	}
}