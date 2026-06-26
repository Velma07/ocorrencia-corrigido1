ALTER TABLE usuarios
    MODIFY COLUMN tipo ENUM('admin', 'professor', 'aluno') NOT NULL DEFAULT 'aluno';
