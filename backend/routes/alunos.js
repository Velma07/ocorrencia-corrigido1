const express = require("express");
const router = express.Router();
const { verificarToken } = require("../middlewares/authMiddleware");
const alunoController = require("../controllers/alunoController");

// 🔍 LISTAR ALUNOS
router.get("/", verificarToken, alunoController.listar);

// ➕ CRIAR ALUNO
router.post("/", verificarToken, alunoController.criar);

// ✏️ ATUALIZAR ALUNO
router.put("/:id", verificarToken, alunoController.atualizar);

// ❌ DELETAR ALUNO
router.delete("/:id", verificarToken, alunoController.deletar);

module.exports = router;