// ATENÇÃO: Substitua esta URL pela URL do seu Web App do GAS!
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxcsFLZEQdaQimZ4mYNl10-3X-dexxxecGYmgOn8x8wVxGkI_jCdY3KrqZVlk6XBb8Q/exec'; 

function acionarVenda() {
    const statusDiv = document.getElementById('status-mensagem');
    statusDiv.textContent = 'Enviando dados para o servidor seguro...';

    const dadosParaGAS = {
        acao: 'processarVenda',
        // Dados fictícios que você enviaria de um formulário real
        dados: { 
            nome: 'Teste Cliente', 
            valor: 100.00 
        }
    };

    fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        mode: 'cors', // Necessário para comunicação entre domínios
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaGAS)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(resultado => {
        // O que o GAS retornar
        if (resultado.status === 'Sucesso') {
            statusDiv.style.color = 'green';
            statusDiv.textContent = `SUCESSO! Venda ID: ${resultado.idVenda}. O backend funcionou!`;
        } else {
            statusDiv.style.color = 'red';
            statusDiv.textContent = `FALHA no processamento: ${resultado.mensagem || 'Erro desconhecido.'}`;
        }
    })
    .catch(error => {
        statusDiv.style.color = 'red';
        console.error('Erro na comunicação com o GAS:', error);
        statusDiv.textContent = 'ERRO DE CONEXÃO: Verifique o console ou a URL do GAS.';
    });
}

// Garante que o script só roda após o HTML estar carregado
document.addEventListener('DOMContentLoaded', () => {
    const btnVender = document.getElementById('vender');
    if (btnVender) {
        // Adiciona o evento ao botão
        btnVender.addEventListener('click', acionarVenda);
    } else {
        console.error("Botão com ID 'vender' não encontrado no HTML.");
    }
});
