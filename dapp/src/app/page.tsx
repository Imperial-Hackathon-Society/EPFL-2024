"use client";

import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Fragment, useState } from "react";
import { encrypt } from "./util/crypto";

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
                <button>Sign and upload</button>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
}
