import { useParams } from "react-router-dom";
import Header from "../header/Header";
import { useContext, useEffect } from "react";
import { contextData } from "../context/logic";

function FilmPage() {
  const {getInfoFilmPage, filmInfo} = useContext(contextData)
  const { title } = useParams();

  useEffect(() => {
    getInfoFilmPage(title);
  }, []);

  console.log(filmInfo)
  return (
    <div className="min-h-[600px]">
      <Header options={false} />    
    </div>
  );
}

export default FilmPage;
