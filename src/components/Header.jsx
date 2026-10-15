import VerticalMark from "../brand/Verticals.jsx";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Symbol } from "../brand/Brand.jsx";
import { lenisStore } from "../lib/lenis.js";

/* Menu: "A ORYGEN" + "Soluções" (painel com as páginas de cada frente) + "Fale com a ORYGEN". */
export const SOLUCOES = [
  {
    v: "pay",
    area: "ORYGEN PAY",
    links: [["/baas", "Soluções financeiras", "Contas, pagamentos, cobranças, crédito e recebíveis"]],
  },
  {
    v: "tech",
    area: "ORYGEN Tech",
    links: [["/white-label", "BaaS White Label", "Tecnologia para oferecer serviços financeiros com a sua marca"]],
  },
  {
    v: "tax",
    area: "ORYGEN Tax",
    links: [
      ["/tributario", "Consultoria tributária", "Diagnóstico, planejamento e acompanhamento"],
      ["/tributario/regularizacao", "Regularização de dívidas", "Passivo tributário e alternativas previstas em lei"],
      ["/tributario/recuperacao-de-creditos", "Recuperação de créditos", "Revisão de tributos pagos a maior ou indevidamente"],
    ],
  },
];

// páginas que têm seção de contato própria (as demais levam ao contato da página inicial)
const WITH_CONTACT = ["/", "/baas", "/white-label", "/tributario", "/tributario/regularizacao", "/tributario/recuperacao-de-creditos"];

const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function Header() {
  const [open, setOpen] = useState(false); // gaveta (celular)
  const [sol, setSol] = useState(false); // painel "Soluções" (desktop)
  const [solid, setSolid] = useState(false);
  const loc = useLocation();
  const solRef = useRef(null);
  const btnRef = useRef(null);
  const menuBtnRef = useRef(null);
  const drawerRef = useRef(null);
  const hoverTimer = useRef(0);
  const byHover = useRef(false); // painel aberto só pelo mouse (ainda não "fixado" por clique ou teclado)
  const solOpen = useRef(false); // espelho do estado, para os eventos não lerem um valor antigo
  useEffect(() => {
    solOpen.current = sol;
    if (!sol) byHover.current = false;
  }, [sol]);

  const inSolutions = SOLUCOES.some((g) => g.links.some(([to]) => loc.pathname === to || loc.pathname.startsWith(`${to}/`)));
  const hasContact = WITH_CONTACT.includes(loc.pathname);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // gaveta aberta: pausa a rolagem do fundo, foca o primeiro link, Esc fecha
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) {
      lenisStore.current?.stop();
      requestAnimationFrame(() => drawerRef.current?.querySelector("a")?.focus());
      const onKey = (e) => {
        if (e.key === "Escape") {
          setOpen(false);
          menuBtnRef.current?.focus();
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    lenisStore.current?.start();
  }, [open]);

  // fecha menus ao trocar de página
  useEffect(() => {
    setOpen(false);
    setSol(false);
  }, [loc.pathname, loc.key]);

  // painel aberto: Esc fecha (e devolve o foco ao botão); clique fora fecha
  useEffect(() => {
    if (!sol) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSol(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e) => {
      if (!solRef.current?.contains(e.target)) setSol(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [sol]);

  const panelLinks = () => [...(solRef.current?.querySelectorAll(".sol-panel a") || [])];
  const focusLink = (i) => {
    const links = panelLinks();
    if (!links.length) return;
    links[(i + links.length) % links.length].focus();
  };

  // abre ao passar o mouse (somente em dispositivos com cursor), com pequena tolerância para fechar
  const onEnter = () => {
    if (!canHover()) return;
    clearTimeout(hoverTimer.current);
    if (!solOpen.current) byHover.current = true;
    solOpen.current = true;
    setSol(true);
  };
  const onLeave = () => {
    if (!canHover()) return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      if (!solRef.current?.contains(document.activeElement) || byHover.current) setSol(false);
    }, 180);
  };
  const onBtnClick = () => {
    // se abriu pelo mouse, o clique "fixa" o painel em vez de fechá-lo
    if (byHover.current) {
      byHover.current = false;
      setSol(true);
      return;
    }
    setSol((s) => !s);
  };
  const onBtnKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      byHover.current = false;
      setSol(true);
      requestAnimationFrame(() => focusLink(0));
    }
  };
  const onPanelKey = (e) => {
    const links = panelLinks();
    const i = links.indexOf(document.activeElement);
    if (i < 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); focusLink(i + 1); }
    if (e.key === "ArrowUp") { e.preventDefault(); focusLink(i - 1); }
    if (e.key === "Home") { e.preventDefault(); focusLink(0); }
    if (e.key === "End") { e.preventDefault(); focusLink(links.length - 1); }
  };
  // Tab para fora do item fecha o painel
  const onBlur = (e) => {
    if (!solRef.current?.contains(e.relatedTarget)) setSol(false);
  };

  const Cta = ({ className, onClick }) =>
    hasContact ? (
      <a className={className} href="#contato" onClick={onClick}>Fale com a ORYGEN</a>
    ) : (
      <Link className={className} to="/" state={{ section: "contato" }} onClick={onClick}>Fale com a ORYGEN</Link>
    );

  return (
    <>
      <header className={`nav${solid || sol || open ? " solid" : ""}`}>
        <div className="wrap nav-in">
          <Link className="nav-logo" to="/" aria-label="ORYGEN, página inicial">
            <Symbol aria-hidden="true" />
          </Link>
          <nav className="nav-main" aria-label="Principal">
            <ul className="nav-links">
              <li>
                <NavLink to="/" end>A ORYGEN</NavLink>
              </li>
              <li className="nav-sol" ref={solRef} onMouseEnter={onEnter} onMouseLeave={onLeave} onBlur={onBlur}>
                <button
                  ref={btnRef}
                  type="button"
                  className={`nav-sol-btn${inSolutions ? " active" : ""}`}
                  aria-expanded={sol}
                  aria-controls="painel-solucoes"
                  onClick={onBtnClick}
                  onKeyDown={onBtnKey}
                >
                  Soluções
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div className="sol-panel" id="painel-solucoes" hidden={!sol} onKeyDown={onPanelKey}>
                  <div className="sol-grid">
                    {SOLUCOES.map((g) => (
                      <div key={g.area} className="sol-col">
                        <p className="sol-area" id={`sol-${g.area.split(" ")[1].toLowerCase()}`}><VerticalMark v={g.v} />{g.area}</p>
                        <ul aria-labelledby={`sol-${g.area.split(" ")[1].toLowerCase()}`}>
                          {g.links.map(([to, label, desc]) => (
                            <li key={to}>
                              <NavLink to={to} end>
                                <b>{label}</b>
                                <small>{desc}</small>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </nav>
          <Cta className="btn btn-line btn-sm nav-cta" />
          <button
            ref={menuBtnRef}
            type="button"
            className={`menu-btn${open ? " on" : ""}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="drawer"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </header>
      <nav className={`drawer${open ? " open" : ""}`} id="drawer" aria-label="Menu" ref={drawerRef} data-lenis-prevent="">
        <div className="drawer-in">
          <NavLink to="/" end className="dr-main">A ORYGEN</NavLink>
          {SOLUCOES.map((g) => (
            <div key={g.area} className="dr-group">
              <p className="sol-area"><VerticalMark v={g.v} />{g.area}</p>
              {g.links.map(([to, label]) => (
                <NavLink key={to} to={to} end>{label}</NavLink>
              ))}
            </div>
          ))}
          <Cta className="btn btn-solid" onClick={() => setOpen(false)} />
        </div>
      </nav>
    </>
  );
}
