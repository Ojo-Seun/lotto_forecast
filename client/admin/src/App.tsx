import { Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoadingIndicator from "./components/utils/LodingIndicator";
import Luck from "./components/utils/Luck";

const LazyDashboard = lazy(() => import("./pages/Dashboard"));
const LazyOperations = lazy(() => import("./pages/Operations"));

function App() {
  const location = useLocation();

  // const handledleLeftDrawer = useCallback(() => {
  //   setLeftDrawer((prev) => !prev);
  // }, []);

  // const handledleRighttDrawer = () => {
  //   setRightDrawer((prev) => !prev);
  // };

  return (
    <div className="App">
      <div>
        <Header />
        <Navbar />
        <Luck />
      </div>
      <main>
        <Suspense fallback={<LoadingIndicator />}>
          <AnimatePresence>
            <Routes location={location} key={location.key}>
              <Route path="/" element={<LazyDashboard />} />
              <Route path="operations" element={<LazyOperations />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
