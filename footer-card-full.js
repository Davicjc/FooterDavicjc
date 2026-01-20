(function() {
    'use strict';
    
    const CARD_ID = 'davicjc-card-full';
    
    // Evita duplicação
    if (document.getElementById(CARD_ID)) return;
    
    // Injeta estilos CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes davicjc-card-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes davicjc-card-glow {
            0%, 100% { box-shadow: 0 10px 40px rgba(0, 212, 255, 0.3); }
            50% { box-shadow: 0 10px 60px rgba(0, 212, 255, 0.5); }
        }
        
        @keyframes davicjc-card-slideUp {
            from { opacity: 0; transform: translateY(100px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        #${CARD_ID} {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
            color: #fff;
            padding: 25px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 212, 255, 0.3);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 9999;
            border: 2px solid rgba(0, 212, 255, 0.4);
            animation: davicjc-card-slideUp 0.7s ease-out, davicjc-card-float 6s ease-in-out infinite;
            backdrop-filter: blur(15px);
            max-width: 380px;
            overflow: hidden;
        }
        
        #${CARD_ID}::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00d4ff, transparent);
            animation: davicjc-card-shine 3s linear infinite;
        }
        
        @keyframes davicjc-card-shine {
            to { left: 100%; }
        }
        
        #${CARD_ID} .davicjc-card-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
        }
        
        #${CARD_ID} .davicjc-card-avatar {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #00d4ff, #0099cc);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 28px;
            flex-shrink: 0;
            box-shadow: 0 4px 20px rgba(0, 212, 255, 0.5);
            position: relative;
        }
        
        #${CARD_ID} .davicjc-card-avatar::after {
            content: '✨';
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 18px;
        }
        
        #${CARD_ID} .davicjc-card-info h3 {
            margin: 0 0 5px 0;
            font-size: 18px;
            color: #00d4ff;
            font-weight: 700;
        }
        
        #${CARD_ID} .davicjc-card-info p {
            margin: 0 0 5px 0;
            font-size: 13px;
            opacity: 0.9;
        }
        
        #${CARD_ID} .davicjc-card-tags {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
        }
        
        #${CARD_ID} .davicjc-card-tag {
            background: rgba(0, 212, 255, 0.15);
            color: #00d4ff;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 500;
        }
        
        #${CARD_ID} .davicjc-card-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }
        
        #${CARD_ID} .davicjc-card-stat {
            background: rgba(255, 255, 255, 0.05);
            padding: 12px;
            border-radius: 12px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        #${CARD_ID} .davicjc-card-stat-value {
            display: block;
            font-size: 18px;
            font-weight: 700;
            color: #00d4ff;
            margin-bottom: 4px;
        }
        
        #${CARD_ID} .davicjc-card-stat-label {
            display: block;
            font-size: 10px;
            opacity: 0.7;
            text-transform: uppercase;
        }
        
        #${CARD_ID} .davicjc-card-links {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-bottom: 15px;
        }
        
        #${CARD_ID} .davicjc-card-link {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 10px;
            text-decoration: none;
            color: #00d4ff;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        #${CARD_ID} .davicjc-card-link:hover {
            background: #00d4ff;
            color: #0f0c29;
            transform: translateY(-3px);
            box-shadow: 0 6px 16px rgba(0, 212, 255, 0.4);
        }
        
        #${CARD_ID} .davicjc-card-link svg {
            width: 18px;
            height: 18px;
            margin-right: 6px;
        }
        
        #${CARD_ID} .davicjc-card-footer {
            text-align: center;
            padding-top: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 11px;
            opacity: 0.7;
        }
        
        #${CARD_ID} .davicjc-card-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            font-size: 22px;
            line-height: 1;
            padding: 0;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            border-radius: 8px;
            z-index: 1;
        }
        
        #${CARD_ID} .davicjc-card-close:hover {
            color: #fff;
            background: rgba(255, 77, 77, 0.8);
            transform: rotate(90deg);
        }
        
        @media (max-width: 768px) {
            #${CARD_ID} {
                bottom: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
                padding: 20px;
            }
            
            #${CARD_ID} .davicjc-card-stats {
                grid-template-columns: repeat(3, 1fr);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Cria o card
    const card = document.createElement('div');
    card.id = CARD_ID;
    
    const currentYear = new Date().getFullYear();
    
    card.innerHTML = `
        <button class="davicjc-card-close" onclick="this.parentElement.remove()" title="Fechar">×</button>
        <div class="davicjc-card-header">
            <div class="davicjc-card-avatar">D</div>
            <div class="davicjc-card-info">
                <h3>Davicjc</h3>
                <p>Full Stack Developer</p>
                <div class="davicjc-card-tags">
                    <span class="davicjc-card-tag">JavaScript</span>
                    <span class="davicjc-card-tag">React</span>
                    <span class="davicjc-card-tag">Node.js</span>
                </div>
            </div>
        </div>
        
        <div class="davicjc-card-stats">
            <div class="davicjc-card-stat">
                <span class="davicjc-card-stat-value">50+</span>
                <span class="davicjc-card-stat-label">Projects</span>
            </div>
            <div class="davicjc-card-stat">
                <span class="davicjc-card-stat-value">5+</span>
                <span class="davicjc-card-stat-label">Years</span>
            </div>
            <div class="davicjc-card-stat">
                <span class="davicjc-card-stat-value">100+</span>
                <span class="davicjc-card-stat-label">Clients</span>
            </div>
        </div>
        
        <div class="davicjc-card-links">
            <a href="https://github.com/davicjc" target="_blank" rel="noopener" class="davicjc-card-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>
            <a href="https://linkedin.com/in/davicjc" target="_blank" rel="noopener" class="davicjc-card-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
            </a>
            <a href="https://davicjc.dev" target="_blank" rel="noopener" class="davicjc-card-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
                </svg>
                Portfolio
            </a>
            <a href="mailto:contato@davicjc.dev" class="davicjc-card-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                </svg>
                Email
            </a>
        </div>
        
        <div class="davicjc-card-footer">
            © ${currentYear} Davicjc • Built with 💙
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
