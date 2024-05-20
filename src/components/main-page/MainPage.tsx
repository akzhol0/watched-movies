import Card from "./Card";
import { useContext } from "react";
import { contextData } from "../context/logic";
import Header from "../header/Header";
import { FilmsProps } from "../../service/types";

function MainPage() {
  const { movies } = useContext(contextData);

  return (
    <>
      <Header options={true} />
      <div className="w-full h-auto flex justify-center py-[30px]">
        <div className="w-full  lg:w-[90%] flex flex-col items-center justify-center">
          <span className="flex gap-[100px]">
            <p className="text-[#e6e6e6] cursor-defaul font-extrabold text-2xl text-center">
              WATCHED MOVIES
            </p>
          </span>
          <div className="w-[95%] min-h-[400px] lg:w-[80%] grid grid-cols-4 gap-x-[30px] gap-y-[40px] place-items-center my-8">
            {movies.length ? (movies.map((item: FilmsProps) => (
              <Card key={item.id} item={item} />
            ))) : (
              <p className="text-white text-xl">Empty...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
