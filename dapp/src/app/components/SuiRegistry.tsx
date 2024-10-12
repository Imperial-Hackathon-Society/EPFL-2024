"use client";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { network } from "../util/networkConfig";

const queryClient = new QueryClient();

export default function SuiRegistry({ children }: PropsWithChildren<any>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={network} defaultNetwork="testnet">
        <WalletProvider>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
