import { useEffect } from "react";

/**
 * Entrada discreta dos blocos marcados com data-reveal: fade + 12 px de deslocamento, uma vez só.
 * Sem JavaScript ou com movimento reduzido, tudo aparece direto (a classe .rv só é ligada aqui).
 */
export default function useReveal(reduce, key) {
  useEffect(() => {
    const root = document.documentElement;
    if (reduce || !("IntersectionObserver" in window)) {
      root.classList.remove("rv");
      return;
    }
    root.classList.add("rv");
    const els = [...document.querySelectorAll("[data-reveal]")];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            e.target.setAttribute("data-reveal", "in"); // sobrevive a trocas de className feitas pelo React
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduce, key]);
}
