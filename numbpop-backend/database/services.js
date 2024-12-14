import db from './database.js'

export const createGame = db.transaction((title, userId, questions) => {
  const gameStmt = db.prepare('INSERT INTO games (title, userId) VALUES (?, ?)')
  const { lastInsertRowid: gameId } = gameStmt.run(title, userId)
  const questionStmt = db.prepare(
    'INSERT INTO questions (text, gameId) VALUES (?, ?)'
  )
  const choiceStmt = db.prepare(
    'INSERT INTO choices (text, correct, questionId) VALUES (?, ?, ?)'
  )
  for (const question of questions) {
    const { lastInsertRowid: questionId } = questionStmt.run(
      question.text,
      gameId
    )
    for (const choice of question.choices) {
      choiceStmt.run(choice.text, choice.correct ? 1 : 0, questionId)
    }
  }
  return gameId
})

export const createUser = db.transaction((name, email, hash) => {
  const stmt = db.prepare(
    'INSERT INTO users (name, email, hash) VALUES (?, ?, ?)'
  )
  const { lastInsertRowid: userId } = stmt.run(name, email, hash)
  return userId
})

export const isUserNameTaken = (name) => {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM users WHERE name = ?')
  const { count } = stmt.get(name)
  return count > 0
}

export const isEmailTaken = (email) => {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM users WHERE email = ?')
  const { count } = stmt.get(email)
  return count > 0
}
