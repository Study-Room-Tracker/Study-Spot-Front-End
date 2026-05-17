import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.page";
import MainLayout from "./layouts/main.layout";
import AboutPage from "./pages/about.page";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
