/* Seções da v4 que continuam no site, agora configuráveis por página. */

/* Faixa escura logo abaixo do topo: uma linha que corre devagar com o que a ORYGEN conecta (para ao passar o mouse). */
export function Capabilities({ label, items }) {
  const row = (hidden) => (
    <ul className="caps-list" aria-hidden={hidden || undefined} aria-labelledby={hidden ? undefined : "caps-k"}>
      {items.map((m, i) => (
        <li key={m} style={{ "--i": i }}>
          <span>{m}</span>
          <i aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="caps dark">
      <div className="wrap caps-in">
        <p className="caps-k" id="caps-k">{label}</p>
        <div className="caps-track">
          <div className="caps-run">
            {row(false)}
            {row(true)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Lista com título preso à esquerda e itens com fio fino (antiga seção "Segurança"). */
export function RowList({ id, eyebrow, b, l, intro, items, className = "light" }) {
  return (
    <section className={`sec rows ${className}`} id={id} aria-labelledby={`${id}-t`}>
      <div className="wrap sec-grid">
        <div className="sticky-h">
          <p className="eyebrow" data-reveal="">{eyebrow}</p>
          <h2 id={`${id}-t`} className="h2" data-reveal="">
            <span className="w-b">{b}</span> <span className="w-l">{l}</span>
          </h2>
          {intro}
        </div>
        <ul className="sec-list">
          {items.map(([t, d]) => (
            <li key={t} data-reveal="">
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
