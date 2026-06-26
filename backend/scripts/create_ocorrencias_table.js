const db = require("../config/db");

const sql = `
    CREATE TABLE IF NOT EXISTS ocorrencias (
        id SERIAL PRIMARY KEY,
        descricao TEXT NOT NULL,
        aluno_id INT NOT NULL,
        professor_id INT NOT NULL,
        data_ocorrencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_ocorrencia_aluno FOREIGN KEY (aluno_id) REFERENCES aluno(id) ON DELETE CASCADE,
        CONSTRAINT fk_ocorrencia_professor FOREIGN KEY (professor_id) REFERENCES professor(id) ON DELETE CASCADE
    )
`;

db.query(sql, (err) => {
    if (err) {
        console.error("Erro ao criar tabela ocorrencias:", err);
        process.exit(1);
    }
    console.log("✅ Tabela ocorrencias criada com sucesso!");
    process.exit(0);
});
