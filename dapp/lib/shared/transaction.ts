import { Transaction } from "@mysten/sui/transactions";
import { on } from "events";

const PACKAGE_ID =
  "0x731a6cb64d4f4e2e8b71ab1a4aab9ba3898bc103b18e744f8d63cc9bfc38ed4a";

function send(
  signAndExecute: any,
  args: (tx: Transaction) => any[],
  target: string,
  gasBudget: bigint,
  onSuccess: (result: any) => void
) {
  const tx = new Transaction();
  tx.moveCall({
    arguments: args(tx),
    target: `${PACKAGE_ID}::${target}`,
  });
  tx.setGasBudget(gasBudget);
  signAndExecute(
    {
      transaction: tx,
    },
    {
      onSuccess,
      onError: (error: any) => {
        console.error("UH OH! ", error);
      },
    }
  );
}

export { send };
