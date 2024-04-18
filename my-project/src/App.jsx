import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Item from './components/item'

// const DATA = [1,2,3,4,5,`hello`]
const DATA = [{name: `Lilya`}]

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <h1 className="header-main"></h1> */}
    <p class="font-bold">hello world</p>

    <div className="cont flex gap-2 w-[333px] border-8 bg-slate-300">
      {/* <div className="h1 header font-bold">Container</div>
      <div className="bg-[red] w-6 rounded-full text-center text-white">1</div>
      <div className="custom-item w-[100px]">custom</div>
      <div className="bg-[red] w-6 rounded-full text-center text-white">2</div>
      <div className="bg-[red] w-6 rounded-full text-center text-white">3</div>
      <div className="bg-[red] w-6 rounded-full text-center text-white">4</div> */}

      {DATA.map((item, index) => {
        // return <Item key={index}>{ item }</Item>

        // return <Item name={Item.name} key={index}>{ item }</Item>

        return <Item name={item.name} key={index}/>

      })}

      {/* <Item/>
      <Item/>
      <Item/>
      <Item/> */}
    </div>

{/* --- */}
    
    {/* <p>hello world</p> */}
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
