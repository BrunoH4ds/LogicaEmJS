const { input, select } = require('@inquirer/prompts')

let mensagem = "Bem vindo ao Par/Impars!!!";

const acao = async () => {
  return await select({
    message: "O que deseja fazer agora?",
    choices: [
      { name: "Repetir", value: "repetir" },
      { name: "Voltar", value: "voltar" }
    ]
  });
};

const par = async () => {
  const valorInicial = parseInt(await input({ message: "Digite o valor inicial para descobrir os pares:" }))
  const valorFinal = parseInt(await input({ message: "Digite o  valor Final para descobrir os pares: " }))
  if (valorInicial > valorFinal) {
    console.log("O valor final nao pode ser menor que o inicial");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }
  let contador = valorInicial;
  while (contador < valorFinal) {

    if (contador % 2 === 0) {
      console.log(`${contador} é Par`);
      console.log("=========================================");
    }

    contador++;
  }

  const escolha = await acao();
  if (escolha === "repetir") {
    await par();
  }
}

const impar = async () => {
  const valorInicial = parseInt(await input({ message: "Digite o valor inicial para descobrir os pares:" }))
  const valorFinal = parseInt(await input({ message: "Digite o  valor Final para descobrir os pares: " }))
  if (valorInicial > valorFinal) {
    console.log("O valor final nao pode ser menor que o inicial");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }
  let contador = valorInicial;

  while (contador < valorFinal) {
    if (contador % 2 !== 0) {
      console.log(`${contador} é Impar`);
      console.log("=========================================");
    }

    contador++;
  }

  const escolha = await acao();
  if (escolha === "repetir") {
    await par();
  }
}

const mostrarMensagem = () => {
  if (mensagem !== "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const rodarParImpars = async () => {
  while (true) {
    console.clear();
    mostrarMensagem();

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Par",
          value: "par"
        },
        {
          name: "Impar",
          value: "impar"
        },
        {
          name: "Sair",
          value: "sair"
        },
      ]
    });
    switch (opcao) {
      case "par":
        await par()
        break;
      case "impar":
        await impar()
        break;
      case "sair":
        console.log("Saindo...")
        return;
      default:
        console.log("Opcao nao encontrada...");
    }
  }
}

module.exports = rodarParImpars