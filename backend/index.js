require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const alunoRoutes = require("./routes/alunos");
const professorRoutes = require("./routes/professores");
const turmaRoutes = require("./routes/turmas");
const ocorrenciaRoutes = require("./routes/ocorrencias");
const disciplinaRoutes = require("./routes/disciplinas");
const usuarioRoutes = require("./routes/usuarios");

app.use("/auth", authRoutes);
app.use("/alunos", alunoRoutes);
app.use("/professores", professorRoutes);
app.use("/turmas", turmaRoutes);
app.use("/disciplinas", disciplinaRoutes);
app.use("/ocorrencias", ocorrenciaRoutes);
app.use("/usuarios", usuarioRoutes);

app.get("/", (req, res) => {
    res.send("API rodando");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});