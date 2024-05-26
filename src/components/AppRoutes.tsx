import { Route, Routes } from "react-router-dom";
import MainPage from "./main-page/MainPage";
import UnknownPage from "./unknown-page/UnknownPage";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ShowPage from "./film-page/ShowPage";
import MoviePage from "./film-page/MoviePage";

function AppRoutes() {
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

export default AppRoutes;
