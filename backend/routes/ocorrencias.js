const express = require("express");
const router = express.Router();
const { verificarToken, verificarTipo } = require("../middlewares/authMiddleware");
const ocorrenciaController = require("../controllers/ocorrenciaController");

// 🔍 LISTAR TODAS AS OCORRÊNCIAS
router.get("/", verificarToken, ocorrenciaController.listar);

// 📋 LISTAR OCORRÊNCIAS DE UM ALUNO
router.get("/aluno/:aluno_id", verificarToken, verificarTipo(["aluno", "professor"]), ocorrenciaController.listarAluno);

// ➕ CRIAR OCORRÊNCIA (SÓ PROFESSOR)
router.post("/", verificarToken, verificarTipo(["professor"]), ocorrenciaController.criar);

// ✏️ ATUALIZAR OCORRÊNCIA
router.put("/:id", verificarToken, verificarTipo(["professor"]), ocorrenciaController.atualizar);

// ❌ DELETAR OCORRÊNCIA
router.delete("/:id", verificarToken, verificarTipo(["professor"]), ocorrenciaController.deletar);

module.exports = router;