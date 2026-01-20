(function() {
    'use strict';
    
    // Criar o elemento do footer
    const footer = document.createElement('div');
    footer.id = 'davicjc-footer';
    footer.innerHTML = '<a href="https://davicjc.github.io/PortfolioPessoal" target="_blank" rel="noopener">By Davicjc</a>';
    
    // Aplicar estilos inline
    Object.assign(footer.style, {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        padding: '5px',
        color: '#fff',
        fontSize: '11px',
        zIndex: '9999',
        cursor: 'move',
        userSelect: 'none',
        transition: 'transform 0.2s ease'
    });
    
    // Estilizar o link
    const link = footer.querySelector('a');
    Object.assign(link.style, {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '11px',
        opacity: '0.6'
    });
    
    link.addEventListener('mouseover', () => {
        link.style.opacity = '0.4';
    });
    
    link.addEventListener('mouseout', () => {
        link.style.opacity = '0.6';
    });
    
    // Funcionalidade de arrastar
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    footer.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    // Suporte para touch (mobile)
    footer.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);
    
    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        if (e.target === footer || e.target === link) {
            isDragging = true;
            footer.style.transition = 'none';
        }
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }
            
            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, footer);
        }
    }
    
    function dragEnd(e) {
        if (isDragging) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            footer.style.transition = 'transform 0.2s ease';
        }
    }
    
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
    
    // Adicionar ao DOM quando a página carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.style.position = 'relative';
            document.body.appendChild(footer);
        });
    } else {
        document.body.style.position = 'relative';
        document.body.appendChild(footer);
    }
})();
