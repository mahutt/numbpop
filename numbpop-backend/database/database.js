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
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`)

db.exec(`
    INSERT OR IGNORE INTO users (name, email, password) VALUES ('mahutt', 'me@mahutt.me', 'password')
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
        answerIndex INTEGER NOT NULL,
        gameId INTEGER NOT NULL,
        FOREIGN KEY (gameId) REFERENCES games(id) ON DELETE CASCADE
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        questionId INTEGER NOT NULL,
        FOREIGN KEY (questionId) REFERENCES questions(id) ON DELETE CASCADE
    )
`)

export default db
