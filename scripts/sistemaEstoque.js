const { input, select } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo ao sistema de estoque!!!";

const CamposPermitidos = ["idProd","nomeProd","quantidadeProd"]

const acao = async (nomeRepetir) => {
  return await select({
    message: "O que deseja fazer agora?",
    choices: [
      { name: !nomeRepetir ? "Repetir" : nomeRepetir, value: "repetir" },
      { name: "Voltar", value: "voltar" }
    ]
  });
};

const carregarInventario = async () => {
  try {
    const dados = await fs.readFile("./database/inventario.json", "utf-8")
    produtos = JSON.parse(dados)
  } catch (error) {
    produtos = []
  }
}

const salvarInventario = async () => {
  await fs.writeFile("./database/inventario.json", JSON.stringify(produtos, CamposPermitidos, 2))
}

const adicionarInventario = async () => {
  const produto = await input({ message: "Qual o Produto que voce deseja Adicionar ?" })
  if (produto.length = 0) {
    console.log("PRODUTO INVALIDO: Produto nao pode estar vazio!!!");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }
  const quantidade = parseInt(await input({ message: `Qual a quantide de ${produto} voce gostaria de adicionar ?` }))
  if (quantidade < 0) {
    console.log("QUANTIDADE INVALIDA: nao é possivel ter menos que 0");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }

  let id = produtos.length + 1

  produtos.push(
    { idProd: id, nomeProd: produto, quantidadeProd: quantidade, }
  )
  console.log("=====================================")
  console.log(`Produto: ${id}`)
  console.log(`Nome: ${produto}`)
  console.log(`Quantidade: ${quantidade}`)
  console.log("=====================================")
  console.log(`PRODUTO CADASTRADO COM SUCESSO`)
  console.log("=====================================")
  let escolha = await acao("Cadastrar outro produto")
  if (escolha === "repetir") {
    await adicionarInventario();
    return;
  }
}

const listarInventario = async () => {
  if (produtos.length === 0) {
    console.log("A lista não tem produtos...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }

  console.log("SEU INVENTARIO");
  console.log("=====================================")
  for (const prod of produtos) {
    console.log(`ID: ${prod.idProd} | ${prod.nomeProd} - Qtd: ${prod.quantidadeProd}`);
  }
  console.log("=====================================")
  let escolha = await acao("Atualizar")
  if (escolha === "repetir") {
    await listarInventario();
    return;
  }
};

const deletarInventario = async () => {
  if (produtos.length === 0) {
    console.log("A lista não tem produtos para deletar...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }

  const escolhasProdutos = produtos.map((prod) => {
    return {
      name: `${prod.nomeProd} (Qtd: ${prod.quantidadeProd})`,
      value: prod.idProd,
    };
  });

  escolhasProdutos.push({
    name: "Sair",
    value: "sair",
  });

  const itemADeletar = await select({
    message: "Selecione o item que deseja deletar:",
    choices: escolhasProdutos,
    instructions: false,
  });

  if (itemADeletar === "sair") {
    return;
  }

  produtos = produtos.filter((prod) => {
    return prod.idProd !== itemADeletar;
  });

  produtos = produtos.map((prod, index) => {
    prod.idProd = index + 1;
    return prod;
  });

  console.log("Produto deletado com sucesso!");

  let escolha = await acao("Continuar Deletando");

  if (escolha === "repetir") {
    await deletarInventario();
    return;
  }
};

const editarInventario = async () => {
  if (produtos.length === 0) {
    console.log("A lista não tem produtos para editar...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }

  const escolhasProdutos = produtos.map((prod) => {
    return {
      name: `${prod.nomeProd} (Qtd: ${prod.quantidadeProd})`,
      value: prod.idProd,
    };
  });

  escolhasProdutos.push({
    name: "Sair",
    value: "sair",
  });

  const itemAEditar = await select({
    message: "Selecione o produto que deseja editar:",
    choices: escolhasProdutos,
    instructions: false,
  });

  if (itemAEditar === "sair") {
    return;
  }

  const produto = produtos.find((prod) => prod.idProd === itemAEditar);

  const escolhaEdicao = await select({
    message: `O que deseja editar em "${produto.nomeProd}"?`,
    choices: [
      {
        name: "Nome",
        value: "nome",
      },
      {
        name: "Quantidade",
        value: "quantidade",
      },
      {
        name: "Sair",
        value: "sair",
      },
    ],
    instructions: false,
  });

  if (escolhaEdicao === "sair") {
    return;
  }

  if (escolhaEdicao === "nome") {
    const novoNome = await input({
      message: "Digite o novo nome:",
      default: produto.nomeProd,
    });

    if (novoNome.length = 0) {
      console.log("O nome não pode ficar vazio!");
      return;
    }

    produto.nomeProd = novoNome.trim();

    console.log("Nome alterado com sucesso!");
  }

  if (escolhaEdicao === "quantidade") {
    const novaQuantidade = await input({
      message: "Digite a nova quantidade:",
      default: String(produto.quantidadeProd),
    });

    const quantidade = Number(novaQuantidade);

    if (quantidade < 0) {
      console.log("Quantidade inválida!");
      return;
    }

    produto.quantidadeProd = quantidade;

    console.log("Quantidade alterada com sucesso!");
  }

  let escolha = await acao("Continuar Editando");

  if (escolha === "repetir") {
    await editarInventario();
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



const rodarSistemaEstoque = async () => {
  await carregarInventario();
  while (true) {
    console.clear();
    mostrarMensagem()
    await salvarInventario();

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Ver Inventario",
          value: "listarInventario"
        },
        {
          name: "Adicionar Inventario",
          value: "adicionarInventario"
        },
        {
          name: "Remover Inventario",
          value: "removerInventario"
        },
        {
          name: "Editar Inventario",
          value: "editarInventario"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    });
    switch (opcao) {
      case "listarInventario":
        await listarInventario();
        break;
      case "adicionarInventario":
        await adicionarInventario();
        break;
      case "removerInventario":
        await deletarInventario();
        break;
      case "editarInventario":
        await editarInventario();
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

module.exports = rodarSistemaEstoque;