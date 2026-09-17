// Página de projetos: busca no GitHub os arquivos da pasta projetos/
// e mostra, para cada um, o link e a tag HTML prontos para copiar,
// além de um exemplo funcionando num popup.
// Arquivos ou pastas que começam com "_" ou "." são internos e não aparecem.

const DOMINIO = 'https://recursos.cjc.pics/';
const REPO = 'davicjc/FooterDavicjc';
const BRANCH = 'main';
const PASTA = 'projetos/';

// Tag pronta conforme a extensão do arquivo
const TIPOS = [
  { nome: 'script', ext: ['js', 'mjs'], tag: (url) => `<script src="${url}" defer></script>` },
  { nome: 'css', ext: ['css'], tag: (url) => `<link rel="stylesheet" href="${url}">` },
  { nome: 'imagem', ext: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'avif', 'ico'], tag: (url, arq) => `<img src="${url}" alt="${arq.base}" loading="lazy">` },
  { nome: 'vídeo', ext: ['mp4', 'webm', 'mov', 'ogv'], tag: (url) => `<video src="${url}" autoplay muted loop playsinline></video>` },
  { nome: 'áudio', ext: ['mp3', 'wav', 'ogg', 'm4a'], tag: (url) => `<audio src="${url}" controls></audio>` },
  { nome: 'fonte', ext: ['woff2', 'woff', 'ttf', 'otf'], tag: (url, arq) => `<style>@font-face { font-family: "${arq.base}"; src: url("${url}"); }</style>` }
];
const OUTRO = { nome: 'arquivo', tag: (url, arq) => `<a href="${url}" target="_blank" rel="noopener">${arq.nome}</a>` };

const lista = document.getElementById('lista');
const statusTexto = document.getElementById('status-texto');
document.getElementById('ano').textContent = new Date().getFullYear();

carregar();

async function carregar() {
  statusTexto.textContent = 'carregando';
  lista.replaceChildren(aviso('Buscando arquivos no GitHub...'));

  try {
    const resposta = await fetch(`https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (resposta.status === 403 || resposta.status === 429) throw new Error('limite');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);

    const dados = await resposta.json();
    const arquivos = dados.tree
      .filter((item) => item.type === 'blob' && item.path.startsWith(PASTA))
      .filter((item) => !item.path.split('/').some((parte) => parte.startsWith('_') || parte.startsWith('.')))
      .map(descrever);

    mostrar(arquivos);
  } catch (erro) {
    statusTexto.textContent = 'erro';
    const texto = erro.message === 'limite'
      ? 'O GitHub limitou as consultas por agora. Tente de novo em alguns minutos.'
      : 'Não foi possível ler a lista no GitHub (' + erro.message + ').';
    const caixa = aviso(texto);
    const botao = el('button', 'btn', 'Tentar de novo');
    botao.type = 'button';
    botao.addEventListener('click', carregar);
    caixa.append(botao);
    lista.replaceChildren(caixa);
  }
}

function descrever(item) {
  const relativo = item.path.slice(PASTA.length);
  const partes = relativo.split('/');
  const nome = partes[partes.length - 1];
  const ponto = nome.lastIndexOf('.');
  const ext = ponto > 0 ? nome.slice(ponto + 1).toLowerCase() : '';
  const tipo = TIPOS.find((t) => t.ext.includes(ext)) || OUTRO;
  const arquivo = {
    nome: nome,
    base: ponto > 0 ? nome.slice(0, ponto) : nome,
    ext: ext,
    grupo: partes.length > 1 ? partes[0] : 'geral',
    tamanho: item.size,
    tipo: tipo,
    url: DOMINIO + encodeURI(item.path),
    // Caminho relativo: funciona no domínio e abrindo a página no computador
    local: encodeURI(item.path)
  };
  arquivo.tag = tipo.tag(arquivo.url, arquivo);
  return arquivo;
}

function mostrar(arquivos) {
  statusTexto.textContent = arquivos.length + (arquivos.length === 1 ? ' arquivo' : ' arquivos');

  if (!arquivos.length) {
    lista.replaceChildren(aviso('Nenhum arquivo em projetos/ no GitHub ainda. Depois do push, eles aparecem aqui.'));
    return;
  }

  const grupos = new Map();
  arquivos.forEach((arq) => {
    if (!grupos.has(arq.grupo)) grupos.set(arq.grupo, []);
    grupos.get(arq.grupo).push(arq);
  });

  const secoes = [...grupos.entries()].map(([grupo, itens]) => {
    const secao = el('section', 'grupo');
    const titulo = el('h2', 'grupo-titulo', grupo);
    titulo.append(el('span', 'grupo-conta', String(itens.length)));
    secao.append(titulo, ...itens.map(cartao));
    return secao;
  });
  lista.replaceChildren(...secoes);
}

function cartao(arq) {
  const item = el('article', 'item');

  const info = el('div', 'info');
  const cabeca = el('div', 'cabeca');
  cabeca.append(
    el('span', 'nome', arq.nome),
    el('span', 'tipo', arq.tipo.nome),
    el('span', 'peso', tamanho(arq.tamanho)),
    arq.tipo === OUTRO ? linkAbrir(arq) : botaoExemplo(arq)
  );
  info.append(cabeca, campo('Link', arq.url), campo('HTML', arq.tag));

  item.append(miniatura(arq), info);
  return item;
}

function botaoExemplo(arq) {
  const botao = el('button', 'exemplo', 'Ver exemplo');
  botao.type = 'button';
  botao.addEventListener('click', () => abrirExemplo(arq));
  return botao;
}

function linkAbrir(arq) {
  const link = el('a', 'exemplo', 'Abrir');
  link.href = arq.local;
  link.target = '_blank';
  link.rel = 'noopener';
  return link;
}

function miniatura(arq) {
  const caixa = el('div', 'thumb');
  const rotulo = () => {
    caixa.classList.remove('midia');
    caixa.replaceChildren(el('span', 'thumb-ext', arq.ext ? '.' + arq.ext : 'arq'));
  };

  if (arq.tipo.nome === 'imagem' || arq.tipo.nome === 'vídeo') caixa.classList.add('midia');

  if (arq.tipo.nome === 'imagem') {
    const img = document.createElement('img');
    img.src = arq.local;
    img.alt = '';
    img.loading = 'lazy';
    img.addEventListener('error', rotulo);
    caixa.append(img);
  } else if (arq.tipo.nome === 'vídeo') {
    const video = document.createElement('video');
    video.src = arq.local;
    video.muted = true;
    video.preload = 'metadata';
    video.addEventListener('error', rotulo);
    caixa.append(video);
  } else {
    rotulo();
  }

  if (arq.tipo !== OUTRO) {
    caixa.classList.add('clicavel');
    caixa.addEventListener('click', () => abrirExemplo(arq));
  }
  return caixa;
}

function campo(rotulo, valor) {
  const linha = el('div', 'campo');
  const botao = el('button', 'copiar', 'Copiar');
  botao.type = 'button';
  botao.setAttribute('aria-label', 'Copiar ' + rotulo.toLowerCase());
  botao.addEventListener('click', () => copiar(valor, botao));
  linha.append(el('span', 'rotulo', rotulo), el('code', 'valor', valor), botao);
  return linha;
}

async function copiar(texto, botao) {
  try {
    await navigator.clipboard.writeText(texto);
  } catch (e) {
    // Sem permissão de área de transferência (ex.: página aberta localmente)
    const area = document.createElement('textarea');
    area.value = texto;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  botao.textContent = 'Copiado';
  botao.classList.add('ok');
  setTimeout(() => {
    botao.textContent = 'Copiar';
    botao.classList.remove('ok');
  }, 1600);
}

// ---------------- Popup de exemplo ----------------

const modal = document.getElementById('exemplo');
const modalTitulo = document.getElementById('exemplo-titulo');
const modalTipo = document.getElementById('exemplo-tipo');
const modalFundos = document.getElementById('exemplo-fundos');
const palco = document.getElementById('exemplo-palco');
const dica = document.getElementById('exemplo-dica');
let exemploAtual = null;

const DICAS = {
  script: 'Site de exemplo carregando este script. Interaja como num site de verdade.',
  css: 'Página de exemplo com elementos comuns usando este CSS.',
  imagem: 'Imagem ajustada ao tamanho da janela.',
  'vídeo': 'Vídeo tocando sem som. Use os controles para ouvir.',
  'áudio': 'Use o player para ouvir.',
  fonte: 'Textos de exemplo usando esta fonte.'
};

// "Foto" em SVG para simular um site com imagem de fundo
const FOTO = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">' +
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#0ea5e9"/><stop offset="1" stop-color="#f97316"/></linearGradient></defs>' +
  '<rect width="1200" height="800" fill="url(#g)"/>' +
  '<circle cx="1000" cy="720" r="300" fill="#fde68a" opacity=".85"/>' +
  '<circle cx="180" cy="140" r="240" fill="#1e3a8a" opacity=".55"/></svg>'
);

const FUNDOS = {
  escuro: 'body{background:#0f172a;color:#e2e8f0}header{background:#1e293b}.btn{background:#e2e8f0;color:#0f172a}footer{background:#0b1222;color:#94a3b8}',
  claro: 'body{background:#fafafa;color:#18181b}header{background:#e4e4e7}.btn{background:#18181b;color:#fafafa}footer{background:#f4f4f5;color:#52525b}',
  foto: 'body{background:#0b1220 url("' + FOTO + '") center/cover;color:#fff}header{background:rgba(0,0,0,.28)}.btn{background:#fff;color:#111}footer{color:#fff}'
};

document.getElementById('exemplo-fechar').addEventListener('click', () => modal.close());
// Clique fora da caixa (no fundo escurecido) fecha
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});
// Ao fechar, tira o exemplo da página (para vídeo e scripts pararem)
modal.addEventListener('close', () => {
  palco.replaceChildren();
  exemploAtual = null;
});
modalFundos.querySelectorAll('button').forEach((botao) => {
  botao.addEventListener('click', () => mostrarFundo(botao.dataset.fundo));
});

function abrirExemplo(arq) {
  exemploAtual = arq;
  modalTitulo.textContent = arq.nome;
  modalTipo.textContent = arq.tipo.nome;
  dica.textContent = DICAS[arq.tipo.nome] || '';

  const ehScript = arq.tipo.nome === 'script';
  modalFundos.hidden = !ehScript;

  // Abre antes de montar o exemplo: o script precisa carregar já visível
  // para enxergar o fundo do site de exemplo
  if (!modal.open) modal.showModal();

  if (ehScript) {
    mostrarFundo('escuro');
  } else {
    palco.replaceChildren(conteudoExemplo(arq));
  }
}

function mostrarFundo(fundo) {
  if (!exemploAtual) return;
  modalFundos.querySelectorAll('button').forEach((botao) => {
    botao.setAttribute('aria-pressed', String(botao.dataset.fundo === fundo));
  });
  const script = '<script src="' + exemploAtual.local + '" defer></script>';
  palco.replaceChildren(quadro(siteExemplo(fundo, script), exemploAtual));
}

function conteudoExemplo(arq) {
  if (arq.tipo.nome === 'imagem') {
    const img = document.createElement('img');
    img.src = arq.local;
    img.alt = arq.nome;
    return img;
  }
  if (arq.tipo.nome === 'vídeo') {
    const video = document.createElement('video');
    video.src = arq.local;
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    return video;
  }
  if (arq.tipo.nome === 'áudio') {
    const audio = document.createElement('audio');
    audio.src = arq.local;
    audio.controls = true;
    return audio;
  }
  if (arq.tipo.nome === 'css') return quadro(paginaCss(arq), arq);
  return quadro(paginaFonte(arq), arq);
}

function quadro(html, arq) {
  const iframe = document.createElement('iframe');
  iframe.title = 'Exemplo de ' + arq.nome;
  iframe.srcdoc = html;
  return iframe;
}

function siteExemplo(fundo, extra) {
  return '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1"><style>' +
    'html,body{margin:0;min-height:100%}' +
    'body{display:flex;flex-direction:column;min-height:100vh;font-family:system-ui,-apple-system,sans-serif}' +
    'header{display:flex;justify-content:space-between;align-items:center;padding:14px 22px;font-weight:600}' +
    'nav{display:flex;gap:18px;font-size:14px;font-weight:400;opacity:.8}' +
    'main{flex:1;display:flex;flex-direction:column;justify-content:center;padding:32px 22px;max-width:560px}' +
    'h1{margin:0 0 10px;font-size:34px;line-height:1.1}p{margin:0 0 22px;line-height:1.55;opacity:.8}' +
    '.btn{align-self:flex-start;padding:10px 18px;border-radius:8px;font-weight:600;text-decoration:none}' +
    'footer{padding:18px 22px;font-size:13px}' +
    '@media (max-width:480px){nav{display:none}h1{font-size:26px}}' +
    FUNDOS[fundo] +
    '</style></head><body>' +
    '<header><span>Empresa Exemplo</span><nav><span>Início</span><span>Serviços</span><span>Contato</span></nav></header>' +
    '<main><h1>Um site de cliente</h1>' +
    '<p>Esta página é só um exemplo para ver o arquivo funcionando como num site de verdade.</p>' +
    '<a class="btn" href="#">Fale conosco</a></main>' +
    '<footer>© 2026 Empresa Exemplo</footer>' +
    extra +
    '</body></html>';
}

function paginaCss(arq) {
  return '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8">' +
    '<link rel="stylesheet" href="' + arq.local + '"></head><body>' +
    '<header><nav><a href="#">Início</a> <a href="#">Serviços</a> <a href="#">Contato</a></nav></header>' +
    '<main><h1>Título principal</h1><h2>Subtítulo</h2>' +
    '<p>Parágrafo de exemplo com <a href="#">um link</a> e <strong>um destaque</strong>.</p>' +
    '<ul><li>Item de lista</li><li>Outro item</li></ul>' +
    '<form><input placeholder="Seu e-mail"> <button type="button">Enviar</button></form></main>' +
    '<footer>Rodapé de exemplo</footer></body></html>';
}

function paginaFonte(arq) {
  return '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><style>' +
    '@font-face{font-family:"Previa";src:url("' + arq.local + '")}' +
    'body{margin:0;padding:28px;font-family:"Previa",serif;background:#fff;color:#111}' +
    'p{margin:0 0 16px;line-height:1.3}' +
    '</style></head><body>' +
    '<p style="font-size:56px">Aa Bb Cc</p>' +
    '<p style="font-size:30px">A rápida raposa marrom pula sobre o cão preguiçoso</p>' +
    '<p style="font-size:18px">0123456789 · áéíóú ãõ ç · ! ? &amp; @</p>' +
    '<p style="font-size:14px">Texto pequeno para ver a leitura em tamanho de parágrafo.</p>' +
    '</body></html>';
}

// ---------------- Utilitários ----------------

function aviso(texto) {
  return el('div', 'aviso', texto);
}

function tamanho(bytes) {
  if (bytes == null) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function el(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}
