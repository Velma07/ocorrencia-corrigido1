const db = require("../config/db");

exports.listar = (req, res) => {
    db.query("SELECT * FROM aluno", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.criar = (req, res) => {
    const { nome, sobrenome, email, senha, id_turma } = req.body;

    if (!nome || !sobrenome || !email || !senha) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, sobrenome, email, senha" });
    }

    db.query(
        "INSERT INTO aluno (nome, sobrenome, email, senha, id_turma) VALUES (?, ?, ?, ?, ?)",
        [nome, sobrenome, email, senha, id_turma || 1],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ mensagem: "Aluno criado com sucesso!" });
        }
    );
};

exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, email, senha, id_turma } = req.body;

    if (!id) {
        return res.status(400).json({ erro: "ID do aluno é obrigatório" });
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
    if (id_turma) {
        campos.push("id_turma = ?");
        valores.push(id_turma);
    }

    if (campos.length === 0) {
        return res.status(400).json({ erro: "Nenhum campo para atualizar" });
    }

    valores.push(id);
    const sql = `UPDATE aluno SET ${campos.join(", ")} WHERE id = ?`;

    db.query(sql, valores, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Aluno atualizado com sucesso!" });
    });
};

exports.deletar = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: "ID do aluno é obrigatório" });
    }

    db.query("DELETE FROM aluno WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Aluno deletado com sucesso!" });
    });
};
