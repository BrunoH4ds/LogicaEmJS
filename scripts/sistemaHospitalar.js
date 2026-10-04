const { input, select } = require("@inquirer/prompts");

let mensagem = "Bem vindo ao Sistema Hosp!!!";

const pacientes = [];
const doutores = [];

let numeroFichaVacina = 0;
let numeroFichaConsulta = 0;

const acao = async (nomeRepetir) => {
  return await select({
    message: "O que deseja fazer agora?",
    choices: [
      {
        name: !nomeRepetir ? "Repetir" : nomeRepetir,
        value: "repetir"
      },
      {
        name: "Voltar",
        value: "voltar"
      }
    ]
  });
};

const retirarFicha = async () => {
  const escolhaFicha = await select({
    message: "Qual o tipo de ficha?",
    choices: [
      {
        name: "Vacina",
        value: "v",
      },
      {
        name: "Consulta",
        value: "c",
      },
      {
        name: "Voltar",
        value: "voltar",
      },
    ],
    instructions: false,
  });

  if (escolhaFicha === "voltar") {
    return;
  }

  if (escolhaFicha === "v") {
    numeroFichaVacina++;

    console.log(`Sua ficha é: V${numeroFichaVacina}`);
  }

  if (escolhaFicha === "c") {
    numeroFichaConsulta++;

    console.log(`Sua ficha é: C${numeroFichaConsulta}`);
  }

  console.log("-------------------------------------------------");

  const escolha = await acao("Retirar outra ficha");

  if (escolha === "repetir") {
    await retirarFicha();
  }
};

const cadastrarPaciente = async () => {
  const nome = await input({
    message: "Nome do paciente:",
  });

  const idade = await input({
    message: "Idade:",
  });

  const cpf = await input({
    message: "CPF:",
  });

  const telefone = await input({
    message: "Telefone:",
  });

  pacientes.push({
    nome,
    idade,
    cpf,
    telefone,
  });

  console.log("Paciente cadastrado com sucesso!");
  console.log("-------------------------------------------------");

  const escolha = await acao("Cadastrar outro paciente");

  if (escolha === "repetir") {
    await cadastrarPaciente();
  }
};

const anexarDoutor = async () => {
  const opcao = await select({
    message: "O que deseja fazer?",
    choices: [
      {
        name: "Cadastrar doutor",
        value: "cadastrar",
      },
      {
        name: "Listar doutores",
        value: "listar",
      },
      {
        name: "Voltar",
        value: "voltar",
      },
    ],
  });

  if (opcao === "voltar") {
    return;
  }

  if (opcao === "cadastrar") {
    const nome = await input({
      message: "Nome do doutor:",
    });

    const especialidade = await input({
      message: "Especialidade:",
    });

    const crm = await input({
      message: "CRM:",
    });

    doutores.push({
      nome,
      especialidade,
      crm,
    });

    console.log("Doutor cadastrado com sucesso!");
    console.log("-------------------------------------------------");

    const escolha = await acao("Cadastrar outro doutor");

    if (escolha === "repetir") {
      await anexarDoutor();
    }

    return;
  }

  if (opcao === "listar") {
    console.log("\n===== DOUTORES =====");

    if (doutores.length === 0) {
      console.log("Nenhum doutor cadastrado.");
    } else {
      doutores.forEach((doutor, index) => {
        console.log("");
        console.log(`Doutor ${index + 1}`);
        console.log(`Nome: ${doutor.nome}`);
        console.log(`Especialidade: ${doutor.especialidade}`);
        console.log(`CRM: ${doutor.crm}`);
        console.log("-------------------------------------------------");
      });
    }

    const escolha = await acao("Atualizar");

    if (escolha === "repetir") {
      await anexarDoutor();
    }
  }
};

const contato = async () => {
  console.log("===== CONTATOS =====");
  console.log("");
  console.log("Hospital Hosp");
  console.log("Telefone: (11) 99999-9999");
  console.log("Email: contato@hospital.com");
  console.log("Endereço: Rua Principal, 100");
  console.log("Horário: Segunda a sexta, 08:00 às 18:00");
  console.log("-------------------------------------------------");

  const escolha = await acao("Atualizar");

  if (escolha === "repetir") {
    await contato();
  }
};

const listarPacientes = async () => {
  console.log("===== PACIENTES =====");

  if (pacientes.length === 0) {
    console.log("Nenhum paciente cadastrado.");
  } else {
    pacientes.forEach((paciente, index) => {
      console.log("");
      console.log(`Paciente ${index + 1}`);
      console.log(`Nome: ${paciente.nome}`);
      console.log(`Idade: ${paciente.idade}`);
      console.log(`CPF: ${paciente.cpf}`);
      console.log(`Telefone: ${paciente.telefone}`);
      console.log("-------------------------------------------------");
    });
  }

  const escolha = await acao("Atualizar");

  if (escolha === "repetir") {
    await listarPacientes();
  }
};

const mostrarMensagem = () => {
  if (mensagem !== "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const rodarSistemaHospitalar = async () => {
  while (true) {
    console.clear();

    mostrarMensagem();

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Retirar ficha",
          value: "ficha",
        },
        {
          name: "Cadastrar paciente",
          value: "cadastrarPaciente",
        },
        {
          name: "Listar pacientes",
          value: "listarPacientes",
        },
        {
          name: "Doutores",
          value: "anexarDoutor",
        },
        {
          name: "Contatos",
          value: "contatoHosp",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    console.clear();

    switch (opcao) {
      case "ficha":
        await retirarFicha();
        break;

      case "cadastrarPaciente":
        await cadastrarPaciente();
        break;

      case "listarPacientes":
        await listarPacientes();
        break;

      case "anexarDoutor":
        await anexarDoutor();
        break;

      case "contatoHosp":
        await contato();
        break;

      case "sair":
        console.log("Saindo do sistema...");
        return;

      default:
        console.log("Opção não encontrada.");
    }
  }
};

module.exports = rodarSistemaHospitalar;
