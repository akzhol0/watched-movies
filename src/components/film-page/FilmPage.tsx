import { useParams } from "react-router-dom";
import Header from "../header/Header";
import { contextData } from "../context/logic";
import { useContext, useEffect } from "react";

function FilmPage() {
  const { getInfoFilmPage } = useContext(contextData);
  const { title } = useParams();

  useEffect(() => {
    getInfoFilmPage(title)
  }, [])

  return (
    <div className="min-h-[600px]">
      <Header options={false} />
    </div>
  );
}

export default FilmPage;
