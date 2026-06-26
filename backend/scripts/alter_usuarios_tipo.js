const db = require("../config/db");

const sql = "ALTER TABLE usuarios MODIFY COLUMN tipo ENUM('admin', 'professor', 'aluno') NOT NULL DEFAULT 'aluno'";

db.query(sql, (err, result) => {
    if (err) {
        console.error("❌ Erro ao alterar tabela:", err.message);
        process.exit(1);
    }
    console.log("✅ Coluna 'tipo' ajustada para ENUM('admin', 'professor', 'aluno')");
    process.exit(0);
});
