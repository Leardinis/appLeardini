// script.js (Código que o cliente VAI ver, por isso NÃO pode ter suas chaves)

const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxcsFLZEQdaQimZ4mYNl10-3X-dexxxecGYmgOn8x8wVxGkI_jCdY3KrqZVlk6XBb8Q/exec'; // Cole a URL do Passo 1.2

async function venderSistema(dadosCliente) {
    try {
        const response = await fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            mode: 'cors', // Crucial para comunicação entre domínios
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                acao: 'processarVenda',
                dados: dadosCliente // Dados do formulário, carrinho, etc.
            })
        });

        const resultado = await response.json();
        
        if (resultado.status === 'Sucesso') {
            alert('Venda processada com sucesso! ID: ' + resultado.idVenda);
        } else {
            alert('Erro ao processar a venda.');
        }

    } catch (error) {
        console.error('Falha na comunicação com o backend:', error);
        alert('Ocorreu um erro de rede. Tente novamente.');
    }
}

// Exemplo de uso:
document.addEventListener('DOMContentLoaded', () => {
    const btnVender = document.getElementById('vender');
    if (btnVender) {
        btnVender.addEventListener('click', () => {
            // Supondo que você pegou dados de um formulário
            const dados = { nome: 'João', valor: 99.90 }; 
            venderSistema(dados);
        });
    }
});
