// main.js — lógica do cadastro de clientes

// Função para adicionar um cliente à planilha
function addClient(sheet, name, phone) {
  sheet.appendRow([name, phone, new Date()]);
  return { success: true, message: "Cliente cadastrado com sucesso!" };
}

// Função para listar todos os clientes
function listClients(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  return data.map(r => ({ nome: r[0], telefone: r[1], data: r[2] }));
}

// Função principal para processar as ações
function handleAction(action, params, sheet) {
  switch (action) {
    case "add":
      return addClient(sheet, params.name, params.phone);
    case "list":
      return listClients(sheet);
    default:
      return { success: false, message: "Ação inválida." };
  }
}

// Exportar para ser usado no Google Apps Script
if (typeof module !== "undefined") {
  module.exports = { handleAction };
}
