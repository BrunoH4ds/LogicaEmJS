const { input, select } = require('@inquirer/prompts');

let mensagem = "Bem vindo a Calculadora!!!";

const acao = async () => {
  return await select({
    message: "O que deseja fazer agora?",
    choices: [
      { name: "Nova Soma", value: "repetir" },
      { name: "Voltar", value: "voltar" }
    ]
  });
};

/*================SOMAR===================*/
const somar = async () => {
  console.clear();

  const quantidade = parseInt(
    await input({ message: "Quantos números deseja somar?" })
  );

  if (quantidade <= 1) {
    console.log("Não é possível somar um valor único");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }

  let resultado = 0;
  let contador = 1;

  while (contador <= quantidade) {
    const valor = parseInt(
      await input({ message: `Digite o ${contador}º número:` })
    );

    resultado += valor;
    contador++;
  }

  console.clear();
  console.log(`Resultado da soma: ${resultado}`);
  console.log("=========================================");

  const escolha = await acao();

  if (escolha === "repetir") {
    await somar();
  }
};

/*================SUBTRACAO===============*/
const subtrair = async () => {
  console.clear();

  const quantidade = parseInt(
    await input({ message: "Quantos números deseja subtrair?" })
  );

  if (quantidade <= 1) {
    console.log("Não é possível subtrair um valor único");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }

  let contador = 1;

  const primeiroValor = parseInt(
    await input({ message: "Digite o 1º número:" })
  );

  let resultado = primeiroValor;
  contador++;

  while (contador <= quantidade) {
    const valor = parseInt(
      await input({ message: `Digite o ${contador}º número:` })
    );

    resultado -= valor;
    contador++;
  }

  console.clear();
  console.log(`Resultado da subtração: ${resultado}`);
  console.log("=========================================");

  const escolha = await acao();

  if (escolha === "repetir") {
    await subtrair();
  }
};

/*================DIVISAO=================*/
const dividir = async () => {
  console.clear();

  const primeiroValor = parseFloat(
    await input({ message: "Digite o valor que vai ser dividido:" })
  );

  let resultado = primeiroValor;

  const segundoValor = parseFloat(
    await input({ message: `Digite o divisor número:` })
  );

  if (segundoValor === 0) {
    console.log("Não é possível dividir por zero!");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }

  resultado /= segundoValor;

  console.clear();
  console.log(`Resultado da divisão: ${resultado}`);
  console.log("=========================================");

  const escolha = await acao();

  if (escolha === "repetir") {
    await dividir();
  }
};

/*================MULTIPLICACAO===========*/
const multiplicacao = async () => {
  console.clear();

  const primeiroValor = parseFloat(
    await input({ message: "Digite o 1º número:" })
  );

  let resultado = primeiroValor;

  const segundoValor = parseFloat(
    await input({ message: `Digite o 2º número:` })
  );

  resultado *= segundoValor;

  console.clear();
  console.log(`Resultado da multiplicacao é: ${resultado}`);
  console.log("=========================================");

  const escolha = await acao();

  if (escolha === "repetir") {
    await dividir();
  }
};

/*================ELEVADO=================*/
const elevado = async () => {
  console.clear();

  const primeiroValor = parseFloat(
    await input({ message: "Digite o 1º número:" })
  );

  const segundoValor = parseFloat(
    await input({ message: "Digite o valor que sera elevado:" })
  );

  const resultado = primeiroValor ** segundoValor;

  console.clear();
  console.log(`Resultado da potência: ${resultado}`);
  console.log("=========================================");

  const escolha = await acao();

  if (escolha === "repetir") {
    await elevado();
  }
};

const mostrarMensagem = () => {
  if (mensagem !== "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const rodarCalculadora = async () => {
  while (true) {
    console.clear();
    mostrarMensagem();

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Soma",
          value: "somar"
        },
        {
          name: "Subtracao",
          value: "subtrair"
        },
        {
          name: "Divisao",
          value: "dividir"
        },
        {
          name: "Multiplicacao",
          value: "multiplicar"
        },
        {
          name: "Elevado",
          value: "elevado"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    });

    switch (opcao) {
      case "somar":
        await somar();
        break;

      case "subtrair":
        await subtrair()
        break;

      case "dividir":
        await dividir()
        break;

      case "multiplicar":
        await multiplicacao()
        break;

      case "elevado":
        await elevado()
        break;

      case "sair":
        console.log("Saindo...");
        return;
      default:
        console.log("Opcao nao encontrada...");
    }
  }
};

module.exports = rodarCalculadora;
