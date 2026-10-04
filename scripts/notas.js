const { input, select } = require('@inquirer/prompts');

let mensagem = "Bem vindo ao Calculador de Notas 2000!!!";

const acao = async () => {
  return await select({
    message: "O que deseja fazer agora?",
    choices: [
      { name: "Repetir", value: "repetir" },
      { name: "Voltar", value: "voltar" }
    ]
  });
};

/*================Media simples================*/
const aritmeticaSimples = async () => {
  console.clear();

  const quantidade = parseInt(
    await input({ message: "De quantas notas deseja tirar a media?" })
  );

  let totalNotas = 0;
  let resultado = 0
  let contador = 1;

  while (contador <= quantidade) {
    const valor = parseInt(
      await input({ message: `Digite o valor da ${contador}º nota :` })
    );
    if (valor > 10 || valor < 0) {
      console.log("=========================================");
      console.log("NOTA INVALIDA: O valor precisa ser maior que 0 e menor que 10");
      console.log("=========================================");
      await new Promise(resolve => setTimeout(resolve, 2000));
      return;
    }

    totalNotas += valor;
    contador++;
  }

  resultado = totalNotas / quantidade

  console.clear();
  console.log(`A Media do Aluno é de: ${resultado}`);
  console.log("=========================================");

  const escolha = await acao();

  if (escolha === "repetir") {
    await calculadorNotas();
  }
};

/*================Media ponderada================*/
const aritmeticaPonderada = async () => {
  console.clear();

  const quantidade = parseInt(
    await input({ message: "De quantas notas deseja tirar a media?" })
  );

  let totalNotas = 0;
  let resultado = 0
  let contador = 1;
  let porcentagemUsada = 0;
  let pesoPorcentagem = 0;

  while (contador <= quantidade) {
    const valor = parseInt(
      await input({ message: `Digite o valor da ${contador}º nota :` })
    );
    if (valor > 10 || valor < 0) {
      console.log("=========================================");
      console.log("NOTA INVALIDA: O valor precisa ser maior que 0 e menor que 10");
      console.log("=========================================");
      await new Promise(resolve => setTimeout(resolve, 2000));
      return;
    }
    if (quantidade > 1) {
      const peso = parseInt(await input({ message: `Qual o peso da ${contador}º nota (Ex: 30%) :` }));
      if (peso > 100 || peso < 0) {
        console.log("=========================================");
        console.log("PESO INVALIDO: O valor nao pode ser maior que 100% e menor que 0%");
        console.log("=========================================");
        await new Promise(resolve => setTimeout(resolve, 2000));
        return;
      }
      porcentagemUsada += peso;
      if (porcentagemUsada > 100 || porcentagemUsada < 0) {
        console.log("=========================================");
        console.log("PORCENTAGEM INVALIDO: Voce nao pode usar mais que 100% ou menos que 0%");
        console.log("=========================================");
        await new Promise(resolve => setTimeout(resolve, 2000));
        return;
      }
      console.log(`PORCENTAGEM UTILIZADA: De 100% foi usado ${porcentagemUsada}% do peso`)
    }
    peso = 100
    console.log("=========================================");
    pesoPorcentagem = peso / 100;
    totalNotas += valor * pesoPorcentagem;
    contador++;
  }

  resultado = totalNotas / quantidade

  console.log(`A Media do Aluno é de: ${resultado}`);
  console.log("=========================================");

  const escolha = await acao();

  if (escolha === "repetir") {
    await calculadorNotas();
  }
};

const mostrarMensagem = () => {
  if (mensagem !== "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const rodarCalculadoraNotas = async () => {
  while (true) {
    console.clear();
    mostrarMensagem();

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Aritmética Simples",
          value: "simples"
        },
        {
          name: "Aritmética Ponderada",
          value: "ponderada"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    });

    switch (opcao) {
      case "simples":
        await aritmeticaSimples();
        break;

      case "ponderada":
        await aritmeticaPonderada();
        break;

      case "sair":
        console.log("Saindo...");
        return;
      default:
        console.log("Opcao nao encontrada...");
    }
  }
};

module.exports = rodarCalculadoraNotas;
