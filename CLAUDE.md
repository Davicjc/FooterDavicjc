# FooterDavicjc

Scripts e arquivos que o davicjc coloca nos sites dos clientes (hoje: o footer de assinatura), publicados em https://footer.davicjc.com/ pelo Cloudflare Pages a partir deste repositório.

## Regras obrigatórias para scripts e páginas publicadas

@rules.md

## Estrutura

```
index.html                       ← página do domínio: explica o que é para quem chega pelo código de um site
projetos.html                    ← lista automática (via API do GitHub) de tudo em projetos/, com link, tag e popup "Ver exemplo"
assets/                          ← arquivos das páginas (index.css/js, projetos.css/js, favicon.svg, fundo.mp4) e gerar-parcerias.js (gera os footers de parceria)
projetos/                        ← uma subpasta por projeto
  footer-davi/footer_davicjc.js  ← footer "by davicjc" (fonte da verdade do código)
  footer-terceiros/
    <parceiro>.js                ← footers de parceria, GERADOS a partir do footer-davi
functions/projetos/[[caminho]].js ← Pages Function: conta carregamentos de projetos/ no D1 (binding DB)
teste/index.html                 ← teste com sites simulados
README.md · CLAUDE.md · rules.md · .gitignore · .gitattributes
```

A raiz inteira é publicada (Cloudflare Pages com diretório de saída na raiz). Não colocar nada sensível no repositório.

## Cuidados

- **Commit e push:** nunca fazer sem o Davi pedir. Todo push em `main` publica.
- **Endereço:** o único oficial é `https://footer.davicjc.com/`. O `recursos.cjc.pics` aponta para o mesmo Pages e fica ligado para quem já usa, mas não deve aparecer em código nem documentação nova. O antigo `footer_cjc.js` (jsDelivr) foi removido em 05/11/2026: não recriar.
- **Onde editar o footer:** só em `projetos/footer-davi/footer_davicjc.js`. Depois, rodar `node assets/gerar-parcerias.js`. Nunca editar `footer-terceiros/<parceiro>.js` à mão. Novo parceiro: adicionar em `PARCEIROS` no `assets/gerar-parcerias.js` (Davicjc sempre primeiro).
- **Projeto novo:** criar uma subpasta em `projetos/`. Em `projetos/` fica só o que vai nos sites dos clientes; ferramentas e arquivos de apoio vão em `assets/`.
- **Contador (`functions/`):** guarda só domínio do site de origem, arquivo e data/hora (UTC). Nunca guardar IP, user-agent, cookies ou a URL completa da página. A gravação roda em `waitUntil` e com `catch`: nunca pode atrasar nem quebrar a entrega do arquivo. Configuração do D1 e consultas no README.
- **Arquivos internos:** o que começa com `_` (ou `.`) dentro de `projetos/` não aparece no `projetos.html`. Use isso para ferramentas e rascunhos. Todo o resto aparece como algo para colar nos sites.
- **Mudança grande em script que clientes já usam:** criar arquivo novo (ex.: `v2`) em vez de sobrescrever.
- **Estilo dos scripts:** JavaScript puro, sem dependências nem build, visual dentro de Shadow DOM, código legível (sem minificar ou ofuscar). Textos com acento visíveis ao usuário usam escape unicode no código (ex.: `portf\u00f3lio`), para não quebrar em site com codificação antiga.
- **Verificação antes de entregar:**
  - `node --check` nos scripts.
  - Abrir `teste/index.html` no Chrome headless e olhar o screenshot. O botão "Abrir todos os cards" ou `#cards` na URL abre os cards.
  - O Chrome headless não aceita janela estreita. Para testar celular, carregar a página dentro de iframes do tamanho da tela.
  - Com `--virtual-time-budget`, páginas com animação CSS contínua (index.html, projetos.html) quase não geram quadros, e o IntersectionObserver do footer não roda: o selo fica "unknown" só no teste. Nesses casos, testar em tempo real via DevTools Protocol (`--remote-debugging-port`).
