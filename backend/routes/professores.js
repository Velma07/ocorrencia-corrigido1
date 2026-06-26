const express = require("express");
const router = express.Router();
const { verificarToken } = require("../middlewares/authMiddleware");
const professorController = require("../controllers/professorController");

router.get("/", verificarToken, professorController.listar);

router.post("/", verificarToken, professorController.criar);

router.put("/:id", verificarToken, professorController.atualizar);

router.delete("/:id", verificarToken, professorController.deletar);

module.exports = router;