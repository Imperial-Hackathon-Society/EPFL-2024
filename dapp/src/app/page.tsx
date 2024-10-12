"use client";

import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Fragment, useState } from "react";

type DoctorRequest = {
  name: string;
  date: Date;
  encrypted_data: string;
};

export default function Home() {
  const [pendingDoctorRequests, setPendingDoctorRequests] = useState<
    DoctorRequest[]
  >([
    {
      name: "John Doe",
      date: new Date(),
      encrypted_data: "encrypted_data",
    },
    {
      name: "Jane Doe",
      date: new Date(),
      encrypted_data: "encrypted_data",
    },
  ]);

  const account = useCurrentAccount();

  console.log(account);

  return (
    <div>
      <ConnectButton />
      {account && account.label === "Patient" && (
        <Fragment>
          <h1>Patient Portal</h1>
          <div style={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <button>Encrypt and Send to doctor</button>
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
