(function() {
    'use strict';

    // Único trecho que muda entre os arquivos de footer
    const FOOTER_ID = 'davicjc-footer';
    const DEVELOPERS = [
        { name: 'Davicjc', url: 'https://davicjc.github.io/PortfolioPessoal' }
    ];

    const THEME_ATTR = 'data-davicjc-theme';
    const Z_CLOSED = '9999';
    const Z_OPEN = '2147483647';
    const ARROW = '\u2197';
    const MEDIA_TAGS = /^(img|video|canvas|iframe|svg|picture|object|embed)$/i;
    const COLOR_FUNCTIONS = /(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\([^()]*\)/g;

    // Tudo fica dentro de um Shadow DOM, então o CSS do site do cliente não alcança o footer
    const STYLES = `
        .wrap {
            all: initial;
            position: relative;
            display: block;
            font-family: ui-monospace, "SF Mono", "Cascadia Code", Consolas, "Liberation Mono", monospace;
            --dvc-badge-bg: rgba(0, 0, 0, 0.6);
            --dvc-badge-border: rgba(255, 255, 255, 0.2);
            --dvc-badge-fg: #fff;
            --dvc-card-bg: rgba(12, 12, 13, 0.97);
            --dvc-card-fg: #e4e4e7;
            --dvc-line: rgba(255, 255, 255, 0.12);
            --dvc-hover: rgba(255, 255, 255, 0.08);
        }
        :host([${THEME_ATTR}="dark"]) .wrap {
            --dvc-badge-bg: rgba(0, 0, 0, 0.2);
            --dvc-badge-border: rgba(255, 255, 255, 0.14);
            --dvc-badge-fg: #e4e4e7;
        }
        :host([${THEME_ATTR}="light"]) .wrap {
            --dvc-badge-bg: rgba(255, 255, 255, 0.6);
            --dvc-badge-border: rgba(0, 0, 0, 0.12);
            --dvc-badge-fg: #27272a;
            --dvc-card-bg: rgba(255, 255, 255, 0.98);
            --dvc-card-fg: #18181b;
            --dvc-line: rgba(0, 0, 0, 0.1);
            --dvc-hover: rgba(0, 0, 0, 0.05);
        }

        .badge {
            all: unset;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 2px 6px;
            border: 1px solid var(--dvc-badge-border);
            border-radius: 3px;
            background: var(--dvc-badge-bg);
            color: var(--dvc-badge-fg);
            font-size: 8.5px;
            line-height: 1.25;
            white-space: nowrap;
            cursor: pointer;
        }
        .by, .arrow { opacity: 0.5; }
        .name { opacity: 0.85; transition: opacity 0.15s ease; }
        .badge:hover .name, .open .name { opacity: 1; }
        .rule { align-self: stretch; width: 1px; background: currentColor; opacity: 0.2; }
        .names { display: flex; flex-direction: column; }
        .sep { height: 1px; margin: 2px 0; background: currentColor; opacity: 0.25; }

        .card {
            position: absolute;
            right: 0;
            bottom: calc(100% + 6px);
            box-sizing: border-box;
            width: 232px;
            max-width: calc(100vw - 20px);
            padding: 10px 12px 12px;
            border: 1px solid var(--dvc-line);
            border-radius: 4px;
            background: var(--dvc-card-bg);
            color: var(--dvc-card-fg);
            box-shadow: 0 12px 32px -12px rgba(0, 0, 0, 0.45);
            font-size: 10.5px;
            line-height: 1.5;
            opacity: 0;
            visibility: hidden;
            transform: translateY(4px);
            transition: opacity 0.14s ease, transform 0.14s ease, visibility 0s linear 0.14s;
        }
        .open .card {
            opacity: 1;
            visibility: visible;
            transform: none;
            transition: opacity 0.14s ease, transform 0.14s ease;
        }
        .eyebrow { margin: 0 0 4px; opacity: 0.5; }
        .text { margin: 0 0 10px; }
        .text strong { font-weight: 600; }
        .actions { display: flex; flex-wrap: wrap; gap: 6px; }
        .action {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 8px;
            border: 1px solid var(--dvc-line);
            border-radius: 3px;
            color: inherit;
            text-decoration: none;
            transition: background-color 0.15s ease;
        }
        .action:hover { background: var(--dvc-hover); }
        .badge:focus-visible, .action:focus-visible { outline: 1px solid currentColor; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
            .card, .open .card { transition: none; }
        }
    `;

    function template() {
        const several = DEVELOPERS.length > 1;
        const names = DEVELOPERS.map((dev) => dev.name.toLowerCase());

        const madeBy = names.map((name) => '<strong>' + name + '</strong>');
        const credits = madeBy.length > 1
            ? madeBy.slice(0, -1).join(', ') + ' e ' + madeBy[madeBy.length - 1]
            : madeBy[0];
        const question = several ? 'Deseja visitar os portf\u00f3lios?' : 'Deseja visitar o portf\u00f3lio?';

        const actions = DEVELOPERS.map((dev, i) =>
            '<a class="action" href="' + dev.url + '" target="_blank" rel="noopener">' +
            (several ? names[i] : 'visitar portf\u00f3lio') +
            '<span class="arrow" aria-hidden="true">' + ARROW + '</span></a>'
        ).join('');

        // Um nome: "by davicjc ↗". Vários: traço vertical e nomes empilhados com linha fina entre eles, sem seta
        const label = several
            ? '<span class="rule"></span><span class="names">' +
                names.map((name) => '<span class="name">' + name + '</span>').join('<span class="sep"></span>') +
                '</span>'
            : '<span class="name">' + names[0] + '</span>';

        return '<div class="wrap">' +
            '<div class="card" role="dialog" aria-label="Marca do desenvolvedor">' +
            '<p class="eyebrow">// marca do desenvolvedor</p>' +
            '<p class="text">Este site foi desenvolvido por ' + credits + '. ' + question + '</p>' +
            '<div class="actions">' + actions + '</div>' +
            '</div>' +
            '<button class="badge" type="button" aria-haspopup="dialog" aria-expanded="false">' +
            '<span class="by">by</span>' + label +
            (several ? '' : '<span class="arrow" aria-hidden="true">' + ARROW + '</span>') +
            '</button>' +
            '</div>';
    }

    function mount() {
        // Script incluído mais de uma vez: mostra um footer só
        if (document.getElementById(FOOTER_ID)) return;
        if (!document.body.attachShadow) return;

        const footer = document.createElement('div');
        footer.id = FOOTER_ID;
        // "all: revert" ignora regras genéricas do site que pegariam o próprio elemento (ex.: div { padding: 20px })
        footer.style.setProperty('all', 'revert');
        Object.assign(footer.style, {
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: Z_CLOSED
        });
        footer.setAttribute(THEME_ATTR, 'unknown');

        const root = footer.attachShadow({ mode: 'open' });
        root.innerHTML = '<style>' + STYLES + '</style>' + template();

        const wrap = root.querySelector('.wrap');
        const badge = root.querySelector('.badge');
        const firstAction = root.querySelector('.action');

        function setOpen(open) {
            wrap.classList.toggle('open', open);
            badge.setAttribute('aria-expanded', String(open));
            // Aberto, o card fica acima de qualquer coisa do site (chat, cookies...)
            footer.style.zIndex = open ? Z_OPEN : Z_CLOSED;

            if (open) {
                document.addEventListener('pointerdown', onPointerDownOutside, true);
                document.addEventListener('keydown', onKeyDown, true);
                requestAnimationFrame(() => firstAction.focus({ preventScroll: true }));
            } else {
                document.removeEventListener('pointerdown', onPointerDownOutside, true);
                document.removeEventListener('keydown', onKeyDown, true);
            }
        }

        function onPointerDownOutside(e) {
            if (!e.composedPath().includes(footer)) setOpen(false);
        }

        function onKeyDown(e) {
            if (e.key !== 'Escape') return;
            setOpen(false);
            badge.focus({ preventScroll: true });
        }

        badge.addEventListener('click', () => setOpen(!wrap.classList.contains('open')));
        root.querySelectorAll('.action').forEach((action) => {
            action.addEventListener('click', () => setOpen(false));
        });

        // O footer fica no fim da página usando o body como referência.
        // Só define o position se o site não tiver definido um.
        if (getComputedStyle(document.body).position === 'static') {
            document.body.style.position = 'relative';
        }

        document.body.appendChild(footer);
        watchBackground(footer);
    }

    // Sempre que o footer aparece na tela, confere o fundo atrás dele
    function watchBackground(footer) {
        if (!('IntersectionObserver' in window) || !document.elementsFromPoint) return;

        new IntersectionObserver((entries) => {
            if (!entries[entries.length - 1].isIntersecting) return;

            const rect = footer.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            if (x < 0 || y < 0 || x >= window.innerWidth || y >= window.innerHeight) return;

            const light = isLightBackground(footer, x, y);
            footer.setAttribute(THEME_ATTR, light === null ? 'unknown' : light ? 'light' : 'dark');
        }, { threshold: [0.5, 1] }).observe(footer);
    }

    // true = fundo claro, false = escuro, null = não dá para saber (foto, vídeo...)
    function isLightBackground(footer, x, y) {
        // Camadas de cima para baixo; body e html entram por último porque podem pintar a tela toda
        const layers = new Set(document.elementsFromPoint(x, y));
        layers.add(document.body);
        layers.add(document.documentElement);

        let r = 0, g = 0, b = 0, covered = 0;
        const addLayer = (color) => {
            const weight = (1 - covered) * color.a;
            r += color.r * weight;
            g += color.g * weight;
            b += color.b * weight;
            covered += weight;
        };

        for (const el of layers) {
            if (covered > 0.99) break;
            if (footer.contains(el)) continue;

            const style = getComputedStyle(el);
            if (MEDIA_TAGS.test(el.tagName) || style.backgroundImage.includes('url(')) return null;

            // Gradiente fica por cima da cor de fundo e entra como a média das cores dele
            const stops = style.backgroundImage.match(COLOR_FUNCTIONS);
            if (stops) {
                const colors = stops.map(toRgba);
                if (colors.includes(null)) return null;
                addLayer(average(colors));
            }

            const color = toRgba(style.backgroundColor);
            if (!color) return null;
            addLayer(color);
        }

        // O que sobrar é o fundo padrão do navegador: branco, ou escuro se o site usa color-scheme dark
        const scheme = getComputedStyle(document.documentElement).colorScheme || '';
        const darkCanvas = /dark/.test(scheme) &&
            (!/light/.test(scheme) || window.matchMedia('(prefers-color-scheme: dark)').matches);
        const canvasLevel = darkCanvas ? 18 : 255;
        const rest = 1 - covered;
        r += canvasLevel * rest;
        g += canvasLevel * rest;
        b += canvasLevel * rest;

        return luminance(r, g, b) > 0.4;
    }

    // Converte qualquer cor CSS (rgb, hsl, oklch...) pintando 1 pixel num canvas
    let pixel;
    function toRgba(value) {
        if (!pixel) {
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = 1;
            pixel = canvas.getContext('2d', { willReadFrequently: true });
            if (!pixel) return null;
        }
        pixel.clearRect(0, 0, 1, 1);
        pixel.fillStyle = value;
        pixel.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = pixel.getImageData(0, 0, 1, 1).data;
        return { r: r, g: g, b: b, a: a / 255 };
    }

    function average(colors) {
        let r = 0, g = 0, b = 0, a = 0;
        colors.forEach((c) => {
            r += c.r * c.a;
            g += c.g * c.a;
            b += c.b * c.a;
            a += c.a;
        });
        if (!a) return { r: 0, g: 0, b: 0, a: 0 };
        return { r: r / a, g: g / a, b: b / a, a: a / colors.length };
    }

    function luminance(r, g, b) {
        const [lr, lg, lb] = [r, g, b].map((v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();
