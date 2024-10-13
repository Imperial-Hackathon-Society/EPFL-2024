import { throwExpression } from "../shared/utils";

export const MOVE_PACKAGE_ID =
  process.env.MOVE_PACKAGE_ID ??
  throwExpression(new Error("MOVE_PACKAGE_ID not configured"));
