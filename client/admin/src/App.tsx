import { useCallback, useState } from "react";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Drawer from "./components/drawer/Drawer";
import Footer from "./components/footer/Footer";
import Hearder from "./components/hearder/Hearder";
import FileUpload from "./components/uploadEvents/FileUpload";

function App() {
  const [leftDrawer, setLeftDrawer] = useState(false);
  const [righttDrawer, setRightDrawer] = useState(false);

  const handledleLeftDrawer = useCallback(() => {
    setLeftDrawer((prev) => !prev);
  }, []);

  const handledleRighttDrawer = () => {
    setRightDrawer((prev) => !prev);
  };

  return (
    <div className="App">
      <div>
        <Hearder />
        <Navbar handleLefDrawer={handledleLeftDrawer} handleRightDrawer={handledleRighttDrawer} />
      </div>
      <main>
        <Drawer openDrawer={leftDrawer} side="left">
          <FileUpload />
        </Drawer>
        <Drawer openDrawer={righttDrawer} side="right">
          <div>Update Drawer</div>
        </Drawer>
        <div className="luck"></div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
