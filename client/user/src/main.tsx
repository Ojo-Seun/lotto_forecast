import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import ErrBoundary from "./components/utils/ErrBoundary"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrBoundary>
          <App />
        </ErrBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
