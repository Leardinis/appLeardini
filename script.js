// ATENÇÃO: Esta é a URL do seu Web App do GAS. Ela é a ponte para o seu backend.
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxcsFLZEQdaQimZ4mYNl10-3X-dexxxecGYmgOn8x8wVxGkI_jCdY3KrqZVlk6XBb8Q/exec'; 

/**
 * Envia uma requisição POST ao Google Apps Script.
 */
function acionarVenda() {
    const statusDiv = document.getElementById('status-mensagem');
    statusDiv.style.color = 'orange';
    statusDiv.textContent = 'Enviando dados (via POST) para o Google Apps Script...';

    const dadosParaGAS = {
        acao: 'processarVenda',
        // Estes são os dados que seriam coletados de um formulário de venda real
        dados: { 
            nome: 'Cliente Fictício', 
            valor: 150.00 
        }
    };

    fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        // 'cors' é crucial para que o navegador execute o preflight
        mode: 'cors', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaGAS)
    })
    .then(response => {
        // Verifica se o status HTTP foi bem-sucedido (200-299)
        if (!response.ok) {
            throw new Error(`Erro de Servidor! Status: ${response.status}. Verifique o log do GAS.`);
        }
        return response.json();
    })
    .then(resultado => {
        // Processa a resposta do Apps Script
        if (resultado.status === 'Sucesso') {
            statusDiv.style.color = 'green';
            statusDiv.textContent = `✅ SUCESSO! ${resultado.mensagem} ID: ${resultado.idVenda}.`;
        } else {
            statusDiv.style.color = 'red';
            statusDiv.textContent = `❌ FALHA NO BACKEND: ${resultado.mensagem || 'Resposta inesperada.'}`;
        }
    })
    .catch(error => {
        statusDiv.style.color = 'red';
        console.error('Falha de Comunicação/CORS:', error);
        statusDiv.textContent = '❌ ERRO DE CONEXÃO: Falha ao alcançar o GAS. Verifique o console (F12) e a implantação.';
    });
}

// Inicialização: Conecta a função ao botão
document.addEventListener('DOMContentLoaded', () => {
    const btnVender = document.getElementById('vender');
    if (btnVender) {
        btnVender.addEventListener('click', acionarVenda);
    }
});
