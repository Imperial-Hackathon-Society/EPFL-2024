import { Infer, array, object, string } from "superstruct";

export const RecentTxsResponse = object({
  txDigests: array(string()),
});
export type RecentTxsResponse = Infer<typeof RecentTxsResponse>;
