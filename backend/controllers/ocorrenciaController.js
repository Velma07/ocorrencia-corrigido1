const db = require("../config/db");

// 🔍 LISTAR TODAS AS OCORRÊNCIAS
exports.listar = (req, res) => {
    const sql = `
        SELECT 
            o.id,
            o.descricao,
            o.data_ocorrencia,
            o.criada_em,
            o.aluno_id,
            a.nome AS aluno_nome,
            a.sobrenome AS aluno_sobrenome,
            o.professor_id,
            p.nome AS professor_nome,
            p.sobrenome AS professor_sobrenome
        FROM ocorrencias o
        INNER JOIN aluno a ON o.aluno_id = a.id
        INNER JOIN professor p ON o.professor_id = p.id
        ORDER BY o.data_ocorrencia DESC
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// 📋 LISTAR OCORRÊNCIAS DE UM ALUNO
exports.listarAluno = (req, res) => {
    const { aluno_id } = req.params;
    
    if (!aluno_id) {
        return res.status(400).json({ erro: "ID do aluno obrigatório" });
    }

    db.query(
        "SELECT * FROM ocorrencias WHERE aluno_id = ?",
        [aluno_id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
};

// ➕ CRIAR OCORRÊNCIA (SÓ PROFESSOR)
exports.criar = async (req, res) => {
    const { descricao, aluno_id, professor_id } = req.body;

    if (!descricao || !aluno_id || !professor_id) {
        return res.status(400).json({ 
            erro: "Descrição, aluno_id e professor_id são obrigatórios" 
        });
    }

    try {
        await db.query(
            "INSERT INTO ocorrencias (descricao, aluno_id, professor_id, data_ocorrencia, criada_em) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
            [descricao, aluno_id, professor_id]
        );
        res.json({ mensagem: "Ocorrência criada com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar ocorrência", detalhes: err.message });
    }
};

// ✏️ ATUALIZAR OCORRÊNCIA
exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { descricao, aluno_id, professor_id } = req.body;

    if (!id) {
        return res.status(400).json({ erro: "ID obrigatório" });
    }

    let sql = "UPDATE ocorrencias SET ";
    const campos = [];
    const valores = [];

    if (descricao !== undefined) {
        campos.push("descricao = ?");
        valores.push(descricao);
    }

    if (aluno_id !== undefined) {
        campos.push("aluno_id = ?");
        valores.push(aluno_id);
    }

    if (professor_id !== undefined) {
        campos.push("professor_id = ?");
        valores.push(professor_id);
    }

    if (campos.length === 0) {
        return res.status(400).json({ erro: "Nenhum campo para atualizar" });
    }

    sql += campos.join(", ") + " WHERE id = ?";
    valores.push(id);

    db.query(sql, valores, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Ocorrência atualizada com sucesso!" });
    });
};

// ❌ DELETAR OCORRÊNCIA
exports.deletar = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: "ID obrigatório" });
    }

    db.query("DELETE FROM ocorrencias WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Ocorrência deletada com sucesso!" });
    });
};
