import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import "./App.css"
import { useEffect } from "react"
import axios from "axios"
import config from "./app_config"

function App() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    console.log(file)
  }

  // useEffect(() => {
  //   const payload = {
  //     game: "NATIONAL",
  //   }
  //   axios
  //     .post(`${URL}/games/data`, { payload })
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err.response?.data)
  //     })
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <p>
          <label htmlFor="file">Upload File</label>
          <input
            onChange={handleChange}
            type="file"
            accept=".xlsx"
            id="file"
            name="file"
          />
        </p>
      </main>
    </div>
  )
}

export default App
