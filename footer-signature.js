(function() {
    'use strict';
    
    const FOOTER_ID = 'davicjc-signature';
    
    // Evita duplicação
    if (document.getElementById(FOOTER_ID)) return;
    
    // Injeta estilos CSS
    const style = document.createElement('style');
    style.textContent = `
        #${FOOTER_ID} {
            text-align: center;
            padding: 20px;
            margin-top: 40px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .footer-copyright {
            color: #666;
            text-decoration: none;
            font-size: 14px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: color 0.3s ease;
        }
        
        .footer-copyright:hover {
            color: #000;
        }
    `;
    document.head.appendChild(style);
    
    // Cria o footer
    const footer = document.createElement('footer');
    footer.id = FOOTER_ID;
    
    footer.innerHTML = `
        <a href="https://davicjc.github.io/PortfolioPessoal" target="_blank" rel="noopener" class="footer-copyright footer-author">By Davicjc</a>
    `;
    
    // Injeta no final do body
    if (document.body) {
        document.body.appendChild(footer);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.appendChild(footer);
        });
    }
})();
