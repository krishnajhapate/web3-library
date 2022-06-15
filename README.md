# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# Create .env file in the root

```
ALCHEMY_RINKEBY_URL="<Your Alchemy rinkeby url>"
ACCOUNT_PRIVATE_KEY="<Your Private key>"
```

## Create .env.local file in the client folder

```
CONTRACT_ADDRESS="<YOUR DEPLOYED CONTRACT ADDRESS HERE>"
```
