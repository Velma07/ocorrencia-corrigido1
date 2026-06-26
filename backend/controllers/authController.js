const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "segredo_super";
const tiposValidos = ["admin", "professor", "aluno"];

exports.register = async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({ erro: "Tipo de usuário inválido." });
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10);

        db.query(
            "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)",
            [nome, email, senhaHash, tipo],
            (err) => {
                if (err) return res.status(500).json(err);

                res.json({ mensagem: "Usuário criado!" });
            }
        );
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.status(401).json({ erro: "Usuário não encontrado" });
        }

        const usuario = results[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ erro: "Senha inválida" });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                tipo: usuario.tipo
            },
            SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            mensagem: "Login OK",
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                tipo: usuario.tipo
            }
        });
    });
};
