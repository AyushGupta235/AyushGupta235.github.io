// SVG builder for the iteration chart (underscore prefix: not a route).
// Stroke-style per the site system: hairline solid grid, signal red as the only
// data ink, mono labels in text tokens. All measured values are direct-labeled;
// ordinal (unmeasured) points carry names, never numbers.

export type IterationsViz = {
  baseline: number;
  final: number;
  ci: [number, number];
  gate: number;
  plateau_n: number;
  plateau_note: string;
  fixes: string[];
  caption: string;
};

export function iterationsSvg(v: IterationsViz): string {
  const W = 680, H = 302;
  const m = { l: 42, r: 108, t: 30, b: 52 };
  const pw = W - m.l - m.r, ph = H - m.t - m.b;
  const y = (val: number) => m.t + (1 - val) * ph;
  const n = 1 + v.plateau_n + v.fixes.length + 1;
  const x = (i: number) => m.l + (i * pw) / (n - 1);

  // ordinal y-positions for the fix points: evenly interpolated, no value claims
  const fixY = v.fixes.map((_, j) => v.baseline + ((v.final - v.baseline) * (j + 1)) / (v.fixes.length + 1));

  const pts: [number, number][] = [];
  for (let i = 0; i <= v.plateau_n; i++) pts.push([x(i), y(v.baseline)]);
  v.fixes.forEach((_, j) => pts.push([x(1 + v.plateau_n + j), y(fixY[j])]));
  pts.push([x(n - 1), y(v.final)]);

  const grid = [0.25, 0.5, 0.75, 1.0]
    .map(
      (g) => `<line x1="${m.l}" y1="${y(g)}" x2="${W - m.r}" y2="${y(g)}" stroke="var(--rule-soft)" stroke-width="1"/>
      <text x="${m.l - 8}" y="${y(g) + 3.5}" text-anchor="end" font-size="10" fill="var(--muted)">${g.toFixed(2)}</text>`
    )
    .join("");

  const plateauDots = pts
    .slice(0, v.plateau_n + 1)
    .map(([px, py]) => `<circle cx="${px}" cy="${py}" r="4" fill="var(--bg)" stroke="var(--signal)" stroke-width="1.5"/>`)
    .join("");

  // the rejected attempt: an off-line ✕ below the plateau (config was reverted)
  const hx = x(Math.floor(v.plateau_n / 2)), hy = y(v.baseline) + 20;
  const hurt = `<path d="M${hx - 4} ${hy - 4} l8 8 M${hx + 4} ${hy - 4} l-8 8" stroke="var(--muted)" stroke-width="1.5" fill="none"/>`;

  // annotations sit above-left of their dots — the upper-left region is empty,
  // so they never cross the rising line, the gate label, or the CI column
  const fixMarks = v.fixes
    .map((name, j) => {
      const px = x(1 + v.plateau_n + j), py = y(fixY[j]);
      return `<circle cx="${px}" cy="${py}" r="4.5" fill="var(--signal)" stroke="var(--bg)" stroke-width="2"/>
      <text x="${px - 10}" y="${py - 9}" text-anchor="end" font-size="10.5" fill="var(--ink-soft)">${name}</text>`;
    })
    .join("");

  const fx = x(n - 1);
  const ciTop = y(v.ci[1]), ciBot = y(v.ci[0]);
  const final = `
    <line x1="${fx}" y1="${ciTop}" x2="${fx}" y2="${ciBot}" stroke="var(--signal)" stroke-width="1.5"/>
    <line x1="${fx - 4}" y1="${ciTop}" x2="${fx + 4}" y2="${ciTop}" stroke="var(--signal)" stroke-width="1.5"/>
    <line x1="${fx - 4}" y1="${ciBot}" x2="${fx + 4}" y2="${ciBot}" stroke="var(--signal)" stroke-width="1.5"/>
    <circle cx="${fx}" cy="${y(v.final)}" r="5.5" fill="var(--signal)" stroke="var(--bg)" stroke-width="2"/>
    <text x="${fx + 12}" y="${y(v.final) + 1}" font-size="13" font-weight="700" fill="var(--ink)">${v.final}</text>
    <text x="${fx + 12}" y="${y(v.final) + 15}" font-size="9.5" fill="var(--muted)">[${v.ci[0]}, ${v.ci[1]}]</text>`;

  const plateauMidX = (x(0) + x(v.plateau_n)) / 2;

  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Answer-match across iterations: ${v.plateau_n} prompt-only iterations flat at ${v.baseline}, then ${v.fixes.join(", ")} rise to ${v.final}, above the ${v.gate} ship gate.">
    ${grid}
    <line x1="${m.l}" y1="${y(0)}" x2="${W - m.r}" y2="${y(0)}" stroke="var(--rule)" stroke-width="1"/>
    <line x1="${m.l}" y1="${y(v.gate)}" x2="${W - m.r}" y2="${y(v.gate)}" stroke="var(--signal)" stroke-width="1" stroke-dasharray="5 4" opacity="0.75"/>
    <text x="${m.l + 4}" y="${y(v.gate) - 6}" font-size="10.5" fill="var(--signal)">ship gate ${v.gate.toFixed(2)}</text>
    <polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="var(--signal)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    ${plateauDots}${hurt}${fixMarks}${final}
    <text x="${x(0)}" y="${y(v.baseline) + 24}" text-anchor="start" font-size="11" font-weight="700" fill="var(--ink)">${v.baseline}</text>
    <text x="${plateauMidX}" y="${H - 14}" text-anchor="middle" font-size="10" fill="var(--muted)">${v.plateau_note}</text>
    <text x="${W - m.r}" y="${H - 14}" text-anchor="end" font-size="10" fill="var(--muted)">iterations →</text>
  </svg>`;
}
