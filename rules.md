# Regras: o que pode manchar o domínio

Todo arquivo em `projetos/` roda dentro dos sites dos clientes. Se o Google Safe Browsing, um antivírus, um firewall ou uma lista de bloqueio marcar o domínio, o problema chega a **todos os clientes ao mesmo tempo**: aviso vermelho no navegador, script bloqueado e, às vezes, o domínio inteiro bloqueado (inclusive e-mail).

Nada nesta lista entra em script ou página publicada, nem "só para testar".

**A que se aplica:**
- Seções 1 a 6: aos scripts injetados nos sites (`projetos/**`). São as regras mais rígidas.
- Seção 7: a tudo que é publicado no domínio, inclusive a página inicial.
- Exceções declaradas: as páginas `index.html` e `projetos.html` carregam fontes do Google Fonts, e o `projetos.html` consulta a API pública do GitHub para listar os arquivos. Nenhum script de terceiro entra em nenhuma página.

## 1. Código com cara de malware

- **Ofuscação:** nada de código ofuscado, embaralhado ou em base64 para esconder o que faz. Código legível é proteção.
- **Execução de texto como código:** proibido `eval`, `new Function`, `setTimeout`/`setInterval` com string e `document.write`.
- **Código remoto:** não carregar código de outros domínios em tempo de execução (outros scripts, iframes de terceiros, WebAssembly desconhecido). Única exceção: o `footer_cjc.js` legado carrega o próprio footer do Davi, de `recursos.cjc.pics` ou do jsDelivr deste repositório.
- **Mineração:** nada de mineração de criptomoeda nem uso pesado de CPU em segundo plano.

## 2. Redirecionar ou prender o visitante

- **Navegação forçada:** não mudar `location`, não usar `meta refresh` e não redirecionar o visitante para lugar nenhum.
- **Janelas sem clique:** não abrir pop-up, pop-under ou `window.open` sem um clique real do usuário.
- **Controle do navegador:** não mexer no botão voltar (`history`), não bloquear saída da página e não usar `beforeunload` para segurar o visitante.
- **Iframes ocultos:** proibidos.

## 3. Conteúdo enganoso, anúncio e spam

- **Anúncios e afiliados:** nada de anúncios, links de afiliado ou banners de terceiros.
- **Links escondidos para SEO:** não injetar links ou texto oculto apontando para outros sites. O Google trata isso como site invadido.
- **Alertas falsos:** nada de "seu computador está infectado", "atualize seu navegador", prêmios, contagem regressiva falsa ou botões de download falsos.
- **Imitações:** não imitar janelas do sistema, do navegador, de bancos ou de outras marcas.
- **Notificações:** não pedir permissão de notificação, localização, câmera ou microfone.

## 4. Dados do visitante

- **Formulários:** não ler o que o visitante digita (campos de formulário, senhas, cartões) nem capturar teclas.
- **Envio de dados:** não mandar nenhum dado para fora (`fetch`, `XMLHttpRequest`, `sendBeacon`, pixels, imagens de rastreio).
- **Armazenamento e identificação:** não ler nem gravar cookies, `localStorage` ou `sessionStorage` do cliente, e não fazer fingerprinting (canvas, fontes, hardware) para identificar pessoas.
- **Scripts de terceiros:** não embutir analytics, pixels ou SDKs de terceiros dentro dos scripts do CDN.
- **Coleta combinada com o cliente:** se um dia um script precisar coletar dados, isso é outro projeto. Precisa de acordo com o cliente, aviso de privacidade e consentimento (LGPD). Nunca de forma silenciosa.

## 5. Downloads e arquivos

- **Download automático:** não iniciar download sozinho.
- **Arquivos executáveis:** não hospedar `.exe`, `.apk`, `.msi`, `.bat`, `.zip` ou `.rar` no domínio do CDN.
- **Arquivos de terceiros:** não publicar arquivos enviados por clientes ou parceiros sem revisar linha por linha.
- **Páginas de terceiros:** não hospedar páginas HTML de terceiros, formulários de login ou de pagamento. É assim que domínios viram "phishing".

## 6. Atrapalhar o site do cliente

- **Sobreposições:** não cobrir o conteúdo com overlays de tela inteira e não abrir nada sem ação do visitante.
- **Alterações no site:** não alterar links, textos, formulários ou botões do site do cliente.
- **Comportamento da página:** não bloquear clique direito, seleção de texto ou rolagem.
- **CSS global:** não injetar CSS que vaze para a página. Todo visual fica dentro do Shadow DOM.
- **Desempenho:** não travar a página (loops pesados, timers rápidos, animações sem fim na página do cliente).

## 7. Conteúdo do domínio

- **Temas proibidos:** nada de conteúdo adulto, apostas, "ganhe dinheiro fácil" ou cripto promocional em nenhuma página do domínio.
- **Segredos:** nunca colocar chaves, tokens ou senhas em arquivos publicados.

## O que é permitido (o footer atual segue isso)

- Mostrar o crédito de quem fez o site, discreto, isolado em Shadow DOM.
- Ler a cor de fundo **localmente** para escolher o tema, sem enviar nada para fora.
- Contar carregamentos **no servidor** (`functions/`), a partir do pedido que o navegador já faz: só domínio do site, arquivo e data/hora. O script em si continua sem enviar nada.
- Links que só abrem com clique do visitante, em nova aba, com `rel="noopener"`.
- JavaScript puro, sem dependências, legível e pequeno.

## Antes de publicar qualquer script novo ou alteração

1. O script faz só o que a página inicial do domínio diz que ele faz?
2. Passou pela lista acima, item por item?
3. Não faz nenhuma requisição de rede? Num site de teste, a aba Network do DevTools deve mostrar só o próprio arquivo do script.
4. Foi testado em `teste/index.html` em fundo claro, escuro e com foto?
5. Para mudança grande: foi publicado como arquivo novo (`v2`) em vez de sobrescrever o que os clientes usam?

## Proteção da conta (o maior risco real é invasão)

- Verificação em duas etapas no GitHub e no Cloudflare.
- Renovação automática do domínio ligada.
- Domínio cadastrado no Google Search Console, para receber alerta se for marcado.
- Revisar o diff antes de todo push em `main`, porque o push publica direto.
