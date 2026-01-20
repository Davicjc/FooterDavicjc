(function() {
    'use strict';
    
    // Função global para criar o link onde você quiser
    window.createDavicjcSignature = function(elementId) {
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = `<a href="https://davicjc.github.io/PortfolioPessoal" target="_blank" rel="noopener">By Davicjc</a>`;
        }
    };
})();
