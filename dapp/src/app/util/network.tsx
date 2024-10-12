import { getFullnodeUrl } from "@mysten/sui/client";

const PACKAGE_ID = "0x...";

const network = {
  devnet: {
    url: getFullnodeUrl("devnet"),
    variables: {
      counterPackageId: PACKAGE_ID,
    },
  },
  testnet: {
    url: getFullnodeUrl("testnet"),
    variables: {
      counterPackageId: PACKAGE_ID,
    },
  },
  mainnet: {
    url: getFullnodeUrl("mainnet"),
    variables: {
      counterPackageId: PACKAGE_ID,
    },
  },
};

export { network };