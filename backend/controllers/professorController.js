const db = require("../config/db");

exports.listar = (req, res) => {
    db.query("SELECT * FROM professor", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.criar = async (req, res) => {
    const { nome, sobrenome, email, senha, id_disciplina } = req.body;

    if (!nome || !sobrenome || !email || !senha) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, sobrenome, email, senha" });
    }

    try {
        let disciplinaId = id_disciplina || null;

        if (disciplinaId) {
            const disciplinaExiste = await db.query("SELECT id FROM disciplina WHERE id = $1", [disciplinaId]);
            if (disciplinaExiste.length === 0) {
                disciplinaId = null;
            }
        }

        if (!disciplinaId) {
            const disciplinaPadrao = await db.query("SELECT id FROM disciplina ORDER BY id LIMIT 1");
            if (disciplinaPadrao.length === 0) {
                const novaDisciplina = await db.query("INSERT INTO disciplina (descricao) VALUES ($1) RETURNING id", ["Disciplina Padrão"]);
                disciplinaId = novaDisciplina[0].id;
            } else {
                disciplinaId = disciplinaPadrao[0].id;
            }
        }

        await db.query(
            "INSERT INTO professor (nome, sobrenome, email, senha, id_disciplina) VALUES ($1, $2, $3, $4, $5)",
            [nome, sobrenome, email, senha, disciplinaId]
        );

        res.json({ mensagem: "Professor criado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar professor", detalhes: err.message });
    }
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
