console.log("DATABASE_URL existe?", !!process.env.DATABASE_URL);
console.log("Primeiros caracteres:", process.env.DATABASE_URL?.substring(0, 30));
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", ".env") });

const connectionString =
    process.env.DATABASE_URL ||
    process.env.NEON_DATABASE_URL ||
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?sslmode=require`;

const pool = new Pool({
    connectionString,
    ssl: connectionString.includes("neon.tech") || connectionString.includes("sslmode=require")
        ? { rejectUnauthorized: false }
        : false
});

function adaptQuery(text, params = []) {
    const values = Array.isArray(params) ? params : [params];

    if (!text.includes("?")) {
        return { text, values };
    }

    let index = 0;
    const normalized = text.replace(/\?/g, () => {
        index += 1;
        return `$${index}`;
    });

    return { text: normalized, values };
}

function query(text, params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = [];
    }

    const { text: normalizedText, values } = adaptQuery(text, params);

    if (callback) {
        return pool.query(normalizedText, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result.rows, result);
        });
    }

    return pool.query(normalizedText, values).then((result) => result.rows);
}

pool.query("SELECT NOW()", (err) => {
    if (err) {
        console.error("Erro ao conectar no banco:", err);
    } else {
        console.log("PostgreSQL conectado (POOL)");
    }
});

module.exports = { query, pool };