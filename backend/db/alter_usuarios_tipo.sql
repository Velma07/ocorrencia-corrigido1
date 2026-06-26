-- Se a coluna `tipo` ainda não existir:
ALTER TABLE usuarios
    ADD COLUMN tipo ENUM('admin', 'professor', 'aluno') NOT NULL DEFAULT 'aluno' AFTER senha;

-- Se a coluna `tipo` existir e precisar ser convertida para ENUM:
ALTER TABLE usuarios
    MODIFY COLUMN tipo ENUM('admin', 'professor', 'aluno') NOT NULL DEFAULT 'aluno';
