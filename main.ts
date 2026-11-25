// unsent-micro-confession-01 — a micro-confession in exactly two parts.
//
// The entry, in two parts:
//   1. A "To:" line naming who it was meant for (a relationship).
//   2. The unsent message itself, one line, written exactly as typed.
// The two parts need each other: the confession only makes sense when
// you know who it was meant for, and the "To:" line only matters
// because of what follows it. The reason it stayed in drafts lives
// inside the line itself: sending it would hurt the mother the sender
// has been quietly protecting.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Where the judge reads the entry from.
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// Part 1 — who it was meant for (a relationship, no full name).
const TO_LINE = "To: Kakak";

// Part 2 — the unsent message, one line, exactly as typed.
const MESSAGE =
  "I still send Ibu 500 ribu every month and sign it with your name, because the month you stopped, she waited by the door until maghrib.";

// Guard: the entry must be exactly two parts — a "To:" line, then the
// message. Anything else is not the format this bounty asks for.
// Both parts must be a single line each: a wrapped "To:" is not a "To:"
function checkTwoParts(toLine: string, message: string): void {
  if (!toLine.startsWith("To: ")) {
    throw new Error("first line must start with 'To: '");
  }
  if (toLine.includes("\n") || toLine.includes("\r")) {
    throw new Error("To: line must be a single line");
  }
  if (message.length === 0) {
    throw new Error("message is empty");
  }
  if (message.includes("\n") || message.includes("\r")) {
    throw new Error("message must be a single line");
  }
}

// Write both parts plus a trailing newline, so the file ends cleanly.
function saveEntry(toLine: string, message: string): void {
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, `${toLine}\n${message}\n`, "utf-8");
}

// The output is fully deterministic: same two parts in, same bytes out,
// no randomness, no network, no clock. Running this twice writes the
// exact same file, which is what a judged text entry needs.
function describe(toLine: string, message: string): string {
  return `two-part confession, To: ${toLine.slice(4)} + ${message.length} chars`;
}

checkTwoParts(TO_LINE, MESSAGE);
saveEntry(TO_LINE, MESSAGE);
console.log(`${describe(TO_LINE, MESSAGE)} — wrote to ${OUT_FILE}`);
