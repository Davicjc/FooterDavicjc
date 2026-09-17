document.getElementById('ano').textContent = new Date().getFullYear();

// Mostra o domínio real em que a página está publicada
if (location.protocol.startsWith('http')) {
  document.querySelectorAll('.js-host').forEach((el) => { el.textContent = location.host; });
}

// ---- Loop do vídeo de fundo com crossfade (dois vídeos sobrepostos) ----
const FADE = 0.9;                                   // segundos do fade
document.documentElement.style.setProperty('--fade', FADE + 's');

const layers = [document.getElementById('vidA'), document.getElementById('vidB')];
let active = 0;
let armed = true;

const tryPlay = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
layers.forEach((v) => { v.muted = true; });
tryPlay(layers[0]);

function onTime() {
  const cur = layers[active];
  if (!armed || !cur.duration || isNaN(cur.duration)) return;

  // perto do fim, começa o outro vídeo e troca com fade
  if (cur.currentTime >= cur.duration - FADE) {
    armed = false;
    const nextIdx = active ^ 1;
    const next = layers[nextIdx];
    next.currentTime = 0;
    tryPlay(next);
    next.classList.add('show');
    cur.classList.remove('show');
    active = nextIdx;

    setTimeout(() => {
      cur.pause();
      cur.currentTime = 0;
      armed = true;
    }, FADE * 1000 + 80);
  }
}
layers.forEach((v) => v.addEventListener('timeupdate', onTime));

// se o navegador bloquear o autoplay, começa no primeiro toque/clique
['click', 'touchstart', 'keydown'].forEach((e) =>
  document.addEventListener(e, () => tryPlay(layers[active]), { once: true, passive: true })
);

// "Ver o selo" abre o card do selo do canto; some se o script não carregar
const verSelo = document.getElementById('ver-selo');
addEventListener('load', () => {
  const host = document.getElementById('davicjc-footer');
  const badge = host && host.shadowRoot && host.shadowRoot.querySelector('.badge');
  if (!badge) {
    verSelo.hidden = true;
    return;
  }
  verSelo.addEventListener('click', () => badge.click());
});
