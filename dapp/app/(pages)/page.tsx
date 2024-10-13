"use client";

import { AUTH_API_BASE, LOGIN_PAGE_PATH } from "@shinami/nextjs-zklogin";
import { useZkLoginSession } from "@shinami/nextjs-zklogin/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

export default function LoginPage() {
  const router = useRouter();

  const { user, isLoading } = useZkLoginSession();
  if (isLoading) return <Loading />; 

  return (
    <div className="centered just-load" style={{ width: "100%" }} id="maindiv">
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
        {user ? (
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
              Continue as Patient
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("maindiv")!.style.animation =
                  "fadeout 1s forwards";
                e.currentTarget.style.pointerEvents = "none";
                setTimeout(() => {
                  router.push("/doctor");
                }, 1020);
              }}
              className="button"
            >
              Continue as Doctor
            </button>
            <div id="connect">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`${AUTH_API_BASE}/logout`);
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
              style={{ pointerEvents: "all", textDecoration: "none" }}
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
