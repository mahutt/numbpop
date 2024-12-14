import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, 'database.sqlite')
const db = new Database(dbPath)
db.pragma('journal_mode = WAL')

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE CHECK(length(name) >= 3),
        email TEXT NOT NULL UNIQUE,
        hash TEXT NOT NULL
    )
`)

db.exec(`
    INSERT OR IGNORE INTO users (name, email, hash) VALUES ('mahutt', 'me@mahutt.me', '$2a$10$I0um7sZKA/1XX9EDRxixu.6n.2XDDcyei6USwpFg6dJoP3Oq5FsjO')
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        gameId INTEGER NOT NULL,
        FOREIGN KEY (gameId) REFERENCES games(id) ON DELETE CASCADE
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS choices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        correct INTEGER NOT NULL CHECK(correct IN (0, 1)),
        questionId INTEGER NOT NULL,
        FOREIGN KEY (questionId) REFERENCES questions(id) ON DELETE CASCADE
    )
`)

export default db
