import { mkdirSync, writeFileSync } from "node:fs";

// Freshly written in this session for u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c.
// One sentence that could have replaced an entire pointless meeting:
// nobody in the room can approve anything, so the meeting is just an
// hour of people who can't decide anything agreeing to meet again.
const ENTRY =
  "No one in this room can say yes, so this meeting is just an hour of people who can't decide anything agreeing to meet again.";

// Entry-length gate for the one-line competition (see kit rules):
// a single line must be non-empty and at most 200 characters.
const MIN_ENTRY_LENGTH = 1;
const MAX_ENTRY_LENGTH = 200;

// A one-line entry is a single sentence, so it ends with a full stop.
const SENTENCE_TERMINATOR = ".";

function validateEntry(entry: string): void {
  if (entry.length < MIN_ENTRY_LENGTH || entry.length > MAX_ENTRY_LENGTH) {
    throw new Error(
      `entry length ${entry.length} outside gate ${MIN_ENTRY_LENGTH}-${MAX_ENTRY_LENGTH}`,
    );
  }
  if (entry.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (!entry.endsWith(SENTENCE_TERMINATOR)) {
    throw new Error("entry must be a single sentence");
  }
}

validateEntry(ENTRY);

// Design note: the entry is a fixed literal, not generated text — the
// program's only job is to gate it against the kit rules and write it
// byte-for-byte to the output file, so the file content is the submission.
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${OUTPUT_FILE}`);
