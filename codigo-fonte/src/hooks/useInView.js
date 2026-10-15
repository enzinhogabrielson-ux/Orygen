import { useEffect, useState } from "react";

/** true enquanto o elemento está na tela (para ligar/desligar animações contínuas). */
export default function useInView(ref, rootMargin = "0px") {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return on;
}

/** Progresso de um elemento atravessando a tela: 0 quando o topo entra por baixo, 1 quando o fim passa do ponto `end` (fração da altura da tela). */
export function useScrollThrough(ref, { start = 0.85, end = 0.35 } = {}) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const a = vh * start; // topo do elemento aqui → 0
      const total = r.height + a - vh * end;
      const v = Math.min(1, Math.max(0, (a - r.top) / total));
      setP((old) => (Math.abs(old - v) > 0.002 ? v : old));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [ref, start, end]);
  return p;
}
