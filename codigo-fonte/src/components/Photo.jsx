import { useRef } from "react";
import { useScrollThrough } from "../hooks/useInView.js";
import useReducedMotion from "../hooks/useReducedMotion.js";

/*
  Fotografias do site (geradas para a marca: hora azul, só a família do safira, sem rostos nem textos).
  PhotoBand → faixa larga com paralaxe leve e uma frase curta.
  PhotoPair → duas fotos lado a lado com legenda (São Paulo e Rio de Janeiro).
*/
const base = import.meta.env.BASE_URL;

export function PhotoBand({ src, alt, eyebrow, text, align = "left", tall = false }) {
  const box = useRef(null);
  const reduce = useReducedMotion();
  const p = useScrollThrough(box, { start: 1, end: 0 });
  const y = reduce ? 0 : (p - 0.5) * 12; // a foto anda devagar enquanto a faixa atravessa a tela
  return (
    <figure className={`pband${tall ? " tall" : ""} al-${align}`} ref={box} data-reveal="">
      <img src={`${base}fotos/${src}`} alt={alt} loading="lazy" decoding="async" style={{ transform: `translateY(${y.toFixed(2)}%) scale(1.12)` }} />
      <div className="pband-shade" aria-hidden="true" />
      {(eyebrow || text) && (
        <figcaption className="wrap pband-cap">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {text && <p className="pband-t">{text}</p>}
        </figcaption>
      )}
    </figure>
  );
}

export function PhotoPair({ items }) {
  return (
    <div className="ppair" data-reveal="">
      {items.map(([src, alt, label, sub], i) => (
        <figure key={src} className="ppair-item" style={{ "--i": i }}>
          <img src={`${base}fotos/${src}`} alt={alt} loading="lazy" decoding="async" />
          <figcaption><b>{label}</b><span>{sub}</span></figcaption>
        </figure>
      ))}
    </div>
  );
}
