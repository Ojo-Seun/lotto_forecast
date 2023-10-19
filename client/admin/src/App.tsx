import { Suspense, lazy } from "react"
import "./App.css"
import Navbar from "./components/NavBar/Navbar"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import LoadingIndicator from "./components/utils/LodingIndicator"
import Luck from "./components/utils/Luck"
import Alert from "./components/alert/Alert"

const LazyDashboard = lazy(() => import("./pages/Dashboard"))
const LazyOperations = lazy(() => import("./pages/Operations"))
const LazyLogin = lazy(() => import("./pages/Auth/Login"))
const LazyRegister = lazy(() => import("./pages/Auth/Register"))
const LazyAuth = lazy(() => import("./pages/Auth"))
const LazyProtectedAuth = lazy(() => import("./pages/ProtectedAuth"))
const LazySendPassResetCode = lazy(() => import("./pages/Auth/SendPassResetCode"))
const LazyResetPassword = lazy(() => import("./pages/Auth/ResetPassword"))
const LazyNonFound = lazy(() => import("./pages/404"))

function App() {
  const location = useLocation()

  return (
    <div className="App">
      <div>
        <Header />
        <Navbar />
        <Luck />
        <Alert />
      </div>
      <main>
        <Suspense fallback={<LoadingIndicator />}>
          <AnimatePresence>
            <Routes location={location} key={location.key}>
              <Route path="/" element={<LazyDashboard />} />
              <Route
                path="operations"
                element={
                  <LazyAuth>
                    <LazyOperations />
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
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App
