import { useEffect, useRef } from "react";

/**
 * Progresso de rolagem de uma seção alta com conteúdo "preso" (sticky).
 * 0 = topo da seção encostou no topo da tela; 1 = fim da seção.
 * Atualiza um ref (para WebGL) e a variável CSS --p na própria seção.
 */
export default function useSectionProgress() {
  const ref = useRef(null);
  const progress = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      progress.current = p;
      el.style.setProperty("--p", p.toFixed(4));
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
  }, []);
  return [ref, progress];
}
