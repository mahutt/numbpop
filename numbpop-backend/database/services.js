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
