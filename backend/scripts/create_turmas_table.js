const db = require("../config/db");

const sql = `
  CREATE TABLE IF NOT EXISTS turmas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(sql, (err, result) => {
    if (err) {
        console.error("❌ Erro ao criar tabela:", err.message);
        process.exit(1);
    }
    console.log("✅ Tabela turmas criada/verificada com sucesso");
    process.exit(0);
});
