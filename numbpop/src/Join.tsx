import { Link } from 'react-router-dom'
import './Join.css'

export default function Join() {
  return (
    <>
      <div
        style={{
          backgroundImage: "url('/splash.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '4em',
          paddingBottom: '4em',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <input
            type="text"
            placeholder="Game code"
            style={{ textAlign: 'center' }}
          />
          <button style={{ alignSelf: 'center', width: 'auto' }}>
            Join Game
          </button>
        </div>
      </div>
      <Link to="/new">
        <button id="create-game" style={{ color: 'red' }}>
          Create Game
        </button>
      </Link>
    </>
  )
}
