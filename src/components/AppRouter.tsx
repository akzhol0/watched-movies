import { Route, Routes } from "react-router-dom";
import "../assets/styles/global.scss"
import MainPage from "./main-page/MainPage";
import MoviePage from "./film-page/MoviePage";
import ShowPage from "./film-page/ShowPage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UnknownPage from "./unknown-page/UnknownPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/movie/:title/:id" element={<MoviePage />}></Route>
      <Route path="/show/:title/:id" element={<ShowPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="*" element={<UnknownPage />}></Route>
    </Routes>
  );
}

export default AppRouter;
