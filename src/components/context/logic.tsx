import React, { createContext, useEffect, useState } from "react";
import { FilmsProps } from "../../service/types";
import { moviesDatabase } from "../../service/database";

type ContextProps = {
  addMovie: (arg0: string) => void;
  movies: FilmsProps[];
  deleteMovie: (arg0: number) => void;
};
export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    setMovies(moviesDatabase);
  }, []);

  const makingObjectFunction = (item: any) => {
    const obj = {
      id: Number(item.id),
      imdbId: item.imdbId,
      title: item.title,
      releaseYear: item.releaseYear,
      showType: item.showType,
      rating: item.rating,
      imageCover: item.imageSet.verticalPoster.w480,
    };

    setMovies((prev) => [obj, ...prev]);
  }

  async function addMovie(target: string) {
    const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=us&title=${target}&output_language=en&show_type=movie&series_granularity=show`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3d4873dbedmsh26c0c5fe6f0834cp163b55jsn6595affd0732",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      makingObjectFunction(result[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteMovie = (id: number) => {
    setMovies(movies.filter((item) => item.id !== id));
  }

  return (
    <contextData.Provider
      value={{
        movies,
        addMovie,
        deleteMovie,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
