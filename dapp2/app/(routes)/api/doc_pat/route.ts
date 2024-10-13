import { existsSync } from "node:fs";
import { appendFile, unlink, writeFile } from "node:fs/promises";

export async function POST(req: Request) {
  const data = await req.json();
  const dataString = JSON.stringify(data, null, 0);

  await appendFile("data.json", dataString + "\n");

  return Response.json({ status: "ok" });
}
