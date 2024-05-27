import { useContext, useEffect, useState } from "react";
import { contextData } from "../context/logic";
import Header from "../header/Header";
import { MoviesProps, ShowsProps } from "../../service/types";
import CardMovie from "./CardMovie";
import CardShow from "./CardShow";
import MyLoaderModal from "../UI/MyModals/MyLoaderModal";
import { useNavigate } from "react-router-dom";
import MyButton from "../UI/MyButtons/MyButton";
import MyModal from "../UI/MyModals/MyModal";

function MainPage() {
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    filteredBySearch,
    setRequestTitle,
    currentlyLoading,
    watchingMovies,
    setWatchingMovies,
    userLogged,
    requestTitle,
  } = useContext(contextData);

  useEffect(() => {
    if (!userLogged) {
      navigate("/login");
    }
  }, []);

  const filteredMovies = filteredBySearch("movies");
  const filteredShows = filteredBySearch("shows");

  return (
    <>
      <Header options={true} />
      {currentlyLoading && <MyLoaderModal>Loading...</MyLoaderModal>}
      <MyModal modal={modal} setModal={setModal} />
      <div className="w-full h-auto flex justify-center py-[30px]">
        <section className="w-[90%] mt-[80px] flex flex-col items-center">
          <div className="flex flex-col items-center gap-5">
            <div className="flex justify-center items-center gap-5 md:gap-[100px]">
              <span
                onClick={() => {
                  setWatchingMovies(true);
                  setRequestTitle("movie");
                }}
                className="text-[#e6e6e6] cursor-pointer font-extrabold sm:text-2xl text-center"
              >
                <p className={watchingMovies ? "border-b duration-200" : "border-b border-[#1b1b1b]"}>
                  WATCHED MOVIES
                </p>
              </span>
              <span
                onClick={() => {
                  setWatchingMovies(false);
                  setRequestTitle("show");
                }}
                className="text-[#e6e6e6] cursor-pointer font-extrabold sm:text-2xl text-center"
              >
                <p className={watchingMovies ? "border-b border-[#1b1b1b]" : "border-b duration-200"}>
                  WATCHED SHOWS
                </p>
              </span>
            </div>
            <span onClick={() => setModal(true)}>
              <MyButton className="bg-[#3758c5] hover:bg-[#253770] text-white py-2 px-[30px] focus:scale-105">ADD {requestTitle.toUpperCase()}</MyButton>
            </span>
          </div>
          <div className="w-full min-h-[400px] 2xl:w-[1300px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[30px] gap-y-[40px] my-8">
            {watchingMovies ? (
              filteredMovies.length !== 0 ? (
                filteredMovies.map((item: MoviesProps) => (
                  <CardMovie key={item.id} item={item} />
                ))
              ) : (
                <div className="absolute top-[40%] left-[50%] -translate-x-[50px] rounded-[10px] bg-white">
                  <p className="px-4 py-1 text-black cursor-default">Empty</p>
                </div>
              )
            ) : filteredShows.length !== 0 ? (
              filteredShows.map((item: ShowsProps) => (
                <CardShow key={item.id} item={item} />
              ))
            ) : (
              <div className="absolute top-[40%] left-[50%] -translate-x-[50px] rounded-[10px] bg-white">
                <p className="px-4 py-1 text-black cursor-default">Empty</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default MainPage;
