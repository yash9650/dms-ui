export function encodeObject(obj: any): string {
  const json = JSON.stringify(obj);
  return Buffer.from(json, "utf-8").toString("base64");
}
export function decodeObject(base64: string): any {
  const json = Buffer.from(base64, "base64").toString("utf-8");
  return JSON.parse(json);
}
