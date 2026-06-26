const db = require("../config/db");

exports.listar = (req, res) => {
    db.query("SELECT * FROM professor", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.criar = (req, res) => {
    const { nome, sobrenome, email, senha, id_disciplina } = req.body;

    if (!nome || !sobrenome || !email || !senha) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, sobrenome, email, senha" });
    }

    db.query(
        "INSERT INTO professor (nome, sobrenome, email, senha, id_disciplina) VALUES (?, ?, ?, ?, ?)",
        [nome, sobrenome, email, senha, id_disciplina || 2],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ mensagem: "Professor criado com sucesso!" });
        }
    );
};

exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, email, senha, id_disciplina } = req.body;

    if (!id) {
        return res.status(400).json({ erro: "ID do professor é obrigatório" });
    }

    const campos = [];
    const valores = [];

    if (nome) {
        campos.push("nome = ?");
        valores.push(nome);
    }
    if (sobrenome) {
        campos.push("sobrenome = ?");
        valores.push(sobrenome);
    }
    if (email) {
        campos.push("email = ?");
        valores.push(email);
    }
    if (senha) {
        campos.push("senha = ?");
        valores.push(senha);
    }
    if (id_disciplina) {
        campos.push("id_disciplina = ?");
        valores.push(id_disciplina);
    }

    if (campos.length === 0) {
        return res.status(400).json({ erro: "Nenhum campo para atualizar" });
    }

    valores.push(id);
    const sql = `UPDATE professor SET ${campos.join(", ")} WHERE id = ?`;

    db.query(sql, valores, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Professor atualizado com sucesso!" });
    });
};

exports.deletar = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: "ID do professor é obrigatório" });
    }

    db.query("DELETE FROM professor WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Professor deletado com sucesso!" });
    });
};
