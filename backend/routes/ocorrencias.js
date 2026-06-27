const express = require("express");
const router = express.Router();
const { verificarToken, verificarTipo } = require("../middlewares/authMiddleware");
const ocorrenciaController = require("../controllers/ocorrenciaController");

// 🔍 LISTAR TODAS AS OCORRÊNCIAS
router.get("/", verificarToken, ocorrenciaController.listar);

// 📋 LISTAR OCORRÊNCIAS DE UM ALUNO
router.get("/aluno/:aluno_id", verificarToken, verificarTipo(["aluno", "professor"]), ocorrenciaController.listarAluno);

// ➕ CRIAR OCORRÊNCIA (ADMIN E PROFESSOR)
router.post("/", verificarToken, verificarTipo(["admin", "professor"]), ocorrenciaController.criar);

// ✏️ ATUALIZAR OCORRÊNCIA
router.put("/:id", verificarToken, verificarTipo(["admin", "professor"]), ocorrenciaController.atualizar);

// ❌ DELETAR OCORRÊNCIA
router.delete("/:id", verificarToken, verificarTipo(["admin", "professor"]), ocorrenciaController.deletar);

module.exports = router;