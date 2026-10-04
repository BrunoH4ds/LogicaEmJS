
const { select } = require('@inquirer/prompts');
const rodarCalculadora = require('./scripts/sistemaCalculadora.js');
const rodarCalculadoraNotas = require('./scripts/notas.js');
const rodarParImpars = require('./scripts/parImpar.js');
const rodarSistemaEstoque = require('./scripts/sistemaEstoque.js');
const rodarSistemaCorporativo = require('./scripts/sistemaCorporativo.js');
const rodarCalculoClimatico = require('./scripts/calculadoraClimatica.js');
const rodarSistemaCombustivel = require('./scripts/sistemaPostoCombustivel.js');
const rodarSistemaFrutaria = require('./scripts/sistemafrutaria.js');
const rodarSistemaHospitalar = require('./scripts/sistemaHospitalar.js');
const rodarCodigo = require('./scripts/39exercicio.js');

const start = async () => {
  while (true) {
    console.clear();
    console.log(`
   _____________   ____________  ___    __ 
  / ____/ ____/ | / /_  __/ __ \/   |  / / 
 / /   / __/ /  |/ / / / / /_/ / /| | / /  
/ /___/ /___/ /|  / / / / _, _/ ___ |/ /___
\____/_____/_/ |_/ /_/ /_/ |_/_/  |_/_____/                                         
`);
    console.log("=========================================");

    const programaEscolhido = await select({
      message: "Selecione o programa que deseja iniciar:",
      choices: [
        {
          name: "Calculadora",
          value: "calculadora"
        },
        {
          name: "Calculadora de Notas",
          value: "notas"
        },
        {
          name: "Descobridor de par e Impars",
          value: "parEimpar"
        },
        {
          name: "Sistema de Estoque",
          value: "sistemaEstoque"
        },
        {
          name: "Sistema Corporativo",
          value: "sistemaCorporativo"
        },
        {
          name: "Calculadora Climatica",
          value: "calculadoraClimatica"
        },
        {
          name: "Sistema Combustivel",
          value: "sistemaCombustivel"
        },
        {
          name: "Frutaria",
          value: "sistemaFrutaria"
        },
        {
          name: "Sistema Hospital",
          value: "sistemaHospital"
        },
        {
          name: "Fechar tudo",
          value: "sair"
        }
      ],
      loop: false
    });

    switch (programaEscolhido) {
      case "calculadora":
        await rodarCalculadora();
        break;
      case "notas":
        await rodarCalculadoraNotas();
        break;
      case "parEimpar":
        await rodarParImpars();
        break;
      case "sistemaEstoque":
        await rodarSistemaEstoque();
        break;
      case "sistemaCorporativo":
        await rodarSistemaCorporativo();
        break;
      case "calculadoraClimatica":
        await rodarCalculoClimatico();
        break;
      case "sistemaCombustivel":
        await rodarSistemaCombustivel();
        break;
      case "sistemaFrutaria":
        await rodarSistemaFrutaria();
        break;
      case "sistemaHospital":
        await rodarSistemaHospitalar();
        break;
      case "sair":
        console.log('Encerrando...');
        return;
    }
  }
};

start();