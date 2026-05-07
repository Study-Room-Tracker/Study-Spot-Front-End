import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.page";
import MainLayout from "./layouts/main.layout";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
