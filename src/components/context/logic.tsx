import React, { createContext, useEffect, useState } from "react";
import { MoviesPageProps, MoviesProps, ShowsProps, ShowsPageProps } from "../../service/types";
import { moviesDatabase, showsDatabase } from "../../service/database";

type ContextProps = {
  getInfo: (arg0: string | undefined, arg1: string) => void;
  movies: MoviesProps[];
  deleteMovie: (arg0: number) => void;
  shows: ShowsProps[];
  deleteShow: (arg0: number) => void;
  requestTitle: string;
  setRequestTitle: (arg0: string) => void;
  errorMessage: boolean;
  setErrorMessage: (arg0: boolean) => void;
  searchBar: string;
  setSearchBar: (arg0: string) => void;
  filmLoaded: boolean;
  moviePageInfo: MoviesPageProps[];
  showPageInfo: ShowsPageProps[];
  setFilmLoaded: (arg0: boolean) => void;
};
export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [shows, setShows] = useState<ShowsProps[]>([]);
  const [requestTitle, setRequestTitle] = useState<string>("movie");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [searchBar, setSearchBar] = useState<string>("");
  const [moviePageInfo, setMoviePageInfo] = useState<MoviesPageProps[]>([]);
  const [showPageInfo, setMovieShowPageInfo] = useState<ShowsPageProps[]>([]);
  const [filmLoaded, setFilmLoaded] = useState<boolean>(false);

  useEffect(() => {
    setMovies(moviesDatabase);
    setShows(showsDatabase);
  }, []);

  async function getInfo(title: string | undefined, option: string) {
    setFilmLoaded(false);
    if (title === undefined) {
      setErrorMessage(true);
      return;
    }
    const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=us&title=${title}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "3d4873dbedmsh26c0c5fe6f0834cp163b55jsn6595affd0732",
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (option === "addFilm") {
        makingObjectForAddFilm(result[0], requestTitle);
      } else if (option === "moviePage") {
        setMoviePageInfo(result);
        setFilmLoaded(true);
      } else if (option === "showPage") {
        setMovieShowPageInfo(result);
        setFilmLoaded(true);
      }
    } catch (error) {
      setErrorMessage(true);
      console.error(error);
    }
  }

  const makingObjectForAddFilm = (item: any, reqTitle: string) => {
    if (item === undefined) {
      setErrorMessage(true);
      return;
    }

    const movieObject = {
      imdbId: item.imdbId,
      title: item.title,
      id: Number(item.id),
      releaseYear: item.releaseYear,
      showType: item.showType,
      rating: item.rating,
      imageCover: item.imageSet.verticalPoster.w480,
    };

    const showObject = {
      id: Number(item.id),
      imdbId: item.imdbId,
      title: item.title,
      firstAirYear: item.firstAirYear,
      lastAirYear: item.lastAirYear,
      seasons: item.seasons,
      showType: item.showType,
      rating: item.rating,
      imageCover: item.imageSet.verticalPoster.w480,
    };

    reqTitle === "movie"
      ? setMovies((prev) => [movieObject, ...prev])
      : setShows((prev) => [showObject, ...prev]);
  };

  const deleteMovie = (id: number) => {
    setMovies(movies.filter((item) => item.id !== id));
  };

  const deleteShow = (id: number) => {
    setShows(shows.filter((item) => item.id !== id));
  };

  return (
    <contextData.Provider
      value={{
        showPageInfo,
        movies,
        getInfo,
        setFilmLoaded,
        deleteMovie,
        shows,
        deleteShow,
        requestTitle,
        setRequestTitle,
        errorMessage,
        setErrorMessage,
        searchBar,
        setSearchBar,
        moviePageInfo,
        filmLoaded,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
