// Conta, no servidor do Cloudflare, os carregamentos dos arquivos de projetos/.
// Guarda só: qual site carregou (domínio), qual arquivo e a data/hora (UTC).
// Nada sobre quem visita (IP, navegador, cookies) é guardado.
// Sem o banco ligado (binding DB) ou com erro, o arquivo é entregue normalmente.

export async function onRequestGet(context) {
    const resposta = await context.next();

    // 200 = baixou o arquivo; 304 = o navegador já tinha e só conferiu (também é um carregamento)
    const carregou = resposta.status === 200 || resposta.status === 304;
    if (carregou && context.env.DB) {
        context.waitUntil(registrar(context.request, context.env.DB).catch(() => {}));
    }
    return resposta;
}

async function registrar(request, db) {
    const url = new URL(request.url);
    const site = siteDeOrigem(request.headers.get('Referer'));

    // Exemplos abertos no próprio domínio (projetos.html) não contam
    if (site === url.host) return;

    await db
        .prepare('INSERT INTO carregamentos (quando, arquivo, site) VALUES (?, ?, ?)')
        .bind(new Date().toISOString(), url.pathname, site)
        .run();
}

// O navegador informa de qual site veio o pedido; guardamos só o domínio
function siteDeOrigem(referer) {
    if (!referer) return null;
    try {
        return new URL(referer).host;
    } catch (e) {
        return null;
    }
}
