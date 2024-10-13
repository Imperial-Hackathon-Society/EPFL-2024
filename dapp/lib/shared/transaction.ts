import {
  apiTxExecMutationFn,
  WithKeyPair,
} from "@shinami/nextjs-zklogin/client";
import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { RecentTxsResponse } from "./interfaces";
import { mask } from "superstruct";

export function useAddMutation(): UseMutationResult<
  any,
  any,
  any & WithKeyPair
> {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: apiTxExecMutationFn({
      baseUri: () => "/api/add",
      body: ({ keyPair, ...req }) => req,
    }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["api", "recent_txs"] });
    },
  });
}

export function useRecentTxsQuery() {
  return useQuery({
    queryKey: ["api", "recent_txs"],
    queryFn: async () => {
      const resp = await fetch("/api/recent_txs");
      if (resp.status !== 200)
        throw new Error(`Failed to fetch recent txs. ${resp.status}`);
      return mask(await resp.json(), RecentTxsResponse);
    },
  });
}
