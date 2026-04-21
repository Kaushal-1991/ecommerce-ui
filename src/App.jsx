import { FaBacteria } from 'react-icons/fa'
import './App.css'

function App() {

  return (
    <>
      <section id="center">
        <h1 class="text-3xl font-bold underline">
          Hello world! <FaBacteria />
        </h1>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
