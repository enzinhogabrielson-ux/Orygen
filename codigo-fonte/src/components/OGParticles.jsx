import { useEffect, useRef } from "react";
import { BufferAttribute, BufferGeometry, NormalBlending, PerspectiveCamera, Points, Scene, ShaderMaterial, WebGLRenderer } from "three";

/*
  Símbolo OG em partículas (WebGL), em tom sóbrio.
  - Abertura: as partículas, já próximas do lugar, assentam no símbolo (~2 s).
  - Repouso: respiração mínima. Monocromático (lavanda → branco), mistura normal, sem brilho e sem cursor.
  - Rolagem (progress 0→1): o símbolo vai ao centro, gira devagar e se separa em 3 camadas de profundidade
    (a ideia das "camadas" da plataforma), ficando mais discreto atrás da frase do topo.
  - Movimento reduzido: um único quadro parado.
  O lugar e o tamanho do símbolo vêm da caixa `anchorRef` (layout definido no CSS).
*/

const LAYERS = 3; // três camadas, como a plataforma

const VERT = /* glsl */ `
  attribute vec3 aTarget;
  attribute vec3 aOffset;
  attribute float aSeed;
  attribute float aEdge;
  attribute float aLayer;
  uniform float uTime, uIntro, uScroll, uPix, uSize;
  varying float vA, vEdge;

  float easeOut(float t){ return 1. - pow(1. - t, 3.); }

  void main(){
    float d = clamp((uIntro - aSeed * 0.35) / 0.65, 0., 1.);
    float k = easeOut(d);
    vec3 p = aTarget + aOffset * (1. - k);

    float t = uTime * 0.35 + aSeed * 30.;
    p += vec3(sin(t), cos(t * 1.2), sin(t * 0.8)) * vec3(0.0035, 0.0035, 0.012);

    // rolagem: separa em camadas paralelas de profundidade
    float s = uScroll;
    float L = aLayer / ${(LAYERS - 1).toFixed(1)} - 0.5;      // -0.5 … 0.5
    p.z += L * s * 2.0 + (aSeed - 0.5) * s * 0.1;
    p.xy *= 1.0 + s * (0.08 + (0.5 - L) * 0.22);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.8 + aEdge * 0.35) * uPix * (3.2 / -mv.z);
    // camadas de trás ficam mais apagadas conforme se abrem
    vA = k * (1.0 - s * (0.2 + (0.5 - L) * 0.4));
    vEdge = aEdge;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying float vA, vEdge;
  void main(){
    float r = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.32, r);
    vec3 col = mix(vec3(0.725, 0.776, 1.0), vec3(1.0), vEdge * 0.6);
    gl_FragColor = vec4(col, a * vA * (0.5 + vEdge * 0.4));
  }
`;

const smooth = (t) => t * t * (3 - 2 * t);

export default function OGParticles({ progressRef, anchorRef, reduce }) {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const hero = el.closest(".hero");
    const fail = () => hero?.classList.add("no-gl");
    let renderer;
    try {
      renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    } catch {
      fail();
      return;
    }
    let alive = true;
    let ready = false;
    let raf = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(DPR);
    el.appendChild(renderer.domElement);
    const onLost = (e) => {
      e.preventDefault();
      alive = false;
      cancelAnimationFrame(raf);
      fail();
    };
    renderer.domElement.addEventListener("webglcontextlost", onLost);

    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const uniforms = {
      uTime: { value: 0 },
      uIntro: { value: reduce ? 1 : 0 },
      uScroll: { value: 0 },
      uPix: { value: DPR },
      uSize: { value: 2.8 },
    };

    const geo = new BufferGeometry();
    const mat = new ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true, depthWrite: false, blending: NormalBlending });
    const points = new Points(geo, mat);
    scene.add(points);

    // posição/escala "de repouso" (na caixa do layout) e "de palco" (centro, durante a rolagem)
    const rest = { x: 0, y: 0, s: 1 };
    const stage = { s: 1 };
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const visH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const visW = visH * camera.aspect;
      const c = el.getBoundingClientRect();
      const a = anchorRef?.current?.getBoundingClientRect();
      if (a && a.width) {
        rest.x = ((a.left + a.width / 2 - c.left) / w - 0.5) * visW;
        rest.y = -((a.top + a.height / 2 - c.top) / h - 0.5) * visH;
        rest.s = Math.min(((a.width / w) * visW * 0.88) / 3.72, ((a.height / h) * visH * 0.8) / 2);
      }
      stage.s = w < 720 ? Math.min((visW * 0.7) / 3.72, (visH * 0.3) / 2) : Math.min((visW * 0.42) / 3.72, (visH * 0.36) / 2);
      uniforms.uSize.value = w < 520 ? 2.3 : 2.8;
      place(uniforms.uScroll.value);
      if (ready && (reduce || !raf)) renderer.render(scene, camera);
    };
    function place(s) {
      const e = smooth(Math.min(1, s * 1.4));
      points.position.set(rest.x * (1 - e), rest.y * (1 - e), 0);
      points.scale.setScalar(rest.s + (stage.s - rest.s) * e);
      points.rotation.y = -s * 0.6;
      points.rotation.x = -s * 0.3;
    }
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    if (anchorRef?.current) ro.observe(anchorRef.current);

    fetch(`${import.meta.env.BASE_URL}data/og_points.json`)
      .then((r) => r.json())
      .then((pts) => {
        if (!alive) return;
        const n = pts.length;
        const target = new Float32Array(n * 3), offset = new Float32Array(n * 3);
        const seed = new Float32Array(n), edge = new Float32Array(n), layer = new Float32Array(n);
        for (let i = 0; i < n; i++) {
          const [x, y, e] = pts[i];
          target[i * 3] = x; target[i * 3 + 1] = y; target[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
          const a = Math.random() * Math.PI * 2, rr = 0.08 + Math.random() * 0.22;
          offset[i * 3] = Math.cos(a) * rr; offset[i * 3 + 1] = Math.sin(a) * rr; offset[i * 3 + 2] = 0.3 + Math.random() * 0.6;
          seed[i] = Math.random();
          edge[i] = e;
          layer[i] = Math.floor(Math.random() * LAYERS);
        }
        geo.setAttribute("position", new BufferAttribute(target, 3));
        geo.setAttribute("aTarget", new BufferAttribute(target, 3));
        geo.setAttribute("aOffset", new BufferAttribute(offset, 3));
        geo.setAttribute("aSeed", new BufferAttribute(seed, 1));
        geo.setAttribute("aEdge", new BufferAttribute(edge, 1));
        geo.setAttribute("aLayer", new BufferAttribute(layer, 1));
        ready = true;
        el.classList.add("ready");
        resize();
        if (reduce) renderer.render(scene, camera);
        else loop();
      })
      .catch(fail);

    const t0 = performance.now();
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && alive && ready && !reduce && !raf) loop();
    });
    io.observe(el);

    function loop() {
      raf = 0;
      if (!alive || !visible || document.hidden) return;
      const t = (performance.now() - t0) / 1000;
      uniforms.uTime.value = t;
      uniforms.uIntro.value = Math.min(1, Math.max(0, (t - 0.2) / 2.2));
      const p = progressRef?.current ?? 0;
      uniforms.uScroll.value += (p - uniforms.uScroll.value) * 0.1;
      place(uniforms.uScroll.value);
      points.rotation.y += Math.sin(t * 0.1) * 0.06;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    const onVis = () => {
      if (!document.hidden && alive && ready && !reduce && !raf) loop();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      renderer.domElement.remove();
    };
  }, [progressRef, anchorRef, reduce]);

  return <div className="og-gl" ref={host} aria-hidden="true" />;
}
