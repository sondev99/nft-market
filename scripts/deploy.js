// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const path = require("path");

async function main() {

  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nFTMarketplace = await NFTMarketplace.deploy();

  await nFTMarketplace.deployed();

  console.log(
    `Deployed contract to  address ${nFTMarketplace.address}`
  );

  saveFrontendFiles(nFTMarketplace)
}

function saveFrontendFiles(nftMarketplace) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "src", "contracts");
  // console.log("contracts dir: " + contractsDir);

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ nftAddress: nftMarketplace.address }, undefined, 2)
  );

  const MarketplaceArtifact = artifacts.readArtifactSync("NFTMarketplace");

  fs.writeFileSync(
    path.join(contractsDir, "NFTMarketplace.json"),
    JSON.stringify(MarketplaceArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
