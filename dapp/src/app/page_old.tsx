"use client";

import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Fragment, useState } from "react";
import { encrypt } from "./util/crypto";
import { send } from "./util/transaction";
import useTransaction from "./hooks/useTransaction";

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
                      (tx) => [
                        tx.object(
                          "0xd057d067fde385314a63580becbbdd3da7a2bbc6d2d6e07d787ae2c6a04f0daf"
                        ),
                        tx.pure.address(request.name),
                        tx.pure.vector("u8", new TextEncoder().encode(request.encrypted_data)),
                      ],
                      "healthdata::add_illness_block",
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
