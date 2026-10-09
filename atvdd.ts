// ===== CLASSE CONSUMIDOR: guarda os dados, valida e sabe se apresentar =====
class Consumidor {
    // as propriedades (os campos da "ficha")
    nome: string;
    idade: number;
    email: string;

    // constructor: roda quando fazemos "new Consumidor(...)"
    constructor(nome: string, idade: number, email: string) {
        // validação 1: nome não pode ser vazio (trim tira espaços das pontas)
        if (nome.trim() === "") {
            throw new Error("Nome não pode ser vazio");
        }

        // validação 2: idade não pode ser negativa nem absurda
        if (idade < 0 || idade > 120) {
            throw new Error("Idade inválida");
        }

        // validação 3: email precisa ter @
        if (!email.includes("@")) {
            throw new Error("Email inválido");
        }

        // só chega aqui se passou em todas as validações: guarda os dados
        this.nome = nome;
        this.idade = idade;
        this.email = email;
    }

    // método: o consumidor monta o texto de apresentação dele mesmo
    formatarExibicao(): string {
        return `Consumidor: ${this.nome} (${this.idade} anos) - ${this.email}`;
    }
}

// ===== CLASSE CADASTRO: o "caderno" que guarda vários consumidores =====
class CadastroConsumidores {
    // a lista começa vazia
    lista: Consumidor[] = [];

    // anota um consumidor novo no caderno
    adicionar(consumidor: Consumidor): void {
        this.lista.push(consumidor);
    }

    // calcula a média de idade de todo mundo
    calcularMediaIdade(): number {
        // lista vazia: devolve 0 (evita dividir por zero)
        if (this.lista.length === 0) {
            return 0;
        }

        let soma = 0; // começa a soma zerada

        // passa por cada consumidor e junta a idade na soma
        for (const c of this.lista) {
            soma = soma + c.idade;
        }

        // soma dividida pela quantidade de pessoas
        return soma / this.lista.length;
    }

    // descobre quem é o mais velho e o mais novo
    obterExtremosIdade(): { maisVelho: Consumidor | undefined; maisNovo: Consumidor | undefined } {
        // começa assumindo que o primeiro da lista é os dois (undefined se a lista for vazia)
        let maisVelho: Consumidor | undefined = this.lista[0];
        let maisNovo: Consumidor | undefined = this.lista[0];

        // só procura se a lista tem alguém
        if (maisVelho !== undefined && maisNovo !== undefined) {
            for (const c of this.lista) {
                // achou alguém mais velho que o atual campeão? troca
                if (c.idade > maisVelho.idade) maisVelho = c;
                // achou alguém mais novo que o atual campeão? troca
                if (c.idade < maisNovo.idade) maisNovo = c;
            }
        }

        return { maisVelho, maisNovo };
    }
}

// ===== EXECUÇÃO DE TESTE =====
const cadastro = new CadastroConsumidores();

// cria cada consumidor com "new" e adiciona no caderno
cadastro.adicionar(new Consumidor("Ana Silva", 30, "ana@email.com"));
cadastro.adicionar(new Consumidor("Carlos Souza", 22, "carlos@email.com"));
cadastro.adicionar(new Consumidor("Mariana Lima", 45, "mariana@email.com"));
cadastro.adicionar(new Consumidor("Roberto Alves", 19, "roberto@email.com"));
cadastro.adicionar(new Consumidor("Fernanda Dias", 33, "fernanda@email.com"));

console.log("=== LISTA DE CONSUMIDORES ===");
// cada consumidor se apresenta sozinho
cadastro.lista.forEach(c => console.log(c.formatarExibicao()));

console.log("\n=== ANÁLISE ESTATÍSTICA ===");
// toFixed(1) deixa com 1 casa decimal
console.log(`Média das Idades: ${cadastro.calcularMediaIdade().toFixed(1)} anos`);

// pega os dois resultados de uma vez
const { maisVelho, maisNovo } = cadastro.obterExtremosIdade();
if (maisVelho !== undefined && maisNovo !== undefined) {
    console.log(`Mais Velho(a): ${maisVelho.nome} (${maisVelho.idade} anos)`);
    console.log(`Mais Novo(a): ${maisNovo.nome} (${maisNovo.idade} anos)`);
} else {
    console.log("Não foi possível calcular os extremos de idade");
}