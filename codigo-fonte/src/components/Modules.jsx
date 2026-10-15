import { useRef, useState } from "react";

/* Painel web recriado em código (módulos da plataforma, a partir das telas do site anterior). Interface ilustrativa: todos os dados são fictícios. */

const MODS = [
  { id: "pix", name: "Pix", line: "Chave, valor e confirmação, com os dados do favorecido visíveis antes de enviar." },
  { id: "boleto", name: "Boleto", line: "Emissão com multa, juros e desconto, linha digitável e PDF para o pagador." },
  { id: "link", name: "Link de pagamento", line: "Cobranças por link, pagas por Pix ou boleto, com o status de cada uma." },
  { id: "escrow", name: "Conta escrow", line: "Recursos em garantia, condições de liberação e aprovação das partes." },
  { id: "extrato", name: "Extrato", line: "Movimentações em tempo real e entradas e saídas por período." },
];

// QR Code ilustrativo (padrão gerado, não codifica nada).
function FakeQR() {
  const N = 25;
  let s = 7;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const cells = [];
  const finder = (x, y) => (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      if (finder(x, y)) continue;
      if (rnd() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    }
  const F = ({ x, y }) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" />
      <rect x="1" y="1" width="5" height="5" fill="#fff" />
      <rect x="2" y="2" width="3" height="3" />
    </g>
  );
  return (
    <svg className="qr" viewBox="-2 -2 29 29" aria-hidden="true">
      <rect x="-2" y="-2" width="29" height="29" fill="#fff" />
      <g fill="#0C2065" shapeRendering="crispEdges">
        {cells}
        <F x={0} y={0} />
        <F x={N - 7} y={0} />
        <F x={0} y={N - 7} />
      </g>
    </svg>
  );
}

const Icon = ({ id }) => {
  const p = {
    pix: "M12 3l4.5 4.5L12 12 7.5 7.5zM12 12l4.5 4.5L12 21l-4.5-4.5zM3 12l4.5-4.5L12 12l-4.5 4.5zM21 12l-4.5 4.5L12 12l4.5-4.5z",
    boleto: "M4 5v14M7 5v14M9 5v14M12 5v14M15 5v14M17 5v14M20 5v14",
    link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
    escrow: "M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6zM9 12l2 2 4-4",
    extrato: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  }[id];
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={p} />
    </svg>
  );
};

function Pix() {
  return (
    <div className="mv mv-pix">
      <div className="mv-card">
        <small>Revisar envio</small>
        <b className="amt">R$ 1.250,00</b>
        <dl>
          <dt>Para</dt><dd>Marina Alves</dd>
          <dt>CPF</dt><dd>***.482.917-**</dd>
          <dt>Instituição</dt><dd>Banco de destino S.A.</dd>
          <dt>Chave</dt><dd>marina@email.com</dd>
        </dl>
        <button type="button" className="mv-btn" tabIndex={-1}>Confirmar Pix</button>
      </div>
      <div className="mv-card mv-qr">
        <small>Receber por QR Code</small>
        <FakeQR />
        <span className="chip">Copia e Cola</span>
      </div>
    </div>
  );
}
function Boleto() {
  return (
    <div className="mv">
      <div className="mv-card mv-wide">
        <div className="mv-head"><small>Boleto registrado</small><span className="st ok">Registrado</span></div>
        <b className="amt">R$ 3.480,00</b>
        <div className="barcode" />
        <code>23793.38128 60000.000003 00000.000400 1 98760000348000</code>
        <dl className="cols">
          <dt>Vencimento</dt><dd>20/11</dd>
          <dt>Multa</dt><dd>2%</dd>
          <dt>Juros</dt><dd>1% a.m.</dd>
          <dt>Desconto</dt><dd>5% até 15/11</dd>
        </dl>
        <button type="button" className="mv-btn ghost" tabIndex={-1}>Baixar PDF</button>
      </div>
    </div>
  );
}
function Link() {
  const rows = [
    ["Mensalidade novembro", "R$ 349,90", "Pago", "ok"],
    ["Pedido 1042", "R$ 1.213,82", "Aguardando", "wait"],
    ["Consultoria", "R$ 2.500,00", "Pago", "ok"],
    ["Inscrição workshop", "R$ 180,00", "Expirado", "off"],
  ];
  return (
    <div className="mv">
      <div className="mv-card mv-wide">
        <div className="mv-head"><small>Links de pagamento</small><span className="chip">pay.suamarca.com.br/l/7f3a</span></div>
        <ul className="mv-list">
          {rows.map(([a, b, c, s]) => (
            <li key={a}><span>{a}</span><b>{b}</b><span className={`st ${s}`}>{c}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
function Escrow() {
  const conds = [["Depósito integral recebido", true], ["Escritura assinada", true], ["Registro em cartório", false]];
  return (
    <div className="mv mv-pix">
      <div className="mv-card mv-dark">
        <small>Conta escrow · saldo em garantia</small>
        <b className="amt">R$ 250.000,00</b>
        <span className="sub">Compra e venda de imóvel</span>
      </div>
      <div className="mv-card">
        <div className="mv-head"><small>Condições de liberação</small><span className="chip">2 de 3</span></div>
        <ul className="conds">
          {conds.map(([c, ok]) => (
            <li key={c} className={ok ? "ok" : ""}><i>{ok ? "✓" : ""}</i>{c}</li>
          ))}
        </ul>
        <div className="parts"><span>Comprador · depositou</span><span>Vendedor · aguardando</span></div>
      </div>
    </div>
  );
}
function Extrato() {
  const bars = [42, 58, 35, 70, 64, 88, 52, 76, 61, 94, 72, 83];
  const outs = [30, 41, 28, 49, 37, 52, 44, 38, 50, 47, 41, 55];
  return (
    <div className="mv">
      <div className="mv-card mv-wide">
        <div className="mv-head"><small>Entradas e saídas · últimos 12 meses</small><span className="chip">Atualizado agora</span></div>
        <div className="bars">
          {bars.map((v, i) => (
            <div key={i} className="bar"><i style={{ height: `${v}%` }} /><i className="o" style={{ height: `${outs[i]}%` }} /></div>
          ))}
        </div>
        <ul className="mv-list">
          <li><span>Pix recebido</span><b className="in">+ R$ 709,71</b><span className="st ok">Concluído</span></li>
          <li><span>Boleto liquidado</span><b className="in">+ R$ 1.250,00</b><span className="st ok">Concluído</span></li>
          <li><span>Pix enviado</span><b>− R$ 150,00</b><span className="st ok">Concluído</span></li>
        </ul>
      </div>
    </div>
  );
}
const VIEWS = { pix: Pix, boleto: Boleto, link: Link, escrow: Escrow, extrato: Extrato };

export default function Modules({ id = "modulos", eyebrow = "Interface ilustrativa", b: tb = "O painel,", l: tl = "módulo a módulo.", lede }) {
  const [cur, setCur] = useState("pix");
  const refs = useRef({});
  const View = VIEWS[cur];
  const mod = MODS.find((m) => m.id === cur);
  const onKey = (e) => {
    const i = MODS.findIndex((m) => m.id === cur);
    const n = MODS.length;
    let k = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") k = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") k = (i - 1 + n) % n;
    if (e.key === "Home") k = 0;
    if (e.key === "End") k = n - 1;
    if (k === null) return;
    e.preventDefault();
    setCur(MODS[k].id);
    refs.current[MODS[k].id]?.focus();
  };
  return (
    <section className="sec mods" id={id} aria-labelledby={`${id}-t`}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="eyebrow" data-reveal>{eyebrow}</p>
            <h2 id={`${id}-t`} className="h2" data-reveal>
              <span className="w-b">{tb}</span> <span className="w-l">{tl}</span>
            </h2>
          </div>
          {lede && <p className="lede" data-reveal>{lede}</p>}
        </div>

        <div className="panel" data-reveal>
          <div className="panel-bar" aria-hidden="true">
            <span>app.suamarca.com.br</span>
          </div>
          <div className="panel-body">
            <div className="panel-nav" role="tablist" aria-label="Módulos" aria-orientation="vertical" onKeyDown={onKey}>
              <div className="panel-brand" aria-hidden="true"><i />sua marca</div>
              {MODS.map((m) => (
                <button
                  key={m.id}
                  ref={(el) => (refs.current[m.id] = el)}
                  type="button"
                  role="tab"
                  id={`tab-${m.id}`}
                  aria-selected={cur === m.id}
                  aria-controls="mod-view"
                  tabIndex={cur === m.id ? 0 : -1}
                  className={cur === m.id ? "on" : ""}
                  onClick={() => setCur(m.id)}
                >
                  <Icon id={m.id} />
                  {m.name}
                </button>
              ))}
            </div>
            <div className="panel-view" id="mod-view" role="tabpanel" aria-labelledby={`tab-${cur}`} tabIndex={0}>
              <span className="demo-tag">Dados fictícios</span>
              <div className="view-head">
                <h3>{mod.name}</h3>
                <p>{mod.line}</p>
              </div>
              <div className="view-anim" key={cur}>
                <View />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
