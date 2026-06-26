const db = require("../config/db");

const sql = `
    CREATE TABLE IF NOT EXISTS ocorrencias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        descricao TEXT NOT NULL,
        aluno_id INT NOT NULL,
        professor_id INT NOT NULL,
        data_ocorrencia DATETIME DEFAULT CURRENT_TIMESTAMP,
        criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (aluno_id) REFERENCES aluno(id) ON DELETE CASCADE,
        FOREIGN KEY (professor_id) REFERENCES professor(id) ON DELETE CASCADE
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
