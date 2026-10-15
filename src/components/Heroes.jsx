import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useInView from "../hooks/useInView.js";
import useReducedMotion from "../hooks/useReducedMotion.js";

/*
  Visuais dos topos das páginas internas. Cada página tem a sua metáfora:
  ORYGEN PAY      → fluxo: recebimentos de vários meios chegando à conta da empresa
  White Label     → planta e marca: a mesma estrutura recebe identidades diferentes
  Tributário      → visão 360°: as frentes tributárias em volta da empresa
  Regularização   → do emaranhado ao plano: débitos dispersos organizados por esfera
  Recuperação     → cinco anos em revisão: mês a mês, pagamentos a maior identificados
  Todos com dados fictícios ou sem valores, e estáticos com movimento reduzido.
*/

const brl = (v) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ============================== ORYGEN PAY — fluxo ============================== */
const SOURCES = [
  { k: "Pix", ico: "M7 2 2 7l5 5 5-5zM2 7h10", events: [["Pix recebido", "Cliente 0418", 1240], ["Pix recebido", "Cliente 0977", 386.5], ["Pix recebido", "Cliente 1203", 2900]] },
  { k: "Boletos", events: [["Boleto liquidado", "Pedido 2231", 3860], ["Boleto liquidado", "Contrato 118", 9420]] },
  { k: "Cartões", events: [["Recebível de cartão", "Vendas do dia", 7412.3], ["Recebível de cartão", "Lote 0412", 5187.9]] },
  { k: "TED", events: [["TED recebida", "Distribuidor B", 12000], ["TED recebida", "Cliente C", 4350]] },
];
const VW = 640;
const VH = 520;
const PX = 300; // borda esquerda do painel no desenho
const portY = (i) => 236 + (i - 1.5) * 30;
const srcY = (i) => 70 + i * 126;
const pathD = (i) => `M 0 ${srcY(i)} C 150 ${srcY(i)}, 150 ${portY(i)}, ${PX} ${portY(i)}`;

export function FlowVisual() {
  const box = useRef(null);
  const svg = useRef(null);
  const paths = useRef([]);
  const dots = useRef([]);
  const big = useRef(null);
  const inView = useInView(box);
  const reduce = useReducedMotion();
  const [bal, setBal] = useState(248390.12);
  const [rows, setRows] = useState([
    ["Boleto liquidado", "Pedido 2187", 2140, "Boletos"],
    ["Pix recebido", "Cliente 0233", 860, "Pix"],
    ["Recebível de cartão", "Lote 0411", 4902.4, "Cartões"],
  ]);
  const [pulse, setPulse] = useState(0);
  const [hit, setHit] = useState(-1);

  useEffect(() => {
    if (reduce || !inView) return;
    const lens = paths.current.map((p) => p.getTotalLength());
    // partículas de fundo: 7 por trilho, velocidades levemente diferentes
    const parts = [];
    SOURCES.forEach((_, i) => {
      for (let k = 0; k < 7; k++) parts.push({ i, t: k / 7 + Math.random() * 0.05, v: 0.11 + Math.random() * 0.05 });
    });
    let ev = null;
    let nextEv = performance.now() + 900;
    let seq = 0;
    let last = performance.now();
    let raf = 0;
    const place = (el, i, t) => {
      const pt = paths.current[i].getPointAtLength(Math.min(1, Math.max(0, t)) * lens[i]);
      el.setAttribute("cx", pt.x.toFixed(1));
      el.setAttribute("cy", pt.y.toFixed(1));
    };
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      parts.forEach((p, n) => {
        p.t += p.v * dt;
        if (p.t > 1) p.t -= 1;
        const el = dots.current[n];
        if (!el) return;
        place(el, p.i, p.t);
        el.setAttribute("opacity", (0.25 + 0.55 * Math.sin(Math.PI * p.t)).toFixed(2));
      });
      if (!ev && now > nextEv) {
        const i = seq % SOURCES.length === 0 ? 0 : Math.floor(Math.random() * SOURCES.length);
        const list = SOURCES[i].events;
        ev = { i, t: 0, e: list[seq % list.length] };
        seq++;
        setHit(i);
      }
      if (ev) {
        ev.t += dt / 1.25;
        const g = big.current;
        if (g) {
          place(g, ev.i, ev.t * ev.t * (3 - 2 * ev.t));
          g.setAttribute("opacity", "1");
        }
        if (ev.t >= 1) {
          const [a, b, v] = ev.e;
          const src = SOURCES[ev.i].k;
          setBal((x) => x + v);
          setRows((r) => [[a, b, v, src], ...r].slice(0, 3));
          setPulse((x) => x + 1);
          if (g) g.setAttribute("opacity", "0");
          ev = null;
          setHit(-1);
          nextEv = now + 1500 + Math.random() * 900;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <figure className="flow" ref={box} aria-label="Ilustração: recebimentos por Pix, boletos, cartões e TED chegando à conta da empresa. Dados fictícios.">
      <svg ref={svg} className="flow-svg" viewBox={`0 0 ${VW} ${VH}`} aria-hidden="true">
        <defs>
          <linearGradient id="flow-rail" x1="0" x2="1">
            <stop offset="0" stopColor="#b9c6ff" stopOpacity="0.05" />
            <stop offset="1" stopColor="#b9c6ff" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="flow-glow">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.35" stopColor="#b9c6ff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#2f5bff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {SOURCES.map((s, i) => (
          <g key={s.k} className={hit === i ? "rail on" : "rail"}>
            <path ref={(el) => (paths.current[i] = el)} d={pathD(i)} fill="none" stroke="url(#flow-rail)" strokeWidth="1.2" />
            <circle cx="0" cy={srcY(i)} r="3" fill="#b9c6ff" />
            <text x="12" y={srcY(i) - 12}>{s.k}</text>
          </g>
        ))}
        {SOURCES.flatMap((_, i) => new Array(7).fill(0).map((__, k) => (
          <circle key={`${i}-${k}`} ref={(el) => (dots.current[i * 7 + k] = el)} r="1.8" fill="#dfe6ff" cx={reduce ? 60 + k * 32 : -10} cy={reduce ? srcY(i) + (portY(i) - srcY(i)) * (k / 7) : -10} opacity="0.5" />
        )))}
        <circle ref={big} r="14" fill="url(#flow-glow)" cx="-30" cy="-30" opacity="0" />
      </svg>

      <ul className="flow-chips" aria-hidden="true">
        {SOURCES.map((s, i) => <li key={s.k} className={hit === i ? "on" : ""}>{s.k}</li>)}
      </ul>
      <div className={`flow-acct${pulse ? " got" : ""}`} key={pulse} aria-hidden="true">
        <div className="flow-top">
          <i>EE</i>
          <span><b>Empresa Exemplo Ltda</b><small>Conta PJ</small></span>
        </div>
        <small className="flow-k">Saldo disponível</small>
        <b className="flow-bal">R$ {brl(bal)}</b>
        <ul className="flow-rows">
          {rows.map(([a, b, v, k], n) => (
            <li key={`${a}${b}${n}${pulse}`} className={n === 0 && pulse ? "new" : ""}>
              <span><b>{a}</b><small>{b} · {k}</small></span>
              <em>+ R$ {brl(v)}</em>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="vis-cap">Ilustração com dados fictícios</figcaption>
    </figure>
  );
}

/* ============================== White Label — planta e marca ============================== */
const WL_BRANDS = [
  { name: "Fluxo", c: "#2f5bff", ink: "#ffffff", font: 600, track: "-0.02em", up: false, shape: "50%", bal: "R$ 18.940,50" },
  { name: "Lúmen", c: "#0c2065", ink: "#ffffff", font: 500, track: "0.16em", up: true, shape: "3px", bal: "R$ 7.312,08" },
  { name: "Aurora", c: "#5b5fc7", ink: "#ffffff", font: 400, track: "0.01em", up: false, shape: "50% 50% 4px 50%", bal: "R$ 41.205,77" },
];

export function BrandPaint() {
  const box = useRef(null);
  const inView = useInView(box);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [painted, setPainted] = useState(true);

  useEffect(() => {
    if (reduce || !inView) return;
    let t1 = 0;
    let t2 = 0;
    const loop = () => {
      // marca visível por um tempo → volta à planta → troca de marca → pinta de novo
      t1 = setTimeout(() => {
        setPainted(false);
        t2 = setTimeout(() => {
          setI((x) => (x + 1) % WL_BRANDS.length);
          setPainted(true);
          loop();
        }, 1500);
      }, 3200);
    };
    loop();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, reduce]);

  const b = WL_BRANDS[i];
  return (
    <figure className={`bp${painted ? " painted" : ""}`} ref={box} style={{ "--bc": b.c, "--bi": b.ink }} aria-label="Ilustração: a planta do aplicativo, feita pela tecnologia ORYGEN, recebe identidades de marcas fictícias.">
      <div className="bp-call bp-left" aria-hidden="true">
        <b>Tecnologia ORYGEN</b>
        <span>Componentes, APIs e segurança. A operação financeira é executada pela instituição liquidante contratada pela sua empresa.</span>
      </div>
      <div className="bp-phone" aria-hidden="true">
        <div className="bp-screen">
          {/* planta (wireframe) */}
          <svg className="bp-plan" viewBox="0 0 260 470" preserveAspectRatio="none">
            <g fill="none" stroke="#b9c6ff" strokeWidth="1" strokeDasharray="4 4" opacity="0.7">
              <rect x="18" y="22" width="120" height="22" rx="4" />
              <rect x="18" y="66" width="224" height="104" rx="10" />
              <rect x="18" y="186" width="50" height="50" rx="10" />
              <rect x="76" y="186" width="50" height="50" rx="10" />
              <rect x="134" y="186" width="50" height="50" rx="10" />
              <rect x="192" y="186" width="50" height="50" rx="10" />
              <rect x="18" y="260" width="224" height="40" rx="6" />
              <rect x="18" y="308" width="224" height="40" rx="6" />
              <rect x="18" y="356" width="224" height="40" rx="6" />
            </g>
            <g fill="#b9c6ff" fontSize="9" fontFamily="Montserrat, sans-serif" opacity="0.85">
              <text x="26" y="37">marca</text>
              <text x="30" y="90">saldo</text>
              <text x="27" y="214">pix</text>
              <text x="81" y="214">boleto</text>
              <text x="139" y="214">cobrar</text>
              <text x="197" y="214">cartão</text>
              <text x="28" y="284">movimentação</text>
              <text x="28" y="332">movimentação</text>
              <text x="28" y="380">movimentação</text>
            </g>
          </svg>
          {/* camada da marca */}
          <div className="bp-brand">
            <div className="bp-bar">
              <b style={{ fontWeight: b.font, letterSpacing: b.track, textTransform: b.up ? "uppercase" : "none" }}>
                <i style={{ borderRadius: b.shape }} />
                {b.name}
              </b>
            </div>
            <div className="bp-card">
              <small>Saldo disponível</small>
              <b>{b.bal}</b>
            </div>
            <div className="bp-acts"><span>Pix</span><span>Boleto</span><span>Cobrar</span><span>Cartão</span></div>
            <ul className="bp-list">
              <li><span>Pix recebido</span><b>+ R$ 860,00</b></li>
              <li><span>Boleto pago</span><b>− R$ 1.240,00</b></li>
              <li><span>Cobrança</span><b>Paga</b></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bp-call bp-right" aria-hidden="true">
        <b>Sua marca</b>
        <span>Nome, cores e jornada do seu cliente.</span>
        <em className="bp-name">{b.name}</em>
        <span className="vis-cap">Marcas fictícias, criadas para esta demonstração.</span>
      </div>
      <figcaption className="bp-note">
        <span>A ORYGEN fornece a tecnologia. A operação financeira é executada pela instituição liquidante contratada pela sua empresa.</span>
        <span className="vis-cap">Marcas fictícias, criadas para esta demonstração.</span>
      </figcaption>
    </figure>
  );
}

/* ============================== Tributário — visão 360° ============================== */
export const RADAR = [
  { k: "Diagnóstico", l: ["Diagnóstico"], d: "Enquadramento, apurações, obrigações acessórias e riscos.", section: "areas" },
  { k: "Planejamento", l: ["Planejamento"], d: "Alternativas lícitas de organização das operações e do regime.", section: "areas" },
  { k: "Regularização", l: ["Regularização"], d: "Passivo tributário e alternativas previstas em lei.", to: "/tributario/regularizacao" },
  { k: "Recuperação de créditos", l: ["Recuperação", "de créditos"], d: "Valores pagos indevidamente ou a maior nos últimos cinco anos.", to: "/tributario/recuperacao-de-creditos" },
  { k: "Patrimônio", l: ["Patrimônio"], d: "Organização societária, holdings e sucessão.", section: "areas" },
  { k: "Acompanhamento", l: ["Acompanha-", "mento"], d: "Orientação contínua sobre legislação e obrigações.", section: "areas" },
];
const C = 260;
const R0 = 74;
const R1 = 236;
const polar = (r, a) => [C + r * Math.cos(a), C + r * Math.sin(a)];
const sectorPath = (n) => {
  const a0 = -Math.PI / 2 + (n * Math.PI) / 3 + 0.012;
  const a1 = a0 + Math.PI / 3 - 0.024;
  const [x0, y0] = polar(R1, a0);
  const [x1, y1] = polar(R1, a1);
  const [x2, y2] = polar(R0, a1);
  const [x3, y3] = polar(R0, a0);
  return `M${x0} ${y0} A${R1} ${R1} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${R0} ${R0} 0 0 0 ${x3} ${y3}Z`;
};

export function Radar360() {
  const box = useRef(null);
  const sweep = useRef(null);
  const inView = useInView(box);
  const reduce = useReducedMotion();
  const [act, setAct] = useState(0);
  const [hold, setHold] = useState(-1);
  const angle = useRef(0);

  useEffect(() => {
    if (reduce || !inView || hold >= 0) return;
    let last = performance.now();
    let raf = 0;
    let cur = -1;
    const tick = (now) => {
      angle.current = (angle.current + ((now - last) / 1000) * 30) % 360; // 12 s por volta
      last = now;
      if (sweep.current) sweep.current.setAttribute("transform", `rotate(${angle.current.toFixed(2)} ${C} ${C})`);
      const n = Math.floor(angle.current / 60) % 6;
      if (n !== cur) {
        cur = n;
        setAct(n);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, hold]);

  const shown = hold >= 0 ? hold : act;
  const a = RADAR[shown];
  return (
    <figure className="radar" ref={box}>
      <svg viewBox="0 0 520 520" className="radar-svg" role="group" aria-label="As seis frentes da consultoria tributária em volta da empresa">
        <defs>
          <linearGradient id="rd-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b9c6ff" stopOpacity="0" />
            <stop offset="1" stopColor="#b9c6ff" stopOpacity="0.28" />
          </linearGradient>
        </defs>
        {[R0, 128, 182, R1].map((r) => (
          <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="rgba(185,198,255,0.16)" />
        ))}
        {RADAR.map((s, n) => {
          const mid = -Math.PI / 2 + (n + 0.5) * (Math.PI / 3);
          const [lx, ly] = polar(160, mid);
          const on = n === shown;
          const inner = (
            <>
              <path d={sectorPath(n)} className="rd-sec" />
              <text x={lx} y={ly - (s.l.length - 1) * 8} textAnchor="middle" className="rd-lbl">
                {s.l.map((t, j) => (
                  <tspan key={t} x={lx} dy={j ? 16 : 0}>{t}</tspan>
                ))}
              </text>
              <circle cx={polar(R1, mid)[0]} cy={polar(R1, mid)[1]} r="3.5" className="rd-dot" />
            </>
          );
          const common = {
            className: `rd-g${on ? " on" : ""}`,
            onMouseEnter: () => setHold(n),
            onMouseLeave: () => setHold(-1),
            onFocus: () => setHold(n),
            onBlur: () => setHold(-1),
          };
          return s.to ? (
            <Link key={s.k} to={s.to} aria-label={`${s.k}: ${s.d}`} {...common}>{inner}</Link>
          ) : (
            <a key={s.k} href="#areas" aria-label={`${s.k}: ${s.d}`} {...common} onClick={(e) => { e.preventDefault(); document.getElementById("areas")?.scrollIntoView({ behavior: "smooth" }); }}>{inner}</a>
          );
        })}
        {!reduce && (
          <g ref={sweep} aria-hidden="true" style={{ pointerEvents: "none" }}>
            <path d={`M${C} ${C} L${C} ${C - R1} A${R1} ${R1} 0 0 1 ${polar(R1, -Math.PI / 2 + 0.55)[0]} ${polar(R1, -Math.PI / 2 + 0.55)[1]} Z`} fill="url(#rd-sweep)" transform={`rotate(-31 ${C} ${C})`} />
            <line x1={C} y1={C} x2={C} y2={C - R1} stroke="#dfe6ff" strokeOpacity="0.7" strokeWidth="1.2" />
          </g>
        )}
        <circle cx={C} cy={C} r={R0 - 8} fill="#0c2065" stroke="rgba(185,198,255,0.35)" />
        <text x={C} y={C - 4} textAnchor="middle" className="rd-core">Sua</text>
        <text x={C} y={C + 14} textAnchor="middle" className="rd-core">empresa</text>
      </svg>
      <figcaption className="radar-cap" aria-hidden="true">
        <b>{a.k}</b>
        <span>{a.d}</span>
      </figcaption>
    </figure>
  );
}

/* ============================== Regularização — do emaranhado ao plano ============================== */
const SPHERES = ["Receita Federal", "PGFN", "Estados", "Municípios"];

export function Untangle() {
  const box = useRef(null);
  const cv = useRef(null);
  const inView = useInView(box);
  const reduce = useReducedMotion();

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const N = 44;
    const rnd = (s) => {
      const x = Math.sin(s * 9301 + 49297) * 233280;
      return x - Math.floor(x);
    };
    const L = new Array(N).fill(0).map((_, i) => ({
      g: i % 4,
      k: Math.floor(i / 4),
      ph: [rnd(i + 1) * 6.28, rnd(i + 7) * 6.28, rnd(i + 13) * 6.28],
      f: [0.9 + rnd(i + 3) * 1.6, 2.2 + rnd(i + 5) * 2.4, 5 + rnd(i + 9) * 4],
      a: [0.55 + rnd(i + 11) * 0.45, 0.2 + rnd(i + 17) * 0.25, 0.06 + rnd(i + 19) * 0.08],
    }));
    let W = 0;
    let H = 0;
    const size = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const sm = (a, b, x) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    const t0 = performance.now();
    let raf = 0;
    const draw = (now) => {
      const t = reduce ? 3 : (now - t0) / 1000;
      const reveal = reduce ? 1 : sm(0, 2.4, t);
      ctx.clearRect(0, 0, W, H);
      const mobile = W < 640;
      const right = mobile ? W : W - 170;
      const gy = (g) => H * (0.2 + g * 0.2);
      const x0 = right * 0.3;
      const x1 = right * 0.78;
      for (const l of L) {
        ctx.beginPath();
        const ty = gy(l.g) + (l.k - 5) * 2.6;
        for (let x = 0; x <= right * reveal; x += 4) {
          const u = x / right;
          const chaos =
            H * 0.5 +
            H * 0.36 * (l.a[0] * Math.sin(u * l.f[0] * 6.28 + l.ph[0] + t * 0.25) + l.a[1] * Math.sin(u * l.f[1] * 6.28 + l.ph[1] - t * 0.4) + l.a[2] * Math.sin(u * l.f[2] * 6.28 + l.ph[2] + t * 0.7));
          const s = sm(x0, x1, x);
          const y = chaos + (ty - chaos) * s;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(185,198,255,0.32)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // linha do plano
      if (!mobile) {
        ctx.strokeStyle = `rgba(255,255,255,${0.5 * sm(1.6, 2.6, t)})`;
        ctx.beginPath();
        ctx.moveTo(right + 0.5, H * 0.12);
        ctx.lineTo(right + 0.5, H * 0.88);
        ctx.stroke();
      }
      if (!reduce && inViewRef.current) raf = requestAnimationFrame(draw);
    };
    const inViewRef = { current: inView };
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(() => {
      size();
      if (reduce || !inView) requestAnimationFrame(draw);
    });
    ro.observe(c);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [inView, reduce]);

  return (
    <figure className="untangle" ref={box} aria-label="Ilustração: linhas emaranhadas, à esquerda, se organizam em quatro grupos à direita: Receita Federal, PGFN, estados e municípios.">
      <canvas ref={cv} aria-hidden="true" />
      <ul className="ut-labels" aria-hidden="true">
        {SPHERES.map((s, g) => (
          <li key={s} style={{ "--y": `${20 + g * 20}%`, "--d": `${1.9 + g * 0.15}s` }}>{s}</li>
        ))}
      </ul>
      <figcaption className="ut-cap" aria-hidden="true">
        <span>Débitos dispersos</span>
        <span>Plano de ação</span>
      </figcaption>
    </figure>
  );
}

/* ============================== Recuperação — cinco anos em revisão ============================== */
const MONTHS = 60;
const hRnd = (i) => {
  const x = Math.sin((i + 1) * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};
const BARS = new Array(MONTHS).fill(0).map((_, i) => ({
  h: 70 + hRnd(i) * 120 + 20 * Math.sin(i / 4),
  cap: [3, 7, 8, 15, 21, 26, 27, 33, 38, 44, 49, 52, 57].includes(i) ? 10 + hRnd(i + 99) * 16 : 0,
}));
const BX = (i) => 20 + i * 8.6 + Math.floor(i / 12) * 14;

export function FiveYears() {
  const box = useRef(null);
  const inView = useInView(box);
  const reduce = useReducedMotion();
  const [scan, setScan] = useState(reduce ? -1 : MONTHS); // índice do mês sendo revisado (vai do mais recente ao mais antigo)

  useEffect(() => {
    if (reduce) {
      setScan(-1);
      return;
    }
    if (!inView) return;
    let raf = 0;
    let t0 = performance.now();
    const tick = (now) => {
      const t = (now - t0) / 1000;
      const DUR = 7.5;
      const HOLD = 3.2;
      if (t > DUR + HOLD) t0 = now;
      const k = Math.min(1, t / DUR);
      setScan(Math.round(MONTHS - 1 - k * MONTHS));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  const done = (i) => i > scan;
  const found = BARS.filter((b, i) => b.cap && done(i));
  const total = found.reduce((s, b) => s + b.cap, 0);
  const base = 250;
  const reviewed = Math.min(MONTHS, MONTHS - 1 - scan);
  const sx = scan >= 0 && scan < MONTHS ? BX(scan) + 3 : null;
  return (
    <figure className="fy" ref={box} aria-label="Ilustração: sessenta meses de apuração revisados do mais recente ao mais antigo; em alguns meses aparecem valores pagos a maior, que se somam em créditos identificados. Sem valores reais.">
      <svg viewBox="0 0 680 320" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((y) => (
          <line key={y} x1={BX(y * 12) - 6} x2={BX(y * 12) - 6} y1="40" y2={base + 4} stroke="rgba(185,198,255,0.12)" />
        ))}
        {BARS.map((b, i) => {
          const d = done(i);
          return (
            <g key={i}>
              <rect x={BX(i)} y={base - b.h} width="6" height={b.h} rx="1.5" className={d ? "fy-b in" : "fy-b"} />
              {b.cap > 0 && (
                <rect
                  x={BX(i)}
                  y={base - b.h - b.cap - 3}
                  width="6"
                  height={b.cap}
                  rx="1.5"
                  className={d ? "fy-cap in" : "fy-cap"}
                />
              )}
            </g>
          );
        })}
        {sx !== null && <line x1={sx} x2={sx} y1="24" y2={base + 10} stroke="#fff" strokeWidth="1.2" />}
        <line x1="14" x2={BX(59) + 12} y1={base + 0.5} y2={base + 0.5} stroke="rgba(185,198,255,0.3)" />
        <text x="20" y={base + 26} className="fy-t">há cinco anos</text>
        <text x={BX(59) + 6} y={base + 26} textAnchor="end" className="fy-t">hoje</text>
        {/* créditos identificados */}
        <g transform="translate(634 0)">
          <rect x="0" y={base - Math.min(200, total)} width="26" height={Math.min(200, total)} rx="3" fill="#b9c6ff" style={{ transition: "y .35s, height .35s" }} />
          <line x1="-6" x2="32" y1={base + 0.5} y2={base + 0.5} stroke="rgba(185,198,255,0.3)" />
        </g>
        <text x="647" y={base + 26} textAnchor="middle" className="fy-t">créditos</text>
      </svg>
      <figcaption className="fy-foot">
        <span><b>{reviewed}</b> de 60 meses revisados</span>
        <span className="fine">Ilustração sem valores reais</span>
      </figcaption>
    </figure>
  );
}

