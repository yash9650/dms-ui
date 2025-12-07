export function encodeObject(obj: any): string {
  const json = JSON.stringify(obj);
  return Buffer.from(json, "utf-8").toString("base64");
}
export function decodeObject(base64: string): any {
  const json = Buffer.from(base64, "base64").toString("utf-8");
  return JSON.parse(json);
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];

  const index = Math.floor(Math.log(bytes) / Math.log(k));

  const value = bytes / Math.pow(k, index);

  return parseFloat(value.toFixed(dm)) + " " + sizes[index];
}

export function formatDate(dateInput: string | number | Date): string {
  const date = new Date(dateInput);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
