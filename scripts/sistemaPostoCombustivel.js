const { input, select } = require('@inquirer/prompts');

let mensagem = "Bem vindo ao sistema de combustivel!!!";

const acao = async (nomeRepetir) => {
  return await select({
    message: "O que deseja fazer agora?",
    choices: [
      { name: !nomeRepetir ? "Repetir" : nomeRepetir, value: "repetir" },
      { name: "Voltar", value: "voltar" }
    ]
  });
};

const calculadorCombustivelNecessario = async () => {
  const distancia = parseFloat(await input({ message: "qual a distancia que voce vai percorrer (Km)?" }))
  const consumoMedio = parseFloat(await input({ message: "qual o consumo medio (km/l) do carro ?" }))

  litros = distancia / consumoMedio

  console.log(`Distancia a percorrer: ${distancia} Km`)
  console.log(`Consumo medio do veiculo: ${consumoMedio} Km/l`)
  console.log(`Quantidade de combustivel necessario é de: ${litros.toFixed(2)} l`)
  console.log('-------------------------------------------------')

  const escolha = await acao("Calcular Novamente")
  if(escolha === "repetir"){
    calculadorCombustivelNecessario();
    return
  }
};

const calcularValorCombustivel = async () => {
  const escolhaCombustivel = await select({
    message: "Qual combustível você deseja?",
    choices: [
      {
        name: "Álcool",
        value: "alcool",
      },
      {
        name: "Gasolina",
        value: "gasolina",
      },
      {
        name: "Sair",
        value: "sair",
      },
    ],
    instructions: false,
  });

  if (escolhaCombustivel === "sair") {
    return;
  }

  const litros = parseFloat(
    await input({
      message: "Quantos litros você vai precisar?",
    })
  );

  let precoCombustivel = 0;
  let taxa = 0;

  // Define o preço e a porcentagem de desconto
  if (escolhaCombustivel === "alcool") {
    precoCombustivel = 2.90;

    if (litros <= 20) {
      taxa = 0.03; // 3%
    } else {
      taxa = 0.05; // 5%
    }
  } else if (escolhaCombustivel === "gasolina") {
    precoCombustivel = 3.30;

    if (litros <= 20) {
      taxa = 0.04; // 4%
    } else {
      taxa = 0.06; // 6%
    }
  }

  const precoSemDesconto = litros * precoCombustivel;
  const desconto = precoSemDesconto * taxa;
  const precoTotal = precoSemDesconto - desconto;

  console.log(`\nQuantidade de litros: ${litros}`);
  console.log(`Preço por litro: R$ ${precoCombustivel.toFixed(2)}`);
  console.log(`Desconto: R$ ${desconto.toFixed(2)}`);
  console.log(`Valor total: R$ ${precoTotal.toFixed(2)}`);
  console.log('-------------------------------------------------')
  
  const escolha = await acao("Calcular Novamente")
  if(escolha === "repetir"){
    calculadorCombustivelNecessario();
    return
  }
};

const mostrarMensagem = () => {
  if (mensagem !== "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const rodarSistemaCombustivel = async () => {
  while (true) {
    console.clear();
    mostrarMensagem();

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Calcular Quantidade Necessaria",
          value: "calculadorcombustivelnecessario"
        },
        {
          name: "Calcular Valor Combustivel",
          value: "calcularvalorcombustivel"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    });

    switch (opcao) {
      case "calculadorcombustivelnecessario":
        await calculadorCombustivelNecessario();
        break;
      case "calcularvalorcombustivel":
        await calcularValorCombustivel();
        break;
      case "sair":
        console.log("Saindo...");
        return;
      default:
        console.log("Opcao nao encontrada...");
    }
  }
};

module.exports = rodarSistemaCombustivel;
