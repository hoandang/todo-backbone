DROP DATABASE todo;
CREATE DATABASE IF NOT EXISTS todo;
USE todo;

CREATE TABLE IF NOT EXISTS tasks (
    id   INTEGER NOT  NULL AUTO_INCREMENT,
    title VARCHAR(255) NULL,
    priority INTEGER NULL,
    PRIMARY KEY (id)
);

INSERT INTO tasks (title, priority) VALUES ('Go to the store', 1);
INSERT INTO tasks (title, priority) VALUES ('Take a nap', 3);
INSERT INTO tasks (title, priority) VALUES ('Buy milk', 5);
INSERT INTO tasks (title, priority) VALUES ('Do homework', 1);
