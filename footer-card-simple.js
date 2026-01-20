(function() {
    'use strict';
    
    const CARD_ID = 'davicjc-card-simple';
    
    // Evita duplicação
    if (document.getElementById(CARD_ID)) return;
    
    // Injeta estilos CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes davicjc-card-fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
        
        #${CARD_ID} {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #0f0c29, #302b63);
            color: #fff;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 9999;
            border: 1px solid rgba(0, 212, 255, 0.3);
            animation: davicjc-card-fadeIn 0.5s ease-out;
            backdrop-filter: blur(10px);
            max-width: 280px;
        }
        
        #${CARD_ID} .davicjc-card-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        #${CARD_ID} .davicjc-card-avatar {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #00d4ff, #0099cc);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 18px;
            flex-shrink: 0;
        }
        
        #${CARD_ID} .davicjc-card-info {
            flex: 1;
        }
        
        #${CARD_ID} .davicjc-card-name {
            font-weight: 600;
            font-size: 14px;
            margin: 0 0 2px 0;
            color: #00d4ff;
        }
        
        #${CARD_ID} .davicjc-card-text {
            font-size: 11px;
            margin: 0;
            opacity: 0.8;
        }
        
        #${CARD_ID} .davicjc-card-close {
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            font-size: 18px;
            line-height: 1;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            border-radius: 50%;
        }
        
        #${CARD_ID} .davicjc-card-close:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 768px) {
            #${CARD_ID} {
                bottom: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Cria o card
    const card = document.createElement('div');
    card.id = CARD_ID;
    
    card.innerHTML = `
        <button class="davicjc-card-close" onclick="this.parentElement.remove()" title="Fechar">×</button>
        <div class="davicjc-card-content">
            <div class="davicjc-card-avatar">D</div>
            <div class="davicjc-card-info">
                <p class="davicjc-card-name">Davicjc</p>
                <p class="davicjc-card-text">Built with 💙</p>
            </div>
        </div>
    `;
    
    // Injeta no body
    if (document.body) {
        document.body.appendChild(card);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.appendChild(card);
        });
    }
})();
