require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
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
    res.json({ status: "API rodando", ambiente: process.env.NODE_ENV || "development" });
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});