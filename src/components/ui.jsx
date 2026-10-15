import VerticalMark from "../brand/Verticals.jsx";
import { Fragment, useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Symbol } from "../brand/Brand.jsx";
import useSectionProgress from "../hooks/useSectionProgress.js";
import config from "../config.js";

/* ===================== título e descrição de cada página ===================== */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
    }
    m.content = description;
  }, [title, description]);
}

/* ===================== links ===================== */
/**
 * Link interno.
 * - `to` muda de página (e rola até `section`, se houver);
 * - sem `to`, ou com `to` igual à página atual, vira âncora da própria página (#secao).
 */
export function Go({ to, section, className, children, ...p }) {
  const { pathname } = useLocation();
  if (!to || (section && to === pathname)) return <a className={className} href={`#${section}`} {...p}>{children}</a>;
  return (
    <Link className={className} to={to} state={section ? { section } : undefined} {...p}>
      {children}
    </Link>
  );
}

export const Arrow = () => (
  <svg className="ico-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const Check = () => (
  <svg className="ico-check" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export function LinkArrow({ to, section, children, className = "" }) {
  return (
    <Go className={`link-arrow ${className}`} to={to} section={section}>
      {children}
      <Arrow />
    </Go>
  );
}

/* ===================== ícones de linha (grade 24 × 24, mesmo traço) ===================== */
const ICONS = {
  building: '<rect x="4.5" y="3" width="15" height="18" rx="1.5"/><path d="M9.5 21v-4h5v4"/><path d="M8.5 7h.01M12 7h.01M15.5 7h.01M8.5 11h.01M12 11h.01M15.5 11h.01"/>',
  wallet: '<path d="M4 7.5V7a2 2 0 0 1 2-2h11v2.5"/><rect x="4" y="7.5" width="16" height="12" rx="2"/><path d="M15.5 13.5h.01"/>',
  bolt: '<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>',
  transfer: '<path d="M4 8h14"/><path d="m15 5 3 3-3 3"/><path d="M20 16H6"/><path d="m9 13-3 3 3 3"/>',
  barcode: '<path d="M4 6v12"/><path d="M7.5 6v12"/><path d="M10.5 6v8"/><path d="M13.5 6v12"/><path d="M16.5 6v8"/><path d="M20 6v12"/>',
  card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/>',
  pos: '<rect x="6" y="2.5" width="12" height="19" rx="2"/><rect x="8.5" y="5" width="7" height="4" rx=".5"/><path d="M9 13h.01M12 13h.01M15 13h.01M9 16.5h.01M12 16.5h.01M15 16.5h.01"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>',
  growth: '<path d="M4 19.5h16"/><path d="m5 15 4.5-4.5 3.5 3.5L19 7.5"/><path d="M15 7.5h4v4"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8.5 15h6"/><path d="m12.5 13 2 2-2 2"/>',
  document: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><path d="M12 14.5v2.5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
  route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
  fileCheck: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="m9 14.5 2 2 4-4"/>',
  recover: '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5"/><path d="M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5"/><path d="M4 20v-4.5h4.5"/>',
  landmark: '<path d="M3 20.5h18"/><path d="M4.5 10h15"/><path d="M12 3.5 4 7.5V10h16V7.5z"/><path d="M6.5 10v7.5M10 10v7.5M14 10v7.5M17.5 10v7.5"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  code: '<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m13.5 5-3 14"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  tag: '<path d="M3.5 12.5v-8a1 1 0 0 1 1-1h8l8 8-9 9z"/><circle cx="8" cy="8" r="1.5"/>',
  dashboard: '<rect x="3.5" y="3.5" width="7" height="8" rx="1"/><rect x="13.5" y="3.5" width="7" height="5" rx="1"/><rect x="13.5" y="11.5" width="7" height="9" rx="1"/><rect x="3.5" y="14.5" width="7" height="6" rx="1"/>',
  plug: '<path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
  factory: '<path d="M3 20.5h18"/><path d="M4 20.5V11l5 3v-3l5 3V5h4l1.5 15.5"/>',
  truck: '<path d="M3 6.5h11v10H3z"/><path d="M14 10h4l3 3.5v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  clipboard: '<rect x="5" y="4.5" width="14" height="16.5" rx="2"/><path d="M9 4.5V3h6v1.5"/><path d="M9 10h6M9 14h6M9 18h3"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.5 3 8 7 9.5 4-1.5 7-5 7-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
  message: '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  scale: '<path d="M12 3.5v17M7.5 20.5h9"/><path d="M5 7h14"/><path d="m5 7-2.5 6a2.5 2.5 0 0 0 5 0z"/><path d="m19 7-2.5 6a2.5 2.5 0 0 0 5 0z"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5"/><path d="M12 16.5h.01"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1"/>',
};

export function Icon({ name, className = "" }) {
  return (
    <svg
      className={`ico ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: ICONS[name] || "" }}
    />
  );
}

/* ===================== tipografia ===================== */
export const Eyebrow = ({ children, reveal = true }) => (
  <p className="eyebrow" data-reveal={reveal ? "" : undefined}>{children}</p>
);

/** Divide um texto em palavras com índice (--i) para a entrada escalonada dos títulos. */
export function Words({ text, from = 0 }) {
  if (typeof text !== "string") return text;
  const ws = text.split(" ");
  return ws.map((w, i) => (
    <Fragment key={i}>
      <span className="w" style={{ "--i": from + i }}><span>{w}</span></span>
      {i < ws.length - 1 ? " " : ""}
    </Fragment>
  ));
}
const countWords = (t) => (typeof t === "string" ? t.split(" ").length : 0);

export function Title({ as: H = "h2", id, b, l, className = "h2" }) {
  return (
    <H id={id} className={`${className} tw`} data-reveal="">
      <span className="w-b"><Words text={b} /></span>
      {l ? <> <span className="w-l"><Words text={l} from={countWords(b)} /></span></> : null}
    </H>
  );
}

export function SectionHead({ eyebrow, b, l, id, text, split = true }) {
  return (
    <div className={`sec-head${split ? "" : " stack"}`}>
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Title id={id} b={b} l={l} />
      </div>
      {text && <p className="lede" data-reveal="">{text}</p>}
    </div>
  );
}

export const Note = ({ children, icon = "info" }) => (
  <p className="note" data-reveal="">
    {icon === "info" ? (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.6v.1" /></svg>
    ) : (
      <Icon name={icon} />
    )}
    <span>{children}</span>
  </p>
);

export function Checklist({ items, cols = 1, reveal = true }) {
  return (
    <ul className={`checklist${cols === 2 ? " cols-2" : ""}`}>
      {items.map((t) => (
        <li key={t} data-reveal={reveal ? "" : undefined}><Check /><span>{t}</span></li>
      ))}
    </ul>
  );
}

/** Selo curto (ex.: "Sob consulta", "Exemplo ilustrativo"). */
export const Badge = ({ children, warn }) => <span className={`badge${warn ? " warn" : ""}`}>{children}</span>;

/** Marcação visível de pendência (conteúdo que depende da ORYGEN). */
export const Pending = ({ children }) => <span className="pending">[PENDENTE: {children}]</span>;

/* ===================== cartões em grade (fios finos, como o "kit" da v4) ===================== */
export function Tiles({ cols = 3, children, className = "" }) {
  return <div className={`tiles cols-${cols} ${className}`} data-reveal="">{children}</div>;
}

export function Tile({ icon, title, badge, children, meta, link, className = "", as: H = "h3" }) {
  return (
    <article className={`tile ${className}`}>
      {(icon || badge) && (
        <div className="tile-top">
          {icon && <Icon name={icon} />}
          {badge}
        </div>
      )}
      <H className="tile-t">{title}</H>
      {children}
      {meta && (
        <dl className="tile-meta">
          {meta.map(([dt, dd]) => (
            <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>
          ))}
        </dl>
      )}
      {link && <LinkArrow to={link.to} section={link.section}>{link.label}</LinkArrow>}
    </article>
  );
}

/* ===================== topo das páginas internas ===================== */
export function PageHero({ eyebrow, b, l, lead, ctas = [], note, crumbs, visual, compact, layout = "split", band, variant = "", mark }) {
  return (
    <section className={`page-hero dark ph-${layout}${variant ? ` ph-${variant}` : ""}${compact ? " compact" : ""}`} aria-labelledby="titulo-pagina">
      <div className="hero-sky" aria-hidden="true" />
      <div className={`wrap page-hero-grid${visual ? "" : " solo"}`}>
        <div className="page-hero-copy">
          {crumbs && (
            <nav className="crumbs hero-in" aria-label="Você está em" style={{ "--d": "0.05s" }}>
              <ol>
                {crumbs.map(([label, to]) => (
                  <li key={label}>{to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && (
            <p className={`eyebrow hero-in${mark ? " has-mark" : ""}`} style={{ "--d": "0.1s" }}>
              {mark && <VerticalMark v={mark} className="eb-mark" />}
              {eyebrow}
            </p>
          )}
          <h1 id="titulo-pagina" className="page-hero-t tw-in" style={{ "--d": "0.2s" }}>
            <span className="w-b"><Words text={b} /></span>
            {l ? <> <span className="w-l"><Words text={l} from={countWords(b)} /></span></> : null}
          </h1>
          {lead && <p className="hero-lede hero-in" style={{ "--d": "0.32s" }}>{lead}</p>}
          {ctas.length > 0 && (
            <div className="ctas hero-in" style={{ "--d": "0.44s" }}>
              {ctas.map((c, i) => (
                <Go key={c.label} className={`btn ${i === 0 ? "btn-solid" : "btn-line"}`} to={c.to} section={c.section}>
                  {c.label}
                </Go>
              ))}
            </div>
          )}
          {note && <p className="hero-note hero-in" style={{ "--d": "0.56s" }}>{note}</p>}
        </div>
        {visual && <div className="page-hero-visual hero-in" style={{ "--d": "0.4s" }}>{visual}</div>}
      </div>
      {band && <div className="page-hero-band hero-in" style={{ "--d": "0.3s" }}>{band}</div>}
    </section>
  );
}

/* ===================== roteiro ilustrativo (topo das páginas tributárias) ===================== */
export function Roadmap({ title, tag, items, foot }) {
  return (
    <figure className="roadmap">
      <div className="roadmap-head"><b>{title}</b><span>{tag}</span></div>
      <ol>
        {items.map(([t, d], i) => (
          <li key={t}><span className="rm-n" aria-hidden="true">0{i + 1}</span><span><b>{t}</b><small>{d}</small></span></li>
        ))}
      </ol>
      <figcaption>{foot}</figcaption>
    </figure>
  );
}

/* ===================== painel ilustrativo de conta (dados fictícios) ===================== */
export function AccountMock({ tag = "Interface ilustrativa · dados fictícios", who = "Empresa Exemplo Ltda", kind = "Conta PJ", balance, actions, rows, label }) {
  return (
    <figure className="acct">
      <figcaption className="acct-tag">{tag}</figcaption>
      <div className="acct-card" role="img" aria-label={label}>
        <div className="acct-top" aria-hidden="true">
          <span className="acct-who"><i>{who.slice(0, 2).toUpperCase()}</i><span><b>{who}</b><small>{kind}</small></span></span>
          <span className="acct-day">Hoje</span>
        </div>
        <div className="acct-bal" aria-hidden="true"><small>Saldo disponível</small><b>{balance}</b></div>
        <div className="acct-acts" aria-hidden="true">
          {actions.map(([ic, a]) => (
            <span key={a}><Icon name={ic} />{a}</span>
          ))}
        </div>
        <ul className="acct-list" aria-hidden="true">
          {rows.map(([ic, t, s, v, st]) => (
            <li key={t}>
              <Icon name={ic} />
              <span><b>{t}</b><small>{s}</small></span>
              {v ? <b className="acct-v">{v}</b> : <span className={`st ${st === "Pago" ? "ok" : "wait"}`}>{st}</span>}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

/* ===================== lista de etapas (estática) ===================== */
export function StepList({ items, level = 3 }) {
  const H = `h${level}`;
  return (
    <ol className="steplist">
      {items.map(([t, d], i) => (
        <li key={t} data-reveal="" style={{ "--d": `${i * 0.06}s` }}>
          <span className="sl-n" aria-hidden="true">0{i + 1}</span>
          <div><H>{t}</H><p>{d}</p></div>
        </li>
      ))}
    </ol>
  );
}

/* ===================== perguntas frequentes ===================== */
export function Faq({ items }) {
  return (
    <div className="faq" data-reveal="">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary><span>{q}</span><i aria-hidden="true" /></summary>
          <div className="faq-a"><div>{typeof a === "string" ? <p>{a}</p> : a}</div></div>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ id = "perguntas", title, aside, items, alt }) {
  return (
    <section className={`sec faq-sec ${alt ? "alt" : "light"}`} id={id} aria-labelledby={`${id}-t`}>
      <div className="wrap split">
        <div>
          <Eyebrow>Perguntas frequentes</Eyebrow>
          <Title id={`${id}-t`} b={title[0]} l={title[1]} />
          {aside}
        </div>
        <Faq items={items} />
      </div>
    </section>
  );
}

/* ===================== abas (setas, Home e End trocam de aba) ===================== */
export function Tabs({ label, tabs }) {
  const [cur, setCur] = useState(0);
  const refs = useRef([]);
  const uid = useId().replace(/:/g, "");
  const onKey = (e) => {
    const n = tabs.length;
    let k = null;
    if (e.key === "ArrowRight") k = (cur + 1) % n;
    if (e.key === "ArrowLeft") k = (cur - 1 + n) % n;
    if (e.key === "Home") k = 0;
    if (e.key === "End") k = n - 1;
    if (k !== null) {
      e.preventDefault();
      setCur(k);
      refs.current[k]?.focus();
    }
  };
  return (
    <div className="tabs" data-reveal="">
      <div className="tabs-list" role="tablist" aria-label={label} onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => (refs.current[i] = el)}
            role="tab"
            type="button"
            id={`${uid}-tab-${t.id}`}
            aria-selected={cur === i}
            aria-controls={`${uid}-panel-${t.id}`}
            tabIndex={cur === i ? 0 : -1}
            className={cur === i ? "on" : ""}
            onClick={() => setCur(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-panel-${t.id}`}
          aria-labelledby={`${uid}-tab-${t.id}`}
          tabIndex={0}
          hidden={cur !== i}
          className="tabs-panel"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}

/* ===================== camadas presas na tela (planos que se abrem com a rolagem) ===================== */
export function PinnedLayers({ id, eyebrow, b, l, lede, items, planes, uiLabel = "sua empresa", note }) {
  const [ref] = useSectionProgress();
  return (
    <section className="layers" id={id} ref={ref} aria-labelledby={`${id}-t`}>
      <div className="layers-pin">
        <div className="wrap layers-grid">
          <div className="layers-txt">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title id={`${id}-t`} b={b} l={l} />
            {lede && <p className="lede" data-reveal="">{lede}</p>}
            <ol className="layer-list">
              {items.map((it, i) => (
                <li key={it.title} style={{ "--i": i }}>
                  <span className="layer-n" aria-hidden="true">0{i + 1}</span>
                  <div>
                    <h3>{it.title}{it.sub && <span className="layer-t">{it.sub}</span>}</h3>
                    <p>{it.text}</p>
                    {it.link && <LinkArrow to={it.link.to} section={it.link.section}>{it.link.label}</LinkArrow>}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <figure className="stack-fig">
            <div className="stack" aria-hidden="true">
              <div className="plane pl-flow" style={{ "--i": 2 }}>
                <span className="pl-tag">03 · {planes[2]}</span>
                <svg viewBox="0 0 400 250" className="pl-lines" preserveAspectRatio="none">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <path key={i} pathLength="1" d={`M0 ${70 + i * 26} C 130 ${50 + i * 28}, 270 ${110 + i * 18}, 400 ${60 + i * 26}`} />
                  ))}
                </svg>
              </div>
              <div className="plane pl-core" style={{ "--i": 1 }}>
                <span className="pl-tag">02 · {planes[1]}</span>
                <Symbol className="pl-sym" aria-hidden="true" />
              </div>
              <div className="plane pl-brand" style={{ "--i": 0 }}>
                <span className="pl-tag">01 · {planes[0]}</span>
                <div className="pl-ui">
                  <div className="pl-top"><i className="pl-dot" /><span>{uiLabel}</span></div>
                  <div className="pl-bal"><small>Saldo disponível</small><b>R$ 48.320,15</b></div>
                  <div className="pl-row"><span>Pix</span><span>Boleto</span><span>Link</span><span>Escrow</span></div>
                </div>
              </div>
            </div>
            <figcaption className="fig-note">{note || "Ilustração com valores fictícios."}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ===================== régua presa na tela (etapas que acendem com a rolagem) ===================== */
export function PinnedSteps({ id, eyebrow, b, l, lede, steps }) {
  const [ref] = useSectionProgress();
  return (
    <section className="steps dark" id={id} ref={ref} aria-labelledby={`${id}-t`} style={{ "--n": steps.length }}>
      <div className="steps-pin">
        <div className="wrap">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-t`} className="h2">
            <span className="w-b">{b}</span> <span className="w-l">{l}</span>
          </h2>
          {lede && <p className="lede">{lede}</p>}
          <ol className="steps-row">
            {steps.map(([t, d], i) => (
              <li key={t} style={{ "--i": i }}>
                <span className="n" aria-hidden="true">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ===================== contato e formulário ===================== */

// Para receber os contatos, ligue o envio aqui (e-mail, WhatsApp, CRM ou webhook).
// Enquanto não houver destino, o formulário só confere os campos e avisa que o envio não está ativo.
// PENDENTE: destino dos formulários (ver LEIA-ME).
async function enviar(dados) {
  // Exemplo: return fetch("https://SEU-ENDPOINT", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
  return { conectado: false, dados };
}

const AREAS = [
  ["solucoes-financeiras", "Soluções financeiras para minha empresa"],
  ["consultoria-tributaria", "Consultoria tributária"],
  ["white-label", "BaaS White Label (tecnologia com a minha marca)"],
  ["orientacao", "Ainda não sei, quero orientação"],
];

const BASE_FIELDS = [
  { name: "nome", label: "Nome", required: true, autoComplete: "name", err: "Informe seu nome." },
  { name: "empresa", label: "Empresa", required: true, autoComplete: "organization", err: "Informe o nome da empresa." },
  { name: "email", label: "E-mail profissional", type: "email", required: true, autoComplete: "email", err: "Informe um e-mail válido, como nome@empresa.com.br." },
  { name: "telefone", label: "Telefone com DDD", type: "tel", required: true, autoComplete: "tel-national", err: "Informe um telefone com DDD, como (21) 99999-9999." },
];

function validar(f, v) {
  const val = (v ?? "").trim();
  if (f.type === "checks") return f.required && !val ? f.err || "Selecione ao menos uma opção." : "";
  if (f.required && !val) return f.err || "Campo obrigatório.";
  if (val && f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) return f.err;
  if (val && f.type === "tel" && val.replace(/\D/g, "").length < 10) return f.err;
  return "";
}

function Field({ f, uid, error }) {
  const id = `${uid}-${f.name}`;
  const errId = `${id}-erro`;
  const hintId = f.hint ? `${id}-dica` : undefined;
  const described = [hintId, error ? errId : null].filter(Boolean).join(" ") || undefined;
  const label = (
    <>
      {f.label}
      {f.required ? <span className="req" aria-hidden="true"> *</span> : <span className="opt"> (opcional)</span>}
    </>
  );
  const err = error ? <p className="field-err" id={errId}>{error}</p> : null;
  const hint = f.hint ? <p className="field-hint" id={hintId}>{f.hint}</p> : null;

  if (f.type === "checks")
    return (
      <fieldset className={`field full${error ? " bad" : ""}`} aria-describedby={described}>
        <legend>{label}</legend>
        {hint}
        <div className="checks">
          {f.options.map(([v, l]) => (
            <label key={v} className="check">
              <input type="checkbox" name={f.name} value={v} defaultChecked={f.checked?.includes(v)} />
              <span>{l}</span>
            </label>
          ))}
        </div>
        {err}
      </fieldset>
    );

  const common = {
    id,
    name: f.name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": described,
    "aria-required": f.required || undefined,
  };
  return (
    <div className={`field${f.full ? " full" : ""}${error ? " bad" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {hint}
      {f.type === "select" ? (
        <select {...common} defaultValue="">
          <option value="">Selecione</option>
          {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      ) : f.type === "textarea" ? (
        <textarea {...common} rows={4} maxLength={1500} />
      ) : (
        <input {...common} type={f.type || "text"} autoComplete={f.autoComplete} maxLength={160} inputMode={f.type === "tel" ? "tel" : undefined} />
      )}
      {err}
    </div>
  );
}

/**
 * Formulário comercial por área.
 * area      valor fixo de "area_interesse" (sem ele, aparece o seletor de área)
 * form      identificador do formulário no envio (ex.: "regularizacao-tributaria")
 * extra     campos adicionais (antes da descrição)
 */
export function LeadForm({ area, form, title = "Fale sobre sua empresa", intro = "Campos com * são obrigatórios.", submit = "Enviar mensagem", extra = [], message }) {
  const uid = useId().replace(/:/g, "");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const fields = [
    ...BASE_FIELDS,
    ...(area ? [] : [{ name: "area_interesse", label: "Área de interesse", type: "select", required: true, options: AREAS, err: "Selecione a área de interesse.", full: true }]),
    ...extra,
    {
      name: "mensagem",
      type: "textarea",
      full: true,
      label: message?.label || "Breve descrição da necessidade",
      hint: message?.hint || "Não inclua CPF, documentos, extratos ou senhas. Se precisarmos de documentos, combinaremos um canal seguro.",
    },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    if (fd.get("empresa_site")) return; // campo-armadilha preenchido: robô
    const dados = { formulario: form || area || "institucional", pagina: window.location.href };
    const errs = {};
    for (const f of fields) {
      const v = f.type === "checks" ? fd.getAll(f.name) : fd.get(f.name);
      dados[f.name] = v;
      const msg = validar(f, Array.isArray(v) ? v.join(",") : v);
      if (msg) errs[f.name] = msg;
    }
    if (area) dados.area_interesse = area;
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      setStatus({ kind: "err", text: `Confira ${Object.keys(errs).length === 1 ? "o campo destacado" : "os campos destacados"} para continuar.` });
      formEl.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setSending(true);
    try {
      const r = await enviar(dados);
      setStatus(
        r?.conectado === false
          ? { kind: "info", text: "Dados conferidos. O envio por este formulário ainda não está ativo, então nada foi enviado. Enquanto isso, procure a ORYGEN pelos canais oficiais." }
          : { kind: "ok", text: "Recebemos sua mensagem. Vamos direcionar seu atendimento ao responsável adequado." },
      );
    } catch {
      setStatus({ kind: "err", text: "Não foi possível enviar agora. Seus dados continuam preenchidos; tente novamente em instantes." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="form-card" data-reveal="">
      <h3 className="form-title" id={`${uid}-t`}>{title}</h3>
      <p className="form-intro">{intro}</p>
      <form className="form" noValidate onSubmit={onSubmit} aria-labelledby={`${uid}-t`}>
        {fields.map((f) => <Field key={f.name} f={f} uid={uid} error={errors[f.name]} />)}
        <div className="hp" aria-hidden="true">
          <label htmlFor={`${uid}-hp`}>Não preencha este campo</label>
          <input id={`${uid}-hp`} type="text" name="empresa_site" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="form-foot">
          <button className="btn btn-solid" type="submit" disabled={sending}>{sending ? "Conferindo…" : submit}</button>
          <p className="form-legal">
            Usaremos estes dados somente para responder à sua solicitação. Saiba mais na <Link to="/privacidade">Política de Privacidade</Link>.
          </p>
        </div>
        <p className={`form-msg ${status?.kind || ""}`} role="status" aria-live="polite">{status?.text}</p>
      </form>
    </div>
  );
}

export const DEFAULT_NEXT = [
  "Lemos sua mensagem e identificamos a área responsável.",
  "Um especialista entra em contato para entender a operação.",
  "Se fizer sentido, apresentamos uma proposta com escopo, custos e próximos passos.",
];

/** Canais oficiais vindos de config.contact. Campo vazio = canal não exibido (pendência). */
export function contactChannels() {
  const c = config.contact;
  const s = config.social;
  const out = [];
  if (c.email) out.push(["E-mail", <a href={`mailto:${c.email}`}>{c.email}</a>]);
  if (c.phone) out.push(["Telefone", c.phoneE164 ? <a href={`tel:${c.phoneE164}`}>{c.phone}</a> : c.phone]);
  if (c.whatsappE164) out.push(["WhatsApp", <a href={`https://wa.me/${c.whatsappE164}`} rel="noopener">Conversar pelo WhatsApp</a>]);
  if (c.hours) out.push(["Atendimento", c.hours]);
  if (c.address) out.push(["Endereço", c.address]);
  if (s.linkedin) out.push(["LinkedIn", <a href={s.linkedin} rel="noopener">LinkedIn</a>]);
  if (s.instagram) out.push(["Instagram", <a href={s.instagram} rel="noopener">Instagram</a>]);
  return out;
}

export function ContactSection({ b, l, text, next = DEFAULT_NEXT, form }) {
  const channels = contactChannels();
  return (
    <section className="sec contact dark" id="contato" aria-labelledby="contato-t">
      <div className="wrap contact-grid">
        <div>
          <Eyebrow>Fale com a ORYGEN</Eyebrow>
          <h2 id="contato-t" className="h2 big" data-reveal="">
            <span className="w-b">{b}</span> <span className="w-l">{l}</span>
          </h2>
          <p className="lede" data-reveal="">{text}</p>
          <div className="next" data-reveal="">
            <h3>O que acontece depois</h3>
            <ol>{next.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
          {channels.length > 0 && (
            <dl className="channels">
              {channels.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          )}
        </div>
        {form}
      </div>
    </section>
  );
}
