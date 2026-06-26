const db = require("../config/db");

exports.listar = (req, res) => {
    db.query("SELECT * FROM disciplina", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.criar = (req, res) => {
    const { descricao } = req.body;

    if (!descricao) {
        return res.status(400).json({ erro: "Descrição da disciplina é obrigatória" });
    }

    db.query("INSERT INTO disciplina (descricao) VALUES (?)", [descricao], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Disciplina criada com sucesso!" });
    });
};

exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { descricao } = req.body;

    if (!id) {
        return res.status(400).json({ erro: "ID da disciplina é obrigatório" });
    }

    if (!descricao) {
        return res.status(400).json({ erro: "Descrição da disciplina é obrigatória" });
    }

    db.query("UPDATE disciplina SET descricao = ? WHERE id = ?", [descricao, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Disciplina atualizada com sucesso!" });
    });
};

exports.deletar = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: "ID da disciplina é obrigatório" });
    }

    db.query("DELETE FROM disciplina WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Disciplina deletada com sucesso!" });
    });
};
