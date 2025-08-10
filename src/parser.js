// Very simple parser that extracts tasks by lane
// It supports two formats:
// 1) Headed sections: ### YYYY-MM-DD HH:MM AEST – Lane C
//    Followed by lines beginning with '- TASK:'
// 2) Inline tagged tasks: [TASK][Lane B] Do the thing

const HEADING = /^###\s+(.+?)\s+\u2013\s+Lane\s+([A-Z])/i;
const TASK_LINE = /^-\s*TASK:\s*(.+)$/i;
const INLINE = /^\[TASK\]\[Lane\s+([A-Z])\]\s*(.+)$/i;

export function extractTasksFromDoc(docText) {
  const lines = docText.split(/\r?\n/);
  let currentLane = null;
  const tasks = [];
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    const h = ln.match(HEADING);
    if (h) {
      currentLane = h[2].toUpperCase();
      continue;
    }
    const t = ln.match(TASK_LINE);
    if (t && currentLane) {
      tasks.push({ lane: currentLane, text: t[1].trim() });
      continue;
    }
    const inl = ln.match(INLINE);
    if (inl) {
      tasks.push({ lane: inl[1].toUpperCase(), text: inl[2].trim() });
    }
  }
  return tasks;
}
