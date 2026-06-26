const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verificarToken } = require("../middlewares/authMiddleware");

const tiposValidos = ["admin", "professor", "aluno"];

// criar usuário
router.post("/", verificarToken, (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({ erro: "Tipo de usuário inválido." });
    }

    const sql = "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";

    db.query(sql, [nome, email, senha, tipo], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({ mensagem: "Usuário criado com sucesso" });
    });
});

module.exports = router;