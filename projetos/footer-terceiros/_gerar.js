// Gera os footers de parceria a partir do footer do Davi.
// O footer da parceria é uma cópia do projetos/footer-davi/footer.js:
// só mudam o id e a lista de nomes. Assim você edita um arquivo só.
//
// Uso (na raiz do repositório): node projetos/footer-terceiros/_gerar.js
// Rode sempre que editar o footer do Davi ou a lista de parceiros abaixo.

const fs = require('fs');
const path = require('path');

const DAVICJC = { name: 'Davicjc', url: 'https://davicjc.github.io/PortfolioPessoal' };

// Um arquivo por parceiro: projetos/footer-terceiros/<chave>.js
// Davicjc sempre em primeiro.
const PARCEIROS = {
    paulog: [DAVICJC, { name: 'PauloG', url: 'https://www.paulogfribeiro.lat/' }]
};

const base = path.join(__dirname, '..', 'footer-davi', 'footer.js');

const linhas = fs.readFileSync(base, 'utf8').split('\n');
const idLinha = linhas.findIndex((l) => l.includes('const FOOTER_ID = '));
const devInicio = linhas.findIndex((l) => l.includes('const DEVELOPERS = ['));
const devFim = linhas.findIndex((l, i) => i > devInicio && l.trim() === '];');
if (idLinha < 0 || devInicio < 0 || devFim < 0) {
    throw new Error('Não achei FOOTER_ID ou DEVELOPERS em ' + base);
}

for (const [chave, devs] of Object.entries(PARCEIROS)) {
    const saida = linhas.slice();
    const lista = devs.map((d) => `        { name: '${d.name}', url: '${d.url}' }`).join(',\n');
    saida.splice(devInicio, devFim - devInicio + 1,
        '    // Gerado por projetos/footer-terceiros/_gerar.js. Não edite à mão.',
        '    const DEVELOPERS = [',
        lista,
        '    ];'
    );
    saida[idLinha] = `    const FOOTER_ID = 'davicjc-${chave}-footer';`;

    const arquivo = path.join(__dirname, chave + '.js');
    fs.writeFileSync(arquivo, saida.join('\n'));
    console.log('gerado:', path.relative(process.cwd(), arquivo));
}
