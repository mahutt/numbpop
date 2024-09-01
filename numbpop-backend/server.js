import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import db from './database/database.js'
// const socketIo = require('socket.io')

const app = express()
const server = createServer(app)
// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:5173', // Default Vite dev server port
//     methods: ['GET', 'POST'],
//   },
// })

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Socket.IO server is running')
})

app.get('/games', (req, res) => {
  const games = db.prepare('SELECT * FROM games').all()
  games.forEach((game) => {
    const questions = db
      .prepare('SELECT * FROM questions WHERE gameId = ?')
      .all(game.id)
    questions.forEach((question) => {
      const answers = db
        .prepare('SELECT * FROM answers WHERE questionId = ?')
        .all(question.id)
      question.answers = answers
    })
    game.questions = questions
  })
  res.json(games)
})

app.post('/games', (req, res) => {
  const userId = 1 // Hardcoded for now
  const { title, questions } = req.body
  let stmt = db.prepare('INSERT INTO games (title, userId) VALUES (?, ?)')
  const { lastInsertRowid } = stmt.run(title, userId)
  questions.forEach(({ text, answerIndex, answers }) => {
    stmt = db.prepare(
      'INSERT INTO questions (text, answerIndex, gameId) VALUES (?, ?, ?)'
    )
    const { lastInsertRowid: questionId } = stmt.run(
      text,
      answerIndex,
      lastInsertRowid
    )
    answers.forEach((text) => {
      stmt = db.prepare('INSERT INTO answers (text, questionId) VALUES (?, ?)')
      stmt.run(text, questionId)
    })
  })
  res.sendStatus(201)
})

// io.on('connection', (socket) => {
//   console.log('A user connected')

//   socket.on('chat message', (msg) => {
//     console.log('Message received: ' + msg)
//     io.emit('chat message', `!!${msg}!!`)
//   })

//   socket.on('disconnect', () => {
//     console.log('A user disconnected')
//   })
// })

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
