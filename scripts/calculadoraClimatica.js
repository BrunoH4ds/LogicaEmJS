const { input, select } = require('@inquirer/prompts');

let mensagem = "Bem vindo a calculadora de clima!!!";

const acao = async (nomeRepetir) => {
  return await select({
    message: "O que deseja fazer agora?",
    choices: [
      { name: !nomeRepetir ? "Repetir" : nomeRepetir, value: "repetir" },
      { name: "Voltar", value: "voltar" }
    ]
  });
};

const fahrenheitParaCelsius = async () => {
  const temperatura = parseFloat(await input({ message: "Qual a temperatura que gostaria de transformar ?" }))

  resultadoTemperatura = (5 / 9) * (temperatura - 32);

  console.log(`Temperatura Escolhida: ${temperatura.toFixed(2)}F`)
  console.log(`Temperatura transformada: ${resultadoTemperatura.toFixed(2)}C`)
  console.log('-------------------------------------------------')

  const escolha = await acao("Fazer Outro Calculo");
  if (escolha === "repitir") {
    await fahrenheitParaCelsius();
    return;
  }
}

const celsiusParaFahrenheit = async () => {
  const temperatura = parseFloat(await input({ message: "Qual a temperatura que gostaria de transformar ?" }))

  resultadoTemperatura = (5 / 9) * (temperatura + 32);

  console.log(`Temperatura Escolhida: ${temperatura.toFixed(2)}C`)
  console.log(`Temperatura transformada: ${resultadoTemperatura.toFixed(2)}F`)
  console.log('-------------------------------------------------')

  const escolha = await acao("Fazer Outro Calculo");
  if (escolha === "repitir") {
    await celsiusParaFahrenheit();
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


const rodarCalculoClimatico = async () => {
  while (true) {
    console.clear();
    mostrarMensagem();

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Fahrenheit para Celsius",
          value: "fahrenheitparacelsius"
        },
        {
          name: "Celsius para Fahrenheit",
          value: "celsiusparafahrenheit"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    });
    switch (opcao) {
      case "fahrenheitparacelsius":
        await fahrenheitParaCelsius();
        break;

      case "celsiusparafahrenheit":
        await celsiusParaFahrenheit();
        break;
      case "sair":
        console.log("Saindo...");
        return;
      default:
        console.log("Opcao nao encontrada...");
    }
  }
}

module.exports = rodarCalculoClimatico