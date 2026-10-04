const { input, select } = require('@inquirer/prompts');

let mensagem = "Bem vindo ao Frutaria!!!";

const acao = async (nomeRepetir) => {
  return await select({
    message: "O que deseja fazer agora?",
    choices: [
      { name: !nomeRepetir ? "Repetir" : nomeRepetir, value: "repetir" },
      { name: "Voltar", value: "voltar" }
    ]
  });
};

const comprarFrutaria = async () => {
  let quantidadeMorango = 0;
  let quantidadeMaca = 0;

  const escolhaFruta = await select({
    message: "Qual fruta você deseja?",
    choices: [
      {
        name: "Morango",
        value: "morango",
      },
      {
        name: "Maçã",
        value: "maca",
      },
      {
        name: "Finalizar compra",
        value: "sair",
      },
    ],
    instructions: false,
  });

  if (escolhaFruta === "sair") {
    return;
  }

  const quantidade = parseInt(
    await input({
      message: `Quantos Kg você deseja?`,
    })
  );

  if (escolhaFruta === "morango") {
    quantidadeMorango += quantidade;
  }

  if (escolhaFruta === "maca") {
    quantidadeMaca += quantidade;
  }

  let precoMorango;

  if (quantidadeMorango <= 5) {
    precoMorango = quantidadeMorango * 2.50;
  } else {
    precoMorango = quantidadeMorango * 2.20;
  }

  let precoMaca;

  if (quantidadeMaca <= 5) {
    precoMaca = quantidadeMaca * 1.80;
  } else {
    precoMaca = quantidadeMaca * 1.50;
  }

  let total = precoMorango + precoMaca;

  const quantidadeTotal = quantidadeMorango + quantidadeMaca;

  if (quantidadeTotal > 8 || total > 25) {
    total *= 0.90;
  }

  console.log(`Morango: ${quantidadeMorango} Kg`);
  console.log(`Maçã: ${quantidadeMaca} Kg`);
  console.log(`Total a pagar: R$ ${total.toFixed(2)}`);
  console.log('---------------------------------------------')

  const escolha = await acao("Continuar Compras");

  if (escolha === 'repetir'){
    await comprarFrutaria();
    return;
  }

};
const mostrarMensagem = () => {
  if (mensagem !== "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const rodarSistemaFrutaria = async () => {
  while (true) {
    console.clear();
    mostrarMensagem();

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Comprar",
          value: "comprar"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    });

    switch (opcao) {
      case "comprar":
        await comprarFrutaria();
        break;

      case "sair":
        console.log("Saindo...");
        return;

      default:
        console.log("Opcao nao encontrada...");
    }
  }
};

module.exports = rodarSistemaFrutaria;