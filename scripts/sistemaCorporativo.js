const { input, select } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo ao Sistema Corporativo!!!";

const acao = async (nomeRepetir) => {
  return await select({
    message: "O que deseja fazer agora?",
    choices: [
      { name: !nomeRepetir ? "Repetir" : nomeRepetir, value: "repetir" },
      { name: "Voltar", value: "voltar" }
    ]
  });
};

const calcularAumento = async () => {
  const salarioFixo = parseFloat(await input({ message: "Qual o seu salario Fixo ?" }))
  const porcentagemAumento = parseFloat(await input({ message: "Qual a Porcentagem do aumento (EX: 30%) ?" }))

  const valorAumento = salarioFixo * (porcentagemAumento / 100);
  const salarioFinal = salarioFixo + valorAumento;

  console.clear();
  console.log(`Antigo salário: R$ ${salarioFixo.toFixed(2)}`);
  console.log(`Total aumentado: R$ ${valorAumento.toFixed(2)}`);
  console.log(`Novo salário: R$ ${salarioFinal.toFixed(2)}`);
  console.log('=========================================');

  let escolha = await acao("Outro Calculo");
  if (escolha === "repetir") {
    await calcularAumento();
    return;
  }
}

const calcularComissao = async () => {
  const salarioFixo = parseFloat(await input({ message: "Qual o seu salario Fixo ?" }))
  const quantidadeVendas = parseInt(await input({ message: "Qual a Quantidade de vendas feitas ?" }))
  if (quantidadeVendas < 0) {
    console.log("=========================================");
    console.log("QUANTIDADE INVALIDA: O valor nao pode ser menor que 0");
    console.log("=========================================");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }
  const totalVendido = parseFloat(await input({ message: "Qual o valor total vendido ?" }))
  const porcentagemComissao = parseFloat(await input({ message: "Qual a Porcentagem da comissao (EX: 30%) ?" }))
  if (porcentagemComissao > 100 || porcentagemComissao < 0) {
    console.log("=========================================");
    console.log("PORCENTAGEM INVALIDA: O valor nao pode ser maior que 100% e menor que 0%");
    console.log("=========================================");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }

  let valorComissao = 0
  let mediaVendas = 0
  let totalReceber = 0


  valorComissao = totalVendido * (porcentagemComissao / 100);
  mediaVendas = totalVendido / quantidadeVendas;
  totalReceber = salarioFixo + valorComissao;

  console.clear();
  console.log(`Salário: R$ ${salarioFixo.toFixed(2)}`);
  console.log(`Comissao: R$ ${valorComissao.toFixed(2)}`);
  console.log(`Total à Pagar: R$ ${totalReceber.toFixed(2)}`);
  console.log(`Quantidade vendida: ${quantidadeVendas}`);
  console.log(`Media de Reais vendidos: R$ ${mediaVendas.toFixed(2)}`);
  console.log('=========================================');

  let escolha = await acao("Outro Calculo");
  if (escolha === "repetir") {
    await calcularAumento();
    return;
  }
}

const mostrarMensagem = () => {
  if (mensagem !== "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};



const rodarSistemaCorporativo = async () => {
  while (true) {
    console.clear();
    mostrarMensagem()

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Calcular Aumento",
          value: "aumento"
        },
        {
          name: "Calcular Comissao",
          value: "comissao"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    });
    switch (opcao) {
      case "aumento":
        await calcularAumento();
        break;
      case "comissao":
        await calcularComissao();
        break;
      case "sair":
        console.log("Saindo...")
        return;
      default:
        console.log("A opcao escolhida nao existe...");
        return;
    }
  }
}

module.exports = rodarSistemaCorporativo;