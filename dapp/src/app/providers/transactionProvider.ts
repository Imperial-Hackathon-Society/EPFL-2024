import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";

export default function useTransaction() {
  const client = useSuiClient();

  const { mutate: signAndExecute } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showEffects: true,
        },
      }),
  });

  return signAndExecute;
}