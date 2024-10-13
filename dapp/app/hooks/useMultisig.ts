import { MultiSigPublicKey } from "@mysten/sui/multisig";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { useCurrentWallet, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";

function multisigAddr() {
  const kp1 = new Ed25519Keypair();
  const kp2 = new Ed25519Keypair();

  const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
    threshold: 2,
    publicKeys: [
      {
        publicKey: kp1.getPublicKey(),
        weight: 1
      },
      {
        publicKey: kp2.getPublicKey(),
        weight: 1
      }
    ]
  });

  return { kp: multiSigPublicKey, kp1, kp2 }
}

export default function useMultisigTransaction() {
  const client = useSuiClient();
  const { kp, kp1, kp2 } = multisigAddr();

  const wallet = useCurrentWallet();
  console.log(wallet);

  const { mutate: signAndExecute } = useSignAndExecuteTransaction({
    execute: async ({ bytes }) => {
      const byteBuffer = new TextEncoder().encode(bytes);
      const sig1 = (await kp1.signTransaction(byteBuffer)).signature;
      const sig2 = (await kp2.signTransaction(byteBuffer)).signature;
      const combinedSig = kp.combinePartialSignatures([sig1, sig2]);

      const isValid = await kp.verifyTransaction(byteBuffer, combinedSig);
      if (!isValid) {
        throw new Error("Invalid signature");
      }

      return await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature: combinedSig,
        options: {
          showRawEffects: true,
          showEffects: true,
        },
      });
    }
  });

  return signAndExecute;
}