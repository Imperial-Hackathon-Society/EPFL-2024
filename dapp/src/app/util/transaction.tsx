import { Transaction } from "@mysten/sui/transactions";

const PACKAGE_ID =
  "0x7af34999d4a02ac64324e10335bd9c50b47d7f69b63474f6f76c03576672e67c";

function send(
  signAndExecute: any,
  args: any[],
  target: string,
  gasBudget: bigint,
  onSuccess: (result: any) => void
) {
  const tx = new Transaction();
  tx.moveCall({
    arguments: args,
    target: `${PACKAGE_ID}::${target}`,
  });
  tx.setGasBudget(gasBudget);
  signAndExecute(
    {
      transaction: tx,
    },
    {
      onSuccess,
    }
  );
}

export { send };
