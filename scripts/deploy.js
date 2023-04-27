const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

  const verifyContract = await ethers.getContractFactory("Verify");
  const deployedVerifyContract = await verifyContract.deploy();
  await deployedVerifyContract.deployed();

  console.log("verifyContract deployed to: ", deployedVerifyContract.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(40000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedVerifyContract.address,
    constructorArguments: [],
  })

}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
