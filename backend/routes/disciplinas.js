const express = require("express");
const router = express.Router();
const { verificarToken } = require("../middlewares/authMiddleware");
const disciplinaController = require("../controllers/disciplinaController");

// 🔍 LISTAR DISCIPLINAS
router.get("/", verificarToken, disciplinaController.listar);

// ➕ CRIAR DISCIPLINA
router.post("/", verificarToken, disciplinaController.criar);

// ✏️ ATUALIZAR DISCIPLINA
router.put("/:id", verificarToken, disciplinaController.atualizar);

// ❌ DELETAR DISCIPLINA
router.delete("/:id", verificarToken, disciplinaController.deletar);

module.exports = router;
