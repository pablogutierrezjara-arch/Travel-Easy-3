export function daysBetween(start: string, end: string) {
  const a = new Date(start);
  const b = new Date(end);
  return Math.max(1, Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)));
}

export function randomId() {
  return Math.random().toString(36).slice(2, 10);
}
