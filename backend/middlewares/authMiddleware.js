const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "segredo_super";

function verificarToken(req, res, next) {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];

    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ erro: "Token inválido" });

        req.usuario = decoded;
        next();
    });
}

function verificarTipo(tipos) {
    return (req, res, next) => {
        if (!req.usuario || !tipos.includes(req.usuario.tipo)) {
            return res.status(403).json({ erro: "Acesso negado" });
        }
        next();
    };
}

module.exports = {
    verificarToken,
    verificarTipo
};