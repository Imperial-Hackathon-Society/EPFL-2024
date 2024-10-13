import { MOVE_PACKAGE_ID } from "@/lib/api/move";
import { gas, sui } from "@/lib/api/shinami";
import { first } from "@/lib/shared/utils";
import { buildGaslessTransaction } from "@shinami/clients/sui";
import {
  GaslessTransactionBuilder,
  TransactionResponseParser,
  zkLoginSponsoredTxExecHandler,
} from "@shinami/nextjs-zklogin/server/pages";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const buildTx: GaslessTransactionBuilder = async (req, { wallet }) => {
  console.log("Preparing add tx for zkLogin wallet", wallet);

  return await buildGaslessTransaction(
    (txb) => {
      txb.moveCall({
        target: `${MOVE_PACKAGE_ID}::healthdata::add_illness_block`,
        arguments: [txb.pure.vector("u8", new Uint8Array([1, 2, 3, 4]))],
      });
    },
    {
      sui: sui,
    }
  );
};

const parseTxRes: TransactionResponseParser<any> = (_, txRes) => {
  const event = first(txRes.events);
  if (!event) return { txDigest: txRes.digest };

  return { ...(event.parsedJson as Object), txDigest: txRes.digest };
};

export default zkLoginSponsoredTxExecHandler(sui, gas, buildTx, parseTxRes, {
  showEvents: true,
});
