import { useState } from 'react'

type Question = {
  question: string
  answers: string[]
  correctAnswer: number
}

type Game = {
  title: string
  questions: Question[]
}

export default function Create() {
  const [game, setGame] = useState<Game>({
    title: '',
    questions: [],
  })

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 400 }}
    >
      <input
        type="text"
        placeholder="Game Title"
        value={game.title}
        onChange={(event) =>
          setGame({
            ...game,
            title: event.target.value,
          })
        }
        style={{ fontSize: 24 }}
      />
      {game.questions.map((question, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#403f4c',
            padding: 6,
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <input
            type="text"
            placeholder="Question"
            value={question.question}
            onChange={(event) =>
              setGame({
                ...game,
                questions: game.questions.map((q, i) =>
                  i === index ? { ...q, question: event.target.value } : q
                ),
              })
            }
            style={{ width: '100%', fontSize: 18 }}
          />
          {question.answers.map((answer, i) => (
            <div key={i} style={{ display: 'flex', gap: 6 }}>
              <input
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={(event) =>
                  setGame({
                    ...game,
                    questions: game.questions.map((q, j) =>
                      j === index
                        ? {
                            ...q,
                            answers: q.answers.map((a, k) =>
                              k === i ? event.target.value : a
                            ),
                          }
                        : q
                    ),
                  })
                }
                style={{ width: '100%' }}
              />
              <button
                onClick={() =>
                  setGame({
                    ...game,
                    questions: game.questions.map((q, j) =>
                      j === index
                        ? {
                            ...q,
                            answers: q.answers.filter((_, k) => k !== i),
                          }
                        : q
                    ),
                  })
                }
              >
                -
              </button>
              <input
                type="radio"
                checked={question.correctAnswer === i}
                onChange={() =>
                  setGame({
                    ...game,
                    questions: game.questions.map((q, j) =>
                      j === index
                        ? {
                            ...q,
                            correctAnswer: i,
                          }
                        : q
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            onClick={() =>
              setGame({
                ...game,
                questions: game.questions.map((q, j) =>
                  j === index
                    ? {
                        ...q,
                        answers: [...q.answers, ''],
                      }
                    : q
                ),
              })
            }
          >
            +
          </button>
        </div>
      ))}

      <button
        onClick={() =>
          setGame({
            ...game,
            questions: [
              ...game.questions,
              {
                question: '',
                answers: [''],
                correctAnswer: 0,
              },
            ],
          })
        }
      >
        Add Question
      </button>
    </div>
  )
}
