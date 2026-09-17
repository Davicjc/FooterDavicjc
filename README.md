# FooterDavicjc

Scripts e arquivos do **davicjc** para os sites dos clientes, servidos em https://recursos.cjc.pics/ (Cloudflare Pages). Hoje: o footer de assinatura, que mostra `by davicjc` no canto do site e, ao clicar, abre um card com o portfólio.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | Página inicial do domínio: explica o que é para quem o encontra no código de um site |
| `projetos.html` | Lista automática de tudo em `projetos/`, com link e tag HTML prontos para copiar e um exemplo funcionando de cada arquivo |
| `assets/` | Arquivos das páginas: `index.css`, `index.js`, `projetos.css`, `projetos.js`, `favicon.svg` e `fundo.mp4` |
| `projetos/` | Uma subpasta por projeto. Arquivos e pastas com `_` no início são internos e não aparecem no `projetos.html` |
| `projetos/footer-davi/footer.js` | Footer "by davicjc" |
| `projetos/footer-terceiros/<parceiro>.js` | Footers de parceria (gerados, não editar à mão) |
| `projetos/footer-terceiros/_gerar.js` | Cria os footers de parceria copiando o footer do Davi e trocando os nomes |
| `teste/index.html` | Teste com sites simulados (claro, escuro, foto, CSS agressivo) |
| `footer_cjc.js` | **Legado**: footer antigo usado por sites antigos via jsDelivr. Não apagar |
| `rules.md` | O que nunca pode entrar nos scripts, para não manchar o domínio |

## Usar em um site

A lista completa, com botão de copiar, fica em https://recursos.cjc.pics/projetos.html e se atualiza sozinha a cada push.

```html
<!-- footer do davicjc -->
<script src="https://recursos.cjc.pics/projetos/footer-davi/footer.js" defer></script>

<!-- footer da parceria com o PauloG -->
<script src="https://recursos.cjc.pics/projetos/footer-terceiros/paulog.js" defer></script>
```

## Alterar o footer

1. Editar `projetos/footer-davi/footer.js`.
2. Rodar `node projetos/footer-terceiros/_gerar.js`. Ele recria os footers de parceria com a mesma mudança.
3. Abrir `teste/index.html` no navegador e conferir.
4. Revisar a lista do `rules.md` antes do push, porque o push publica em todos os sites.

**Novo parceiro:** adicionar em `PARCEIROS` no `_gerar.js` (Davicjc sempre primeiro) e rodar o passo 2. O arquivo sai em `projetos/footer-terceiros/<nome>.js`.

## Publicação (Cloudflare Pages)

- Projeto ligado a este repositório, branch `main`.
- Framework: nenhum. Comando de build: vazio. Diretório de saída: raiz (deixe vazio ou `/`).
- Domínio personalizado: `recursos.cjc.pics`.
- Tudo no repositório fica acessível pelo domínio.

## Sites antigos

Sites antigos usam `cdn.jsdelivr.net/gh/davicjc/FooterDavicjc@main/footer_cjc.js`, que lê o `footer_cjc.js` da raiz deste repositório. O arquivo fica mantido porque não se sabe quais sites ainda usam o link. Ao mexer num site antigo, troque a tag pela nova (veja o `projetos.html`).
