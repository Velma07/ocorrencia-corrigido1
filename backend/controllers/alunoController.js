const db = require("../config/db");

exports.listar = (req, res) => {
    db.query("SELECT * FROM aluno", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.criar = async (req, res) => {
    const { nome, sobrenome, email, senha, id_turma } = req.body;

    if (!nome || !sobrenome || !email || !senha) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, sobrenome, email, senha" });
    }

    try {
        let turmaId = id_turma || null;

        if (turmaId) {
            const turmaExiste = await db.query("SELECT id FROM turmas WHERE id = $1", [turmaId]);
            if (turmaExiste.length === 0) {
                turmaId = null;
            }
        }

        if (!turmaId) {
            const turmaPadrao = await db.query("SELECT id FROM turmas ORDER BY id LIMIT 1");
            if (turmaPadrao.length === 0) {
                const novaTurma = await db.query("INSERT INTO turmas (nome) VALUES ($1) RETURNING id", ["Turma Padrão"]);
                turmaId = novaTurma[0].id;
            } else {
                turmaId = turmaPadrao[0].id;
            }
        }

        await db.query(
            "INSERT INTO aluno (nome, sobrenome, email, senha, id_turma) VALUES ($1, $2, $3, $4, $5)",
            [nome, sobrenome, email, senha, turmaId]
        );

        res.json({ mensagem: "Aluno criado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar aluno", detalhes: err.message });
    }
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
