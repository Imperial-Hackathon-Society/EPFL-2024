"use client";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { ZkLoginSessionProvider } from "@shinami/nextjs-zklogin/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { network } from "./network";

const queryClient = new QueryClient();

export default function SuiProvider({ children }: PropsWithChildren<{}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ZkLoginSessionProvider>
        <SuiClientProvider networks={network} defaultNetwork="testnet">
          <WalletProvider autoConnect>{children}</WalletProvider>
        </SuiClientProvider>
      </ZkLoginSessionProvider>
    </QueryClientProvider>
  );
}
