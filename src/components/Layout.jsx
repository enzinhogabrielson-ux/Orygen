import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";
import useReveal from "../hooks/useReveal.js";
import { lenisStore } from "../lib/lenis.js";
import { startLife } from "../lib/life.js";
import { Symbol } from "../brand/Brand.jsx";
import config from "../config.js";

const OFFSET = -72; // altura do cabeçalho

/* Estrutura comum de todas as páginas: cabeçalho, rolagem suave, âncoras internas, rodapé. */
export default function Layout() {
  const reduce = useReducedMotion();
  const location = useLocation();
  const lenisRef = useRef(null);
  const [veil, setVeil] = useState(0); // troca de página: véu safira com o símbolo, que se abre sobre a página nova
  const first = useRef(true);
  useReveal(reduce, location.pathname);

  // camadas de "vida" (lanterna, holofote, ímã, inclinação, progresso)
  useEffect(() => startLife({ reduce }), [reduce]);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce) return;
    setVeil((v) => v + 1);
    document.documentElement.classList.add("veiled");
    const t = setTimeout(() => document.documentElement.classList.remove("veiled"), 1700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // o navegador não deve tentar restaurar a rolagem sozinho (quem cuida é o efeito de troca de página)
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  // indexação: homologação fica fora dos buscadores
  useEffect(() => {
    let m = document.querySelector('meta[name="robots"]');
    if (!config.indexable) {
      if (!m) {
        m = document.createElement("meta");
        m.name = "robots";
        document.head.appendChild(m);
      }
      m.content = "noindex, nofollow";
    } else m?.remove();
  }, []);

  // rolagem suave (Lenis): uma instância para o site todo, desligada para quem prefere menos movimento
  useEffect(() => {
    const lenis = reduce ? null : new Lenis({ lerp: 0.09 });
    lenisRef.current = lenis;
    lenisStore.current = lenis;
    let raf = 0;
    if (lenis)
      raf = requestAnimationFrame(function tick(t) {
        lenis.raf(t);
        raf = requestAnimationFrame(tick);
      });
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenisRef.current = null;
      lenisStore.current = null;
    };
  }, [reduce]);

  function scrollToEl(el, immediate = false) {
    const lenis = lenisRef.current;
    if (!el) {
      if (lenis) lenis.scrollTo(0, { immediate, force: true });
      else window.scrollTo({ top: 0, behavior: immediate || reduce ? "auto" : "smooth" });
      return;
    }
    if (lenis) {
      lenis.resize(); // garante o limite de rolagem da página atual (o Lenis só recalcula com atraso)
      lenis.scrollTo(el, { offset: OFFSET, immediate, force: true });
    }
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + OFFSET, behavior: immediate || reduce ? "auto" : "smooth" });
  }

  // âncoras da própria página (#secao): rola sem trocar de rota (também no modo HashRouter)
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (href.startsWith("#/")) return; // link de rota no modo HashRouter
      const el = href === "#topo" ? document.body : document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      scrollToEl(href === "#topo" ? null : el, !!reduce);
      if (href === "#conteudo" || el.matches("h1,h2,[tabindex]")) el.focus?.({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  });

  // ao trocar de página: volta ao topo (ou vai para a seção pedida no link)
  useLayoutEffect(() => {
    const section = location.state?.section;
    scrollToEl(null, true);
    window.scrollTo(0, 0);
    if (!section) return;
    let t = 0;
    const r = requestAnimationFrame(() => {
      t = setTimeout(() => {
        const el = document.getElementById(section);
        if (el) scrollToEl(el, !!reduce);
      }, 80);
    });
    return () => {
      cancelAnimationFrame(r);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.key]);

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      {veil > 0 && (
        <div className="veil" key={veil} aria-hidden="true" onAnimationEnd={(e) => e.target === e.currentTarget && setVeil(0)}>
          <Symbol className="veil-sym" aria-hidden="true" />
        </div>
      )}
    </>
  );
}
