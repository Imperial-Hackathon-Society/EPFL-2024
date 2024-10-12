"use client";

import {
  useAccounts,
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
} from "@mysten/dapp-kit";
import { LOGIN_PAGE_PATH } from "@shinami/nextjs-zklogin";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const account = useCurrentAccount();

  const wallet = useWallets();
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();

  return (
    <div className="centered" style={{ width: "100%" }} id="maindiv">
      <div className="horizontal">
        <span className="plus">
          <div className="plus-x" />
          <div className="plus-y" />
        </span>
        <div>
          <h1>HEALTH-3</h1>
          <h4>Decentralized health records</h4>
        </div>
        <span className="plus">
          <div className="plus-x" />
          <div className="plus-y" />
        </span>
      </div>

      <div className="button-group">
        {account ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("maindiv")!.style.animation =
                  "fadeout 1s forwards";
                e.currentTarget.style.pointerEvents = "none";
                setTimeout(() => {
                  router.push("/patient");
                }, 1020);
              }}
              className="button"
            >
              Continue as {account.label}
            </button>
            <div id="connect">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  disconnect( );
                  // Delete ALL browser cache for this page:
                  localStorage.clear();
                  window.location.reload();
                }}
                className="button"
              >
                Log out
              </button>
            </div>
          </>
        ) : (
          <div id="connect">
            <Link
              href={LOGIN_PAGE_PATH}
              className="button"
              style={{pointerEvents: "all", textDecoration: "none"}}
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
