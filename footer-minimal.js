(function() {
    'use strict';
    
    const FOOTER_ID = 'davicjc-footer-minimal';
    
    // Evita duplicação
    if (document.getElementById(FOOTER_ID)) return;
    
    // Cria o elemento footer
    const footer = document.createElement('footer');
    footer.id = FOOTER_ID;
    
    // Estilos inline
    footer.style.cssText = `
        background: linear-gradient(90deg, #0f0c29, #302b63, #24243e);
        color: #00d4ff;
        padding: 20px;
        text-align: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        border-top: 2px solid #00d4ff;
        margin-top: 50px;
        box-shadow: 0 -2px 10px rgba(0, 212, 255, 0.2);
    `;
    
    // Conteúdo do footer
    footer.innerHTML = `
        <p style="margin: 0; font-size: 14px;">
            Built with ✨ by <strong style="color: #fff;">Davicjc</strong> | 
            <a href="https://github.com/davicjc" 
               style="color: #00d4ff; text-decoration: none; transition: all 0.3s;"
               onmouseover="this.style.color='#fff'"
               onmouseout="this.style.color='#00d4ff'">
                GitHub
            </a>
        </p>
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
