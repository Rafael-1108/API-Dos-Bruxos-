//importando express, todos os bruxos criados em bruxos.js e a página inicial
import express from "express";
import dados from "./src/data/dados.js";

const { bruxos, varinhas, pocoes, animais } = dados;

const app = express();
const serverPort = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <div style="
      background: linear-gradient(135deg, #1a237e, #3949ab);
      color: white;
      padding: 50px;
      text-align: center;
      font-family: 'Georgia', serif;
      min-height: 100vh;
      margin: 0;
    ">
      <h1 style="
        font-size: 3rem;
        color: #ffd700;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        margin-bottom: 20px;
      ">
        ⚡ Bem-vindo à Hogwarts! ⚡
      </h1>
      <p style="font-size: 1.5rem; margin: 20px 0;">
        🏰 Escola de Magia e Bruxaria
      </p>
      <p style="font-size: 1.2rem; opacity: 0.9;">
        "É preciso muito mais que coragem para enfrentar nossos inimigos, 
        mas muito mais ainda para enfrentar nossos amigos."
      </p>
      <div style="margin-top: 30px;">
        <span style="font-size: 1.1rem;">🦁 Grifinória | 🐍 Sonserina | 🦅 Corvinal | 🦡 Lufa-lufa</span>
      </div>
    </div>
  `);
});

//Rota bruxos;
app.get("/bruxos", (req, res) => {
    res.json(bruxos);
});

app.get("/bruxos/:id", (req, res) => {

//Pegando o id da url;
let id = req.params.id;

//Transformando id (string) em numero;
id = parseInt(id)

// Buscar no array/objeto/json
const bruxo = bruxos.find(b => b.id === id);

// Verificar se existe
if(bruxo) {

//Se existir enviar na resposta com o res e o status 200
res.status(200).json(bruxo);
} else {

//Se não existir, enviar na resposta um feedback e o status 404
res.status(404).json({
mensagem: "Bruxo não encontrado!"
    }) 
  }
});

app.get("/bruxos/name/:name", (req, res) => {
    // Pegar o nome da url
    let nome = req.params.nome.toLowerCase();

    // Buscar no array/objeto/json usando "contains"
    const bruxosEncontrados = bruxos.filter(b => 
        b.nome.toLowerCase().includes(nome)
    );

    if (bruxosEncontrados.length > 0) {
        // Se encontrar, retorna todos os que batem
        res.status(200).json(bruxosEncontrados);
    } else {
        // Se nao existir, enviar feedback e status 404
        res.status(404).json({
            mensagem: "Bruxo(s) nao encontrado(s)!"
        });
    }
});


app.get("/bruxos/casa/:casa", (req, res) => {
    let casa = req.params.casa;

    const bruxosDaCasa = bruxos.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    if (bruxosDaCasa.length > 0) {
        res.status(200).json(bruxosDaCasa);
    } else {

        res.status(404).json({
            mensagem: "Nenhum bruxo encontrado nessa casa!"
        })
    }
});

// Rota para buscar bruxos mortos
app.get("/bruxos/vivos/nao", (req, res) => {
const resultado = bruxos.filter((b) => !b.status);
  if (resultado) {
res.status(200).json(resultado);
} else {
res.status(404).json({ erro: "Nenhum bruxo morto encontrado"});
}
});

app.get("/varinhas", (req,res) => {
  res.status(200).json(varinhas);
});

app.get("/animais", (req, res) => {
  res.status(200).json(animais);
});

app.get("/pocoes", (req, res) => {
  res.status(200).json(pocoes);
});

app.get("/varinhas/id/:id", (req, res) => {

  let id = req.params.id;
  id = parseInt(id)
  const varinha = varinhas.find(v => v.id === id);
    if (varinha) {
      res.status(200).json(varinha);
  } else {
    res.status(404).json({
      mensagem: `Varinha com o id ${id} não encontrada!`
    }) 
  }
});

app.get("/pocoes/id/:id", (req, res) => {

  let id = req.params.id;
  id = parseInt(id)
  const pocao = pocoes.find(p => p.id === id);
    if (pocao) {
      res.status(200).json(pocao);
  } else {
    res.status(404).json({
      mensagem: `Poção com o id ${id} não encontrada!`
    }) 
  }
});

app.get("/animais/id/:id", (req, res) => {

  let id = req.params.id;
  id = parseInt(id)
  const animal = animais.find(a => a.id === id);
    if (animal) {
      res.status(200).json(animal);
  } else {
    res.status(404).json({
      mensagem: `Animal com o id ${id} não encontrado!`
    }) 
  }
});

// Iniciar o servidor
app.listen(serverPort, () => {
    console.log(`🧙‍♂️ API dos Bruxos está no ar na porta ${serverPort}!`);
    console.log(`Servidor rodando em http://localhost:${serverPort}`);
});
