"use client";

import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Fragment, useState } from "react";
import { encrypt } from "./util/crypto";
import { Transaction } from "@mysten/sui/transactions";

type DoctorRequest = {
  name: string;
  date: Date;
  encrypted_data: string;
};

export default function Home() {
  const [pendingDoctorRequests, setPendingDoctorRequests] = useState<
    DoctorRequest[]
  >([]);

  const account = useCurrentAccount();
  const password = "freaky password";

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

  return (
    <div>
      <ConnectButton />
      {account && account.label === "Patient" && (
        <Fragment>
          <h1>Patient Portal</h1>
          <div style={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <button
              onClick={async () => {
                const data = await encrypt(password, "data");
                setPendingDoctorRequests([
                  ...pendingDoctorRequests,
                  {
                    name: account.address,
                    date: new Date(),
                    encrypted_data: data,
                  },
                ]);
              }}
            >
              Encrypt and Send to doctor
            </button>
          </div>
        </Fragment>
      )}

      {account && account.label === "Doctor" && (
        <Fragment>
          <h1>Doctor Portal</h1>

          <h2>Pending Requests</h2>
          <div>
            {pendingDoctorRequests.map((request, i) => (
              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                key={i}
              >
                <p>{request.name}</p>
                <p>{request.date.toLocaleString()}</p>
                <button
                  onClick={() => {
                    const tx = new Transaction();
                    tx.moveCall({
                      arguments: [],
                      target: `${"0x7af34999d4a02ac64324e10335bd9c50b47d7f69b63474f6f76c03576672e67c"}::heathdata::create_collection`,
                    });
                    tx.setGasBudget(1000000000);
                    signAndExecute(
                      {
                        transaction: tx,
                      },
                      {
                        onSuccess: (result) => {
                          console.log(result);
                        },
                        onError: (error) => {
                          console.error(error);
                        },
                      }
                    );
                  }}
                >
                  Sign and upload
                </button>
                <p>{request.encrypted_data}</p>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
}
