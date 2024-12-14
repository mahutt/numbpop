import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import db from './database/database.js'
import {
  createGame,
  createUser,
  isEmailTaken,
  isUserNameTaken,
} from './database/services.js'
import { hashPassword } from './auth/auth-service.js'
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
      const choices = db
        .prepare('SELECT * FROM choices WHERE questionId = ?')
        .all(question.id)
      question.choices = choices
    })
    game.questions = questions
  })
  res.json(games)
})

app.get('/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all()
  res.json(users)
})

app.post('/games', (req, res) => {
  const userId = 1 // Hardcoded for now
  const { title, questions } = req.body
  try {
    createGame(title, userId, questions)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (name === '' || email === '' || password === '') {
    return res
      .status(400)
      .json({ message: 'Name, email, and password fields cannot be empty' })
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'Name must be at least 3 characters long' })
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Password must be at least 8 characters long' })
  }

  if (isUserNameTaken(name)) {
    return res.status(400).json({ message: 'Name is already taken' })
  }

  if (isEmailTaken(email)) {
    return res.status(400).json({ message: 'This email is already in use' })
  }

  try {
    const hash = await hashPassword(password)
    createUser(name, email, hash)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
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
