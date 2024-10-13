import { readFile } from "node:fs/promises";

export async function GET(req: Request) {
  const data = await readFile("data.json", "utf8");
  const dataArr = data
    .split("\n")
    .filter((line) => line.length > 5)
    .map((line) => JSON.parse(line));
  return Response.json(dataArr);
}
