const express = require("express");
const router = express.Router();
const { verificarToken } = require("../middlewares/authMiddleware");
const turmaController = require("../controllers/turmaController");

// 🔍 LISTAR TURMAS
router.get("/", verificarToken, turmaController.listar);

// ➕ CRIAR TURMA
router.post("/", verificarToken, turmaController.criar);

// ✏️ ATUALIZAR TURMA
router.put("/:id", verificarToken, turmaController.atualizar);

// ❌ DELETAR TURMA
router.delete("/:id", verificarToken, turmaController.deletar);

module.exports = router;
