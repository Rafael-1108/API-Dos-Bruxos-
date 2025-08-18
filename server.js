//importando express, todos os bruxos criados em bruxos.js e a página inicial
import express from "express";
import bruxos from "./src/data/bruxos.js";

const app = express();
const serverPort = 5000;
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

//Rota das casas (rota adicional copiada do professor)
app.get('/casas', (req, res) => {
  res.json({
    casas: [
      { nome: "Grifinória", animal: "🦁", fundador: "Godrico Gryffindor" },
      { nome: "Sonserina", animal: "🐍", fundador: "Salazar Slytherin" },
      { nome: "Corvinal", animal: "🦅", fundador: "Rowena Ravenclaw" },
      { nome: "Lufa-lufa", animal: "🦡", fundador: "Helga Hufflepuff" }
    ]
  });
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

  // Se existir enviar na resposta com o res e o status 200
res.status(200).json(bruxo);
} else {

  // Se nao existir, enviar na resposta um feedback e o status 400
res.status(404).json({
mensagem: "Bruxo não encontrado!"
    }) 
  }
})

app.listen(serverPort, () => {
    console.log(`🧙‍♂️ API dos Bruxos está no ar na porta ${serverPort}!`);
    console.log(`Servidor rodando em http://localhost:${serverPort}`);
});
