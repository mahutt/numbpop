import useLocalStorage from 'use-local-storage'

type Question = {
  text: string
  answers: string[]
  answerIndex: number
}

type Game = {
  title: string
  questions: Question[]
}

export default function Create() {
  const [game, setGame] = useLocalStorage<Game>('game', {
    // key to be made dynamic
    title: '',
    questions: [],
  })

  const handleSave = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    })
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
                  checked={question.answerIndex === i}
                  onChange={() =>
                    setGame({
                      ...game,
                      questions: game.questions.map((q, j) =>
                        j === index
                          ? {
                              ...q,
                              answerIndex: i,
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
                  text: '',
                  answers: [''],
                  answerIndex: 0,
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
