/*
  "Vida" do site (v7): camadas de movimento que respondem ao visitante e ao tempo,
  sem mudar estrutura, conteúdo nem paleta.

  1. lanterna  — um brilho suave segue o cursor sobre os fundos escuros (mix-blend screen: invisível no branco)
  2. holofote  — cartões recebem um foco de luz no ponto onde o cursor está
  3. ímã       — botões principais se inclinam levemente na direção do cursor
  4. inclinação— ilustrações dos topos acompanham o cursor em 3D, bem discreto
  5. progresso — fio no cabeçalho mostra quanto da página já foi lida
  Tudo desligado para quem prefere menos movimento ou usa toque.
*/

export function startLife({ reduce }) {
  if (reduce || typeof window === "undefined") return () => {};
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const offs = [];

  /* ---- 5. progresso de leitura (também no toque) ---- */
  const nav = document.querySelector(".nav");
  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      nav?.style.setProperty("--sp", p.toFixed(4));
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  offs.push(() => window.removeEventListener("scroll", onScroll));

  if (!fine) return () => offs.forEach((f) => f());

  /* ---- 1. lanterna ---- */
  const glow = document.createElement("div");
  glow.className = "lanterna";
  glow.setAttribute("aria-hidden", "true");
  document.body.appendChild(glow);
  let gx = window.innerWidth / 2;
  let gy = window.innerHeight / 2;
  let tx = gx;
  let ty = gy;
  let seen = false;
  let gl = 0;
  const glowTick = () => {
    gx += (tx - gx) * 0.12;
    gy += (ty - gy) * 0.12;
    glow.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, 0) translate(-50%, -50%)`;
    if (Math.abs(tx - gx) > 0.3 || Math.abs(ty - gy) > 0.3) gl = requestAnimationFrame(glowTick);
    else gl = 0;
  };

  /* ---- 2. holofote nos cartões ---- */
  const CARD = ".tile, .path, .role, .escrow, .need, .stack-card, .form-card, .reforma";

  /* ---- 3. ímã nos botões ---- */
  const MAG = ".ctas .btn, .nav .btn, .form-foot .btn, .tile-cta .btn";
  let magEl = null;

  /* ---- 4. inclinação das ilustrações ---- */
  const TILT = ".page-hero-visual, .hero-mark-box, .stack-fig, .wl-stage";

  const onMove = (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!seen) {
      seen = true;
      gx = tx;
      gy = ty;
      glow.classList.add("on");
    }
    if (!gl) gl = requestAnimationFrame(glowTick);

    const card = e.target.closest?.(CARD);
    if (card) {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }

    const btn = e.target.closest?.(MAG);
    if (btn !== magEl) {
      if (magEl) magEl.style.transform = "";
      magEl = btn;
    }
    if (btn) {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      btn.style.transform = `translate(${(dx * 6).toFixed(1)}px, ${(dy * 6).toFixed(1)}px)`;
    }

    const tilt = e.target.closest?.(TILT);
    if (tilt) {
      const r = tilt.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      tilt.style.setProperty("--rx", `${(-dy * 4).toFixed(2)}deg`);
      tilt.style.setProperty("--ry", `${(dx * 5).toFixed(2)}deg`);
      tilt.classList.add("tilting");
    }
  };
  const onOut = (e) => {
    const t = e.target;
    if (t.closest?.(TILT) && !t.closest(TILT).contains(e.relatedTarget)) {
      const el = t.closest(TILT);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.classList.remove("tilting");
    }
    if (magEl && !magEl.contains(e.relatedTarget)) {
      magEl.style.transform = "";
      magEl = null;
    }
  };
  const onLeave = () => glow.classList.remove("on");
  const onEnter = () => seen && glow.classList.add("on");
  document.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerout", onOut, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);
  document.documentElement.addEventListener("mouseenter", onEnter);
  offs.push(() => {
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerout", onOut);
    document.documentElement.removeEventListener("mouseleave", onLeave);
    document.documentElement.removeEventListener("mouseenter", onEnter);
    cancelAnimationFrame(gl);
    glow.remove();
  });

  return () => offs.forEach((f) => f());
}
