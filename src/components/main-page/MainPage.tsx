import { useContext, useState } from "react";
import { contextData } from "../context/logic";
import Header from "../header/Header";
import { MoviesProps, ShowsProps } from "../../service/types";
import CardMovie from "./CardMovie";
import CardShow from "./CardShow";

function MainPage() {
  const { movies, shows, setRequestTitle, searchBar } = useContext(contextData);
  const [watchingMovies, setWatchingMovies] = useState<boolean>(true);

  return (
    <>
      <Header options={true} />
      <div className="w-full h-auto flex justify-center py-[30px]">
        <section className="w-[90%] flex flex-col items-center">
          <div className="flex justify-center gap-5 md:gap-[100px]">
            <span
              onClick={() => {
                setWatchingMovies(true);
                setRequestTitle("movie");
              }}
              className="text-[#e6e6e6] cursor-pointer font-extrabold sm:text-2xl text-center"
            >
              <p className={watchingMovies ? "border-b duration-200" : ""}>
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
              <p className={watchingMovies! ? "" : "border-b duration-200"}>
                WATCHED SHOWS
              </p>
            </span>
          </div>
          <div
            className="w-full min-h-[400px] 2xl:w-[1300px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                      gap-x-[30px] gap-y-[40px] my-8"
          >
            {watchingMovies
              ? movies
                  ?.filter((item) =>
                    item.title.toLowerCase().includes(searchBar)
                  )
                  ?.map((item: MoviesProps) => (
                    <CardMovie key={item.id} item={item} />
                  ))
              : shows
                  // ?.filter((item) =>
                  //   item.title.toLowerCase().includes(searchBar)
                  // )
                  ?.map((item: ShowsProps) => (
                    <CardShow key={item.id} item={item} />
                  ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default MainPage;
