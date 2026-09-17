# FooterDavicjc

Scripts e arquivos que o davicjc coloca nos sites dos clientes (hoje: o footer de assinatura), publicados em https://recursos.cjc.pics/ pelo Cloudflare Pages a partir deste repositório.

## Regras obrigatórias para scripts e páginas publicadas

@rules.md

## Estrutura

```
index.html                       ← página do domínio: explica o que é para quem chega pelo código de um site
projetos.html                    ← lista automática (via API do GitHub) de tudo em projetos/, com link, tag e popup "Ver exemplo"
assets/                          ← arquivos das páginas: index.css/js, projetos.css/js, favicon.svg e fundo.mp4 (vídeo do cjc.pics)
projetos/                        ← uma subpasta por projeto
  footer-davi/footer.js          ← footer "by davicjc" (fonte da verdade do código)
  footer-terceiros/
    _gerar.js                    ← gera os footers de parceria; a lista de parceiros fica nele
    <parceiro>.js                ← footers de parceria, GERADOS a partir do footer-davi
teste/index.html                 ← teste com sites simulados
footer_cjc.js                    ← LEGADO, ver abaixo
README.md · CLAUDE.md · rules.md · .gitignore · .gitattributes
```

A raiz inteira é publicada (Cloudflare Pages com diretório de saída na raiz). Não colocar nada sensível no repositório.

## Cuidados

- **Commit e push:** nunca fazer sem o Davi pedir. Todo push em `main` publica.
- **Legado:** `footer_cjc.js` na raiz é o footer antigo, carregado por sites antigos via `cdn.jsdelivr.net/gh/davicjc/FooterDavicjc@main/footer_cjc.js`. Não se sabe quais sites ainda usam, então não apagar, mover nem renomear. Qualquer alteração nele chega a esses sites no push.
- **Onde editar o footer:** só em `projetos/footer-davi/footer.js`. Depois, rodar `node projetos/footer-terceiros/_gerar.js`. Nunca editar `footer-terceiros/<parceiro>.js` à mão. Novo parceiro: adicionar em `PARCEIROS` no `_gerar.js` (Davicjc sempre primeiro).
- **Projeto novo:** criar uma subpasta em `projetos/`.
- **Arquivos internos:** o que começa com `_` (ou `.`) dentro de `projetos/` não aparece no `projetos.html`. Use isso para ferramentas e rascunhos. Todo o resto aparece como algo para colar nos sites.
- **Mudança grande em script que clientes já usam:** criar arquivo novo (ex.: `v2`) em vez de sobrescrever.
- **Estilo dos scripts:** JavaScript puro, sem dependências nem build, visual dentro de Shadow DOM, código legível (sem minificar ou ofuscar). Textos com acento visíveis ao usuário usam escape unicode no código (ex.: `portf\u00f3lio`), para não quebrar em site com codificação antiga.
- **Verificação antes de entregar:**
  - `node --check` nos scripts.
  - Abrir `teste/index.html` no Chrome headless e olhar o screenshot. O botão "Abrir todos os cards" ou `#cards` na URL abre os cards.
  - O Chrome headless não aceita janela estreita. Para testar celular, carregar a página dentro de iframes do tamanho da tela.
  - Com `--virtual-time-budget`, páginas com animação CSS contínua (index.html, projetos.html) quase não geram quadros, e o IntersectionObserver do footer não roda: o selo fica "unknown" só no teste. Nesses casos, testar em tempo real via DevTools Protocol (`--remote-debugging-port`).
