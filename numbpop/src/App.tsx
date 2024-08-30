import './App.css'

function App() {
  return (
    <>
      <div
        style={{
          backgroundImage: "url('/splash.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: 400,
          height: 400,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
    </>
  )
}

export default App
