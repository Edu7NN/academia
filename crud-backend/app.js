const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; // Porta do backend

async function connect() {
  if (global.db) return global.db;
  try {
    const conn = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    global.db = conn.db("academia"); // Nome do banco de dados
    console.log("Conexão com MongoDB estabelecida!");
    return global.db;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}

// Middleware
app.use(express.json()); // Permite processar JSON
app.use(cors()); // Libera requisições de outros domínios
app.use((req, res, next) => {
  console.log(`Recebendo requisição ${req.method} para ${req.url}`);
  console.log("Body:", req.body); // Mostra os dados enviados no corpo da requisição
  next(); // Permite que a requisição continue
});

// Rotas
const router = express.Router();

// Teste de conexão
router.get("/", (req, res) => res.json({ message: "API funcionando!" }));

/* GET /users - Lista todos os usuários */
router.get("/users", async (req, res) => {
  try {
    console.log("Buscando todos os usuários...");
    const db = await connect();
    const users = await db.collection("users").find().toArray();
    console.log(`Encontrados ${users.length} usuários`);
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

/* GET /users/:id - Obtém um único usuário pelo ID */
router.get("/users/:id", async (req, res) => {
  try {
    const db = await connect();
    const user = await db.collection("users").findOne({ _id: new ObjectId(req.params.id) });
    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado" });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

/* POST /users - Cria um novo usuário */
router.post("/users", async (req, res) => {
  try {
    console.log("Dados recebidos para criação:", req.body);
    const { nome, email, plano } = req.body; // Inclua o "plano" no body
    const db = await connect();
    const result = await db.collection("users").insertOne({ nome, email, plano });

    const novoUsuario = { _id: result.insertedId, nome, email, plano }; // Retorne os dados com o ID
    console.log("Usuário inserido com sucesso:", novoUsuario);

    res.status(201).json(novoUsuario); // Responda com o objeto recém-criado
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

/* PUT /users/:id - Atualiza um usuário existente */
router.put("/users/:id", async (req, res) => {
  try {
    const { nome, email, plano } = req.body; // Inclua "plano"
    const db = await connect();
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { nome, email, plano } }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ error: "Usuário não encontrado" });
    } else {
      res.json({ message: "Usuário atualizado com sucesso" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

/* DELETE /users/:id - Remove um usuário */
router.delete("/users/:id", async (req, res) => {
  try {
    const db = await connect();
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Usuário não encontrado" });
    } else {
      res.json({ message: "Usuário removido com sucesso" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover usuário" });
  }
});

router.post("/auth/login", async (req, res) => {
  const { nome, email } = req.body;

  try {
    const db = await connect();

    // Verifica se o usuário existe no banco de dados
    const user = await db.collection("users").findOne({ nome, email });

    if (user) {
      res.status(200).json({ message: "Login bem-sucedido!" });
    } else {
      res.status(401).json({ error: "Nome ou e-mail inválido." });
    }
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});


// Configuração do servidor
app.use("/", router);

app.listen(port, () => {
  console.log(`API funcionando na porta ${port}`);
});
