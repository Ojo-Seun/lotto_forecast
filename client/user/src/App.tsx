import { lazy, Suspense } from "react"
import "./App.css"
import Header from "./components/Header/Header"
import Navbar from "./components/NavBar/Navbar"
import Footer from "./components/Footer/Footer"
import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation, Navigate } from "react-router-dom"
import LoadingIndicator from "./components/utils/LodingIndicator"
import Luck from "./components/utils/Luck"
import { useAppSelector } from "./app/hooks"
import useToken from "./hooks/useToken"
import Alert from "./components/alert/Alert"

const LazyHome = lazy(() => import("./pages/Home/Home"))
const LazyForecast2 = lazy(() => import("./pages/Forecast/Forecast2/ForecastWith2WeeksResults"))
const LazyForecast3 = lazy(() => import("./pages/Forecast/Forecast3/ForecastWith3WeeksResults"))
const LazyNonFound = lazy(() => import("./pages/404"))
const LazyForecast1 = lazy(() => import("./pages/Forecast/Forecast1/ForecastWith1WeekResult"))
const LazyLogin = lazy(() => import("./pages/Auth/Login"))
const LazyRegister = lazy(() => import("./pages/Auth/Register"))
const LazyAuth = lazy(() => import("./pages/Auth"))
const LazyProtectedAuth = lazy(() => import("./pages/ProtectedAuth"))
const LazySendPassResetCode = lazy(() => import("./pages/Auth/SendPassResetCode"))
const LazyResetPassword = lazy(() => import("./pages/Auth/ResetPassword"))

function App() {
  const location = useLocation()
  return (
    <div className="App">
      <div id="headers">
        <Header />
        <Navbar />
        <Luck />
        <Alert />
      </div>
      <main>
        <Suspense fallback={<LoadingIndicator />}>
          <AnimatePresence>
            <Routes location={location} key={location.key}>
              <Route path="/" element={<LazyHome />} />
              <Route
                path="forecast-1"
                element={
                  <LazyAuth>
                    <LazyForecast1 />
                  </LazyAuth>
                }
              />
              <Route
                path="forecast-2"
                element={
                  <LazyAuth>
                    <LazyForecast2 />
                  </LazyAuth>
                }
              />
              <Route
                path="forecast-3"
                element={
                  <LazyAuth>
                    <LazyForecast3 />
                  </LazyAuth>
                }
              />
              <Route
                path="auth/login"
                element={
                  <LazyProtectedAuth>
                    <LazyLogin />
                  </LazyProtectedAuth>
                }
              />
              <Route
                path="auth/register"
                element={
                  <LazyProtectedAuth>
                    <LazyRegister />
                  </LazyProtectedAuth>
                }
              />
              <Route
                path="auth/send-password-reset-code"
                element={
                  <LazyProtectedAuth>
                    <LazySendPassResetCode />
                  </LazyProtectedAuth>
                }
              />
              <Route
                path="auth/reset-password"
                element={
                  <LazyProtectedAuth>
                    <LazyResetPassword />
                  </LazyProtectedAuth>
                }
              />
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
