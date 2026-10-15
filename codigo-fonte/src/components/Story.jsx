import { useEffect, useRef, useState } from "react";
import useInView, { useScrollThrough } from "../hooks/useInView.js";
import useReducedMotion from "../hooks/useReducedMotion.js";
import useSectionProgress from "../hooks/useSectionProgress.js";
import VerticalMark from "../brand/Verticals.jsx";
import { Symbol } from "../brand/Brand.jsx";

/*
  Seções com movimento ao longo das páginas internas. Cada uma explica algo com o próprio movimento:
  EscrowFlow    → o caminho do dinheiro numa conta escrow (depósito, verificação, liberação)
  VTimeline     → linha vertical que acompanha a leitura das etapas
  Gantt         → implantação como cronograma: as frentes se sobrepõem até o lançamento
  ReformaChart  → transição da reforma tributária desenhada com a rolagem
  StackSteps    → etapas empilhadas como um dossiê que vai sendo montado
*/

/* ============================== conta escrow ============================== */
const ESCROW_STEPS = [
  ["Depósito", "Os recursos são depositados na conta vinculada à operação."],
  ["Verificação", "As condições previstas em contrato são acompanhadas, como entregas, prazos ou documentos."],
  ["Liberação", "Cumpridas as condições, os valores são liberados à parte indicada no contrato."],
];
const CONDS = ["Entrega", "Prazo", "Documentos"];

export function EscrowFlow() {
  const box = useRef(null);
  const inView = useInView(box);
  const reduce = useReducedMotion();
  const [ph, setPh] = useState(reduce ? 3 : 0); // 0 início · 1 depósito · 2 verificação · 3 liberação
  const [ok, setOk] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const ts = [];
    const run = () => {
      setPh(0);
      setOk(0);
      ts.push(setTimeout(() => setPh(1), 700));
      ts.push(setTimeout(() => setPh(2), 2600));
      ts.push(setTimeout(() => setOk(1), 3300));
      ts.push(setTimeout(() => setOk(2), 4000));
      ts.push(setTimeout(() => setOk(3), 4700));
      ts.push(setTimeout(() => setPh(3), 5500));
      ts.push(setTimeout(run, 9200));
    };
    run();
    return () => ts.forEach(clearTimeout);
  }, [inView, reduce]);

  const tokenX = ph === 0 ? 60 : ph < 3 ? 260 : 460;
  const locked = ph === 1 || ph === 2;
  return (
    <div className="escrow-flow" ref={box}>
      <svg viewBox="0 0 520 236" className="ef-svg" role="img" aria-label="Ilustração: os recursos saem do comprador, ficam na conta escrow enquanto entrega, prazo e documentos são verificados, e são liberados ao vendedor.">
        <line x1="60" x2="460" y1="86" y2="86" className="ef-rail" />
        <rect x="60" y="85" width="400" height="2" className="ef-rail-on" style={{ transform: `scaleX(${(tokenX - 60) / 400})`, transition: reduce ? "none" : "transform 1.4s cubic-bezier(.6,0,.2,1)" }} />
        {[["Comprador", 60], ["Conta escrow", 260], ["Vendedor", 460]].map(([t, x], n) => (
          <g key={t}>
            <circle cx={x} cy="86" r={n === 1 ? 38 : 24} className={`ef-node${n === 1 ? " mid" : ""}${n === 2 && ph === 3 ? " got" : ""}`} />
            <text x={x} y={n === 1 ? 146 : 134} textAnchor="middle" className="ef-lbl">{t}</text>
          </g>
        ))}
        {/* cadeado */}
        <g transform="translate(260 26)" className={`ef-lock${locked ? " on" : ""}`}>
          <rect x="-11" y="-4" width="22" height="17" rx="3" />
          <path d={locked ? "M-7 -4 v-6 a7 7 0 0 1 14 0 v6" : "M-7 -4 v-6 a7 7 0 0 1 14 0 v-2"} fill="none" />
        </g>
        {/* condições */}
        {CONDS.map((c, n) => (
          <g key={c} transform={`translate(${132 + n * 128} 196)`} className={`ef-cond${ph >= 2 || ph === 3 ? " show" : ""}${ok > n ? " ok" : ""}`}>
            <rect x="-60" y="-17" width="120" height="34" rx="17" />
            <path d="M-46 0 l4 4 l8 -8" fill="none" />
            <text x="-28" y="5">{c}</text>
          </g>
        ))}
        {/* recursos */}
        <g style={{ transform: `translateX(${tokenX}px)`, transition: reduce ? "none" : "transform 1.4s cubic-bezier(.6,0,.2,1)" }}>
          <circle cx="0" cy="86" r="15" className="ef-token" />
          <text x="0" y="90" textAnchor="middle" className="ef-tk">R$</text>
        </g>
      </svg>
      <ol className="ef-steps">
        {ESCROW_STEPS.map(([t, d], n) => (
          <li key={t} className={ph === n + 1 ? "on" : ph > n + 1 ? "done" : ""}>
            <b>{t}</b>
            <span>{d}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ============================== linha vertical de etapas ============================== */
export function VTimeline({ id, eyebrow, b, l, lede, steps, tone = "light" }) {
  const list = useRef(null);
  const p = useScrollThrough(list, { start: 0.62, end: 0.5 });
  const reduce = useReducedMotion();
  const k = reduce ? 1 : p;
  const cur = Math.min(steps.length - 1, Math.floor(k * steps.length * 0.999));
  return (
    <section className={`sec vt ${tone}`} id={id} aria-labelledby={`${id}-t`}>
      <div className="wrap vt-grid">
        <div className="vt-head">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-t`} className="h2"><span className="w-b">{b}</span> <span className="w-l">{l}</span></h2>
          {lede && <p className="lede">{lede}</p>}
          <p className="vt-now" aria-hidden="true">
            <b>{String(cur + 1).padStart(2, "0")}</b>
            <span>de {String(steps.length).padStart(2, "0")}</span>
            <em>{steps[cur][0]}</em>
          </p>
        </div>
        <ol className="vt-list" ref={list} style={{ "--k": k }}>
          {steps.map(([t, d], i) => (
            <li key={t} className={i <= cur ? "on" : ""}>
              <span className="vt-dot" aria-hidden="true" />
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================== cronograma de implantação ============================== */
export function Gantt({ id, eyebrow, b, l, lede, rows, note }) {
  const reduce = useReducedMotion();
  const [ref, prog] = useSectionProgress();
  const [p, setP] = useState(reduce ? 1 : 0);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const tick = () => {
      setP((o) => (Math.abs(o - prog.current) > 0.001 ? prog.current : o));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, prog]);
  const x = Math.min(1, p * 1.18); // cursor do cronograma
  return (
    <section className={`gantt dark${reduce ? " still" : ""}`} id={id} ref={ref} aria-labelledby={`${id}-t`}>
      <div className="gantt-pin">
        <div className="wrap">
          <div className="gantt-head">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2 id={`${id}-t`} className="h2"><span className="w-b">{b}</span> <span className="w-l">{l}</span></h2>
            </div>
            {lede && <p className="lede">{lede}</p>}
          </div>
          <div className="gantt-chart">
            <div className="gantt-axis" aria-hidden="true">
              <span>Início do projeto</span>
              <span>Lançamento</span>
            </div>
            <ol className="gantt-rows">
              {rows.map((r) => {
                const fill = Math.min(1, Math.max(0, (x - r.a) / (r.b - r.a)));
                const live = x >= r.a && x < r.b + 0.02;
                return (
                  <li key={r.t} className={`${live ? "live" : ""}${fill >= 1 ? " done" : ""}`}>
                    <div className="g-lbl">
                      <h3>{r.t}</h3>
                      <p>{r.d}</p>
                    </div>
                    <div className="g-track" aria-hidden="true">
                      <span className="g-slot" style={{ left: `${r.a * 100}%`, width: `${(r.b - r.a) * 100}%` }}>
                        <i style={{ transform: `scaleX(${fill})` }} />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
            <span className="g-cursor" aria-hidden="true" style={{ left: `calc(var(--gl) + (100% - var(--gl)) * ${x})` }} />
          </div>
          {note && <p className="fine gantt-note">{note}</p>}
        </div>
      </div>
    </section>
  );
}

/* ============================== reforma tributária ============================== */
// Esquema simplificado (sem escala), na ordem da EC 132/2023:
// 2026 fase de teste · 2027 CBS substitui PIS e Cofins · 2029–2032 redução gradual de ICMS e ISS · 2033 IBS completo.
const YEARS = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];
const OLD = [1, 0.6, 0.6, 0.54, 0.48, 0.42, 0.36, 0];
const MILESTONES = [
  ["2026", "Fase de teste", "CBS e IBS começam com alíquotas de teste, convivendo com os tributos atuais."],
  ["2027", "CBS no lugar de PIS e Cofins", "A contribuição federal passa a valer e PIS e Cofins deixam de existir."],
  ["2029–2032", "Transição de ICMS e ISS", "Os tributos de estados e municípios diminuem aos poucos, enquanto o IBS cresce."],
  ["2033", "Novo modelo completo", "ICMS e ISS deixam de existir. Ficam CBS e IBS."],
];

export function ReformaChart() {
  const box = useRef(null);
  const reduce = useReducedMotion();
  const p = useScrollThrough(box, { start: 0.9, end: 0.55 });
  const k = reduce ? 1 : Math.min(1, p * 1.1);
  const W = 960;
  const H = 300;
  const N = YEARS.length;
  const X = (i) => 20 + (i * (W - 40)) / N; // cada ano ocupa uma coluna
  const Y = (v) => 24 + (1.06 - v) * ((H - 74) / 1.06);
  // contorno em degraus: em cada coluna (ano) o valor é um patamar
  const pts = (vals) => vals.flatMap((v, i) => [[X(i), Y(v)], [X(i + 1), Y(v)]]);
  const line = (vals) => pts(vals).map(([x, y], j) => `${j ? "L" : "M"}${x} ${y}`).join(" ");
  const TOP = OLD.map((v, i) => (i === 0 ? 1.06 : 1)); // CBS e IBS ocupam o espaço que os tributos atuais deixam
  const area = (vals) => `${line(vals)} L${X(N)} ${Y(0)} L${X(0)} ${Y(0)} Z`;
  const band = (lo, hi) => `${line(hi)} ${pts(lo).reverse().map(([x, y]) => `L${x} ${y}`).join(" ")} Z`;
  const ms = Math.min(MILESTONES.length - 1, Math.floor(k * MILESTONES.length * 0.999));
  return (
    <figure className="reforma" ref={box} style={{ "--k": k }}>
      <div className="rf-legend" aria-hidden="true">
        <span className="old">PIS, Cofins, ICMS e ISS</span>
        <span className="new">CBS e IBS</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Esquema da transição: os tributos atuais diminuem de 2027 a 2033 enquanto CBS e IBS ocupam o lugar deles.">
        <defs>
          <clipPath id="rf-clip">
            <rect x="0" y="0" height={H} width={W * k} />
          </clipPath>
        </defs>
        {YEARS.map((y, i) => (
          <g key={y}>
            <line x1={X(i)} x2={X(i)} y1="16" y2={Y(0)} className="rf-grid" />
            <text x={(X(i) + X(i + 1)) / 2} y={H - 18} textAnchor="middle" className={`rf-year${(i + 0.5) / N <= k ? " on" : ""}`}>{y}</text>
          </g>
        ))}
        <g clipPath="url(#rf-clip)">
          <path d={band(OLD, TOP)} className="rf-new" />
          <path d={area(OLD)} className="rf-old" />
          <path d={line(OLD)} className="rf-line old" />
          <path d={line(TOP)} className="rf-line new" />
        </g>
        <line x1={X(0)} x2={X(N)} y1={Y(0)} y2={Y(0)} className="rf-base" />
      </svg>
      <ol className="rf-ms">
        {MILESTONES.map(([y, t, d], i) => (
          <li key={y} className={i <= ms ? "on" : ""}>
            <b>{y}</b>
            <strong>{t}</strong>
            <span>{d}</span>
          </li>
        ))}
      </ol>
      <figcaption className="fine">Esquema simplificado e sem escala: mostra a ordem da transição, não alíquotas.</figcaption>
    </figure>
  );
}

/* ============================== etapas como dossiê ============================== */
// A seção fica presa na tela; a rolagem abre uma etapa por vez. As anteriores ficam marcadas e resumidas ao título.
export function StackSteps({ id, eyebrow, b, l, lede, steps }) {
  const reduce = useReducedMotion();
  const [ref, prog] = useSectionProgress();
  const [p, setP] = useState(0);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const tick = () => {
      setP((o) => (Math.abs(o - prog.current) > 0.001 ? prog.current : o));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, prog]);
  const n = steps.length;
  const cur = reduce ? -1 : Math.min(n - 1, Math.floor(p * n * 0.999));
  return (
    <section className={`ststeps dark${reduce ? " still" : ""}`} id={id} ref={ref} aria-labelledby={`${id}-t`} style={{ "--n": n }}>
      <div className="ststeps-pin">
        <div className="wrap stack-grid">
          <div className="stack-head">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-t`} className="h2"><span className="w-b">{b}</span> <span className="w-l">{l}</span></h2>
            {lede && <p className="lede">{lede}</p>}
            {!reduce && (
              <p className="stack-now" aria-hidden="true">
                <b key={cur}>{String(cur + 1).padStart(2, "0")}</b>
                <span>de {String(n).padStart(2, "0")}</span>
              </p>
            )}
          </div>
          <ol className="stack-list" style={{ "--k": reduce ? 1 : Math.min(1, p * 1.0) }}>
            {steps.map(([t, d], i) => (
              <li key={t} className={cur === -1 || i === cur ? "is-open" : i < cur ? "is-done" : "is-next"}>
                <article className="stack-card">
                  <span className="stack-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{t}</h3>
                  <div className="stack-body"><p>{d}</p></div>
                  <svg className="stack-ok" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10.5l3.2 3.2L15 7" /></svg>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ============================== três experiências na mesma mesa ============================== */
// Bancária (PAY), tributária (TAX) e tecnológica (TECH) começam afastadas e se encontram com a rolagem.
// No ponto em que os três círculos se cruzam acende o símbolo OG.
const MESA = [
  { v: "pay", t: "Bancária", s: "Relacionamento, crédito e carteiras", c: [260, 172], dir: [0, -1] },
  { v: "tax", t: "Tributária", s: "Diagnóstico e planejamento", c: [184, 304], dir: [-0.87, 0.5] },
  { v: "tech", t: "Tecnológica", s: "Plataformas e APIs", c: [336, 304], dir: [0.87, 0.5] },
];

export function Convergence() {
  const box = useRef(null);
  const reduce = useReducedMotion();
  const p = useScrollThrough(box, { start: 0.95, end: 0.55 });
  const k0 = reduce ? 1 : Math.min(1, p * 1.15);
  const k = k0 * k0 * (3 - 2 * k0);
  const meet = Math.max(0, (k - 0.82) / 0.18);
  const R = 118;
  return (
    <figure className="mesa" ref={box} aria-label="Ilustração: as experiências bancária, tributária e tecnológica se encontram; na interseção dos três círculos está a ORYGEN.">
      <svg viewBox="0 0 520 500" aria-hidden="true">
        <defs>
          <radialGradient id="mesa-glow">
            <stop offset="0" stopColor="#b9c6ff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#2f5bff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="260" cy="258" r={170 * meet} fill="url(#mesa-glow)" opacity={0.6 * meet} />
        {MESA.map((m) => {
          const d = (1 - k) * 120;
          const x = m.c[0] + m.dir[0] * d;
          const y = m.c[1] + m.dir[1] * d;
          return (
            <g key={m.v}>
              <circle cx={x} cy={y} r={R} className="mesa-c" style={{ fillOpacity: 0.035 + 0.03 * meet }} />
              <circle cx={x} cy={y} r={R} className="mesa-c-line" strokeDasharray={`${(0.2 + 0.8 * k) * 742} 742`} transform={`rotate(-90 ${x} ${y})`} />
            </g>
          );
        })}
        <circle cx="260" cy="258" r="40" className="mesa-core" style={{ opacity: meet }} />
      </svg>
      <span className="mesa-og" style={{ opacity: meet, transform: `translate(-50%, -50%) scale(${0.85 + 0.15 * meet})` }}>
        <Symbol className="mesa-sym" aria-hidden="true" />
      </span>
      <ul className="mesa-labels">
        {MESA.map((m, i) => (
          <li key={m.v} className={`ml-${m.v}`} style={{ opacity: 0.25 + 0.75 * Math.min(1, k * 1.4), "--i": i }}>
            <VerticalMark v={m.v} />
            <span><b>{m.t}</b><small>{m.s}</small></span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/* número que conta até o valor quando aparece na tela */
export function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  const done = useRef(false);
  useEffect(() => {
    if (reduce || !inView || done.current) return;
    done.current = true;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);
  return <b ref={ref} aria-label={`${to}${suffix}`}>{n}{suffix}</b>;
}
