const db = require("../config/db");

exports.listar = (req, res) => {
    db.query("SELECT * FROM turmas", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.criar = (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ erro: "Nome da turma é obrigatório" });
    }

    db.query("INSERT INTO turmas (nome) VALUES (?)", [nome], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Turma criada com sucesso!" });
    });
};

exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (!id) {
        return res.status(400).json({ erro: "ID da turma é obrigatório" });
    }

    if (!nome) {
        return res.status(400).json({ erro: "Nome da turma é obrigatório" });
    }

    db.query("UPDATE turmas SET nome = ? WHERE id = ?", [nome, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Turma atualizada com sucesso!" });
    });
};

exports.deletar = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: "ID da turma é obrigatório" });
    }

    db.query("DELETE FROM turmas WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Turma deletada com sucesso!" });
    });
};
