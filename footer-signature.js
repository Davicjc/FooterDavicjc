(function() {
    'use strict';
    
    // Injeta apenas os estilos CSS
    const style = document.createElement('style');
    style.textContent = `
        .davicjc-signature {
            color: #666;
            text-decoration: none;
            font-size: 14px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: color 0.3s ease;
            display: inline-block;
        }
        
        .davicjc-signature:hover {
            color: #000;
        }
    `;
    document.head.appendChild(style);
    
    // Função global para criar o link onde você quiser
    window.createDavicjcSignature = function(elementId) {
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = `<a href="https://davicjc.github.io/PortfolioPessoal" target="_blank" rel="noopener" class="davicjc-signature">By Davicjc</a>`;
        }
    };
})();
