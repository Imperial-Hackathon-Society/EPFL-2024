"use client";

import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Fragment, useState } from "react";
import { encrypt } from "./util/crypto";
import { Transaction } from "@mysten/sui/transactions";
import useTransaction from "./providers/transactionProvider";
import { send } from "./util/transaction";

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

  const signAndExecute = useTransaction();

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
                    send(
                      signAndExecute,
                      [],
                      "healthdata::create_collection",
                      10000000n,
                      (result) => {
                        console.log(result);
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
