import useLocalStorage from 'use-local-storage'
import { useAxios } from './context/axios-context'

type Choice = {
  text: string
  correct: boolean
}

type Question = {
  text: string
  choices: Choice[]
}

type Game = {
  title: string
  questions: Question[]
}

export default function Create() {
  const axios = useAxios()
  const [game, setGame] = useLocalStorage<Game>('game', {
    // key to be made dynamic
    title: '',
    questions: [],
  })

  const handleSave = async () => {
    const response = await axios.post('/games', game)
    console.log(response)
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: '0.5em',
          backgroundColor: '#242424',
          textAlign: 'end',
        }}
      >
        <button
          onClick={handleSave}
          style={{
            color: 'red',
          }}
        >
          Save
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          width: 400,
        }}
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
          style={{ fontSize: 24, marginTop: 36 }}
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
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                type="text"
                placeholder="Question"
                value={question.text}
                onChange={(event) =>
                  setGame({
                    ...game,
                    questions: game.questions.map((q, i) =>
                      i === index ? { ...q, text: event.target.value } : q
                    ),
                  })
                }
                style={{ width: '100%', fontSize: 18 }}
              />
              <button
                onClick={() =>
                  setGame({
                    ...game,
                    questions: game.questions.filter((_, i) => i !== index),
                  })
                }
              >
                -
              </button>
            </div>
            {question.choices.map((choice, i) => (
              <div key={i} style={{ display: 'flex', gap: 6 }}>
                <input
                  type="text"
                  placeholder="Answer"
                  value={choice.text}
                  onChange={(event) =>
                    setGame({
                      ...game,
                      questions: game.questions.map((q, j) =>
                        j === index
                          ? {
                              ...q,
                              choices: q.choices.map((c, k) =>
                                k === i ? { ...c, text: event.target.value } : c
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
                              choices: q.choices.filter((_, k) => k !== i),
                            }
                          : q
                      ),
                    })
                  }
                >
                  -
                </button>
                <input
                  type="checkbox"
                  checked={choice.correct}
                  onChange={() =>
                    setGame({
                      ...game,
                      questions: game.questions.map((q, j) =>
                        j === index
                          ? {
                              ...q,
                              choices: q.choices.map((c, k) =>
                                k === i ? { ...c, correct: !c.correct } : c
                              ),
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
                          choices: [...q.choices, { text: '', correct: false }],
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
                  text: '',
                  choices: [
                    {
                      text: '',
                      correct: false,
                    },
                  ],
                },
              ],
            })
          }
        >
          Add Question
        </button>
      </div>
    </>
  )
}
