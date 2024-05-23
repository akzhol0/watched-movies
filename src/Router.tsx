import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/global.scss";
import Footer from "./components/footer/Footer";
import MainPage from "./components/main-page/MainPage";
import UnknownPage from "./components/unknown-page/UnknownPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { ContextOverAll } from "./components/context/logic";
import MoviePage from "./components/film-page/MoviePage";
import ShowPage from "./components/film-page/ShowPage";

function App() {
  return (
    <ContextOverAll>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/movie/:title/:id" element={<MoviePage />}></Route>
          <Route path="/show/:title/:id" element={<ShowPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<UnknownPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ContextOverAll>
  );
}

export default App;
