(function() {
    'use strict';
    
    const CARD_ID = 'davicjc-card-medium';
    
    // Evita duplicação
    if (document.getElementById(CARD_ID)) return;
    
    // Injeta estilos CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes davicjc-card-slideIn {
            from { opacity: 0; transform: translateX(100%); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes davicjc-card-pulse {
            0%, 100% { box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3); }
            50% { box-shadow: 0 8px 40px rgba(0, 212, 255, 0.5); }
        }
        
        #${CARD_ID} {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
            color: #fff;
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 9999;
            border: 2px solid rgba(0, 212, 255, 0.4);
            animation: davicjc-card-slideIn 0.6s ease-out, davicjc-card-pulse 3s ease-in-out infinite;
            backdrop-filter: blur(10px);
            max-width: 320px;
        }
        
        #${CARD_ID} .davicjc-card-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        #${CARD_ID} .davicjc-card-avatar {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #00d4ff, #0099cc);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 24px;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
        }
        
        #${CARD_ID} .davicjc-card-info h3 {
            margin: 0 0 4px 0;
            font-size: 16px;
            color: #00d4ff;
            font-weight: 600;
        }
        
        #${CARD_ID} .davicjc-card-info p {
            margin: 0;
            font-size: 12px;
            opacity: 0.8;
        }
        
        #${CARD_ID} .davicjc-card-links {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        
        #${CARD_ID} .davicjc-card-link {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 8px;
            text-decoration: none;
            color: #00d4ff;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.3s;
        }
        
        #${CARD_ID} .davicjc-card-link:hover {
            background: #00d4ff;
            color: #0f0c29;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
        }
        
        #${CARD_ID} .davicjc-card-link svg {
            width: 16px;
            height: 16px;
            margin-right: 5px;
        }
        
        #${CARD_ID} .davicjc-card-close {
            position: absolute;
            top: 12px;
            right: 12px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            font-size: 20px;
            line-height: 1;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            border-radius: 6px;
        }
        
        #${CARD_ID} .davicjc-card-close:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
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
        <div class="davicjc-card-header">
            <div class="davicjc-card-avatar">D</div>
            <div class="davicjc-card-info">
                <h3>Davicjc</h3>
                <p>Full Stack Developer</p>
            </div>
        </div>
        <div class="davicjc-card-links">
            <a href="https://github.com/davicjc" target="_blank" rel="noopener" class="davicjc-card-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>
            <a href="https://davicjc.dev" target="_blank" rel="noopener" class="davicjc-card-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
                </svg>
                Site
            </a>
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
