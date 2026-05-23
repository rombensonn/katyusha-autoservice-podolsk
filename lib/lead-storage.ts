import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import type { StoredLead } from "@/lib/lead-schema";

export async function saveLead(lead: StoredLead) {
  const dir = path.join(process.cwd(), "leads");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "leads.jsonl"), `${JSON.stringify(lead)}\n`, "utf8");
}
