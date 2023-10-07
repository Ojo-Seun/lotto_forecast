import { lazy, Suspense } from "react"
import "./App.css"
import Header from "./components/Header/Header"
import Navbar from "./components/NavBar/Navbar"
import Footer from "./components/Footer/Footer"
import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"
import LoadingIndicator from "./components/utils/LodingIndicator"

const LazyHome = lazy(() => import("./pages/Home/Home"))
const LazyForecast2 = lazy(() => import("./pages/Forecast/Forecast2/ForecastWith2WeeksResults"))
const LazyForecast3 = lazy(() => import("./pages/Forecast/Forecast3/ForecastWith3WeeksResults"))
const LazyNonFound = lazy(() => import("./pages/404"))

function App() {
  const location = useLocation()
  return (
    <div className="App">
      <div id="headers">
        <Header />
        <Navbar />
      </div>
      <main>
        <Suspense fallback={<LoadingIndicator />}>
          <AnimatePresence>
            <Routes location={location} key={location.key}>
              <Route path="/" element={<LazyHome />} />
              <Route path="forecast-2" element={<LazyForecast2 />} />
              <Route path="forecast-3" element={<LazyForecast3 />} />
              <Route path="*" element={<LazyNonFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
