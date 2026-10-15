import { useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import config from "../config.js";

/*
  O manifesto (61 s, com narração). Nunca toca sozinho: a capa tem um movimento leve e silencioso,
  e o filme só começa quando a pessoa aperta o play, com som.
  Para hospedar fora (Vimeo/YouTube), preencha config.manifesto.embed com o link de incorporação;
  sem ele, o site usa o arquivo em public/video/manifesto.mp4.
*/
const base = import.meta.env.BASE_URL;

export default function Manifesto() {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const video = useRef(null);
  const embed = config.manifesto?.embed;

  const play = () => {
    setPlaying(true);
    requestAnimationFrame(() => video.current?.play?.());
  };

  return (
    <section className="sec dark manif" id="manifesto" aria-labelledby="manifesto-t">
      <div className="wrap">
        <div className="manif-head">
          <div>
            <p className="eyebrow" data-reveal="">O manifesto</p>
            <h2 id="manifesto-t" className="h2 tw" data-reveal="">
              <span className="w-b">Antes da primeira conta,</span> <span className="w-l">existe uma origem.</span>
            </h2>
          </div>
          <p className="lede" data-reveal="">Um minuto sobre o que a ORYGEN acredita e o que entrega: a base de quem pensa grande.</p>
        </div>

        <div className="manif-wrap" data-reveal="">
        <div className={`manif-player${playing ? " playing" : ""}`}>
          {!playing && (
            <>
              {reduce ? (
                <img className="manif-cover" src={`${base}video/poster.jpg`} alt="" />
              ) : (
                <video className="manif-cover" poster={`${base}video/poster.jpg`} muted loop playsInline autoPlay aria-hidden="true">
                  <source src={`${base}video/capa-loop.mp4`} type="video/mp4" />
                  <source src={`${base}video/capa-loop.webm`} type="video/webm" />
                </video>
              )}
              <div className="manif-shade" aria-hidden="true" />
              <button type="button" className="manif-play" onClick={play} aria-label="Assistir ao manifesto da ORYGEN (1 minuto, com som)">
                <span className="manif-ring" aria-hidden="true" />
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6.5v11l9-5.5z" /></svg>
                <b>Assistir ao manifesto</b>
                <small>1 min · com som</small>
              </button>
            </>
          )}
          {playing && embed && (
            <iframe className="manif-embed" src={embed} title="Manifesto ORYGEN" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          )}
          {playing && !embed && (
            <video ref={video} className="manif-video" poster={`${base}video/poster.jpg`} controls playsInline preload="auto" onEnded={() => setPlaying(false)}>
              <source src={`${base}video/manifesto.mp4`} type="video/mp4" />
              <source src={`${base}video/manifesto.webm`} type="video/webm" />
            </video>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
