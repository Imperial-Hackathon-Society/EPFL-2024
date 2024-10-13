import { readFile, writeFile } from "node:fs/promises";

export async function POST(req: Request) {
  const rd = await req.json();
  const id = rd.id;

  const data = await readFile("data.json", "utf8");
  const dataArr = data
    .split("\n")
    .filter((line) => line.length > 5)
    .map((line) => JSON.parse(line));

  const theReq = dataArr.find((req) => req.id === id);
  if (!theReq) {
    return Response.json({ status: "error" });
  }

  dataArr.splice(dataArr.indexOf(theReq), 1);
  await writeFile(
    "data.json",
    dataArr.map((req) => JSON.stringify(req)).join("\n") + "\n"
  );

  return Response.json({ data: theReq });
}
