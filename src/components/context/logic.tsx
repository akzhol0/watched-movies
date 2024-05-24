import React, { createContext, useEffect, useState } from "react";
import {
  MoviesPageProps,
  MoviesProps,
  ShowsProps,
  ShowsPageProps,
} from "../../service/types";
import db from "../../firebase/firebase";

import { collection, doc, deleteDoc, setDoc, getDocs } from "firebase/firestore";

type ContextProps = {
  getInfo: (arg0: string | undefined, arg1: string) => void;
  movies: MoviesProps[];
  deleteMovie: (arg0: number, arg1: string) => void;
  shows: ShowsProps[];
  deleteShow: (arg0: number, arg1: string) => void;
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
  userInfo: any;
  userLogged: boolean;
  setUserLogged: (arg0: boolean) => void;
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
  const [userLogged, setUserLogged] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>([]);
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    getUserInfo();
    if (!fetched) {
      getMovies();
      getShows();
    }
  }, []);

  const getUserInfo = () => {
    const user = localStorage.getItem("user");
    const userParsed = user ? JSON.parse(user) : null;

    if (userParsed !== null) {
      setUserLogged(true);
      setUserInfo(userParsed);
    }
  };

  // get movies
  async function getMovies() {
    const querySnapshot = await getDocs(collection(db, "movies"));
    querySnapshot.forEach((doc: any) => {
      setMovies((prev) => [doc.data(), ...prev]);
      setFetched(true);
    });
  }

  // get shows
  async function getShows() {
    const querySnapshot = await getDocs(collection(db, "shows"));
    querySnapshot.forEach((doc: any) => {
      setShows((prev) => [doc.data(), ...prev]);
      setFetched(true);
    });
  }

  // set movies
  async function addMovies(item: any, reqtitle: string) {
    await setDoc(doc(db, "movies", `${reqtitle + item.id}`), {
      title: item.title,
      id: Number(item.id),
      imdnId: item.imdbId,
      releaseYear: item.releaseYear,
      showType: item.showType,
      rating: Number(item.rating),
      imageCover: item.imageSet.verticalPoster.w480,
    });
  }

  // set shows
  async function addShows(item: any, reqtitle: string) {
    await setDoc(doc(db, "shows", `${reqtitle + item.id}`), {
      id: Number(item.id),
      imdbId: item.imdbId,
      title: item.title,
      firstAirYear: item.firstAirYear,
      lastAirYear: item.lastAirYear,
      seasonCount: item.seasonCount,
      showType: item.showType,
      rating: item.rating,
      imageCover: item.imageSet.verticalPoster.w480,
    });
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
      imageCover: item.imageSet.verticalPoster.w720,
    };

    const showObject = {
      id: Number(item.id),
      imdbId: item.imdbId,
      title: item.title,
      firstAirYear: item.firstAirYear,
      lastAirYear: item.lastAirYear,
      seasonCount: item.seasons,
      showType: item.showType,
      rating: item.rating,
      imageCover: item.imageSet.verticalPoster.w720,
    };

    reqTitle === "movie"
      ? setMovies((prev) => [movieObject, ...prev])
      : setShows((prev) => [showObject, ...prev]);
  };

  async function getInfo(title: string | undefined, option: string) {
    setFilmLoaded(false);
    const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=us&title=${title}&output_language=en`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "af2505537dmsh2474d2c04c07223p1525f4jsne7cecc4f7ee4",
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (option === "addmovie") {
        addMovies(result[0], requestTitle);
        makingObjectForAddFilm(result[0], requestTitle);
      } else if (option === "addshow") {
        addShows(result[0], requestTitle);
        makingObjectForAddFilm(result[0], requestTitle);
      } else if (option === "moviePage") {
        if (result.message) {
          setErrorMessage(true);
          return;
        }
        setMoviePageInfo(result);
        setFilmLoaded(true);
      } else if (option === "showPage") {
        if (result.message) {
          setErrorMessage(true);
          return;
        }
        setMovieShowPageInfo(result);
        setFilmLoaded(true);
      }
    } catch (error) {
      setErrorMessage(true);
      console.error(error);
    }
  }

  const deleteMovie = (id: number, title: string) => {
    setMovies(movies.filter((item) => item.id !== id));
    deleteDoc(doc(db, "movies", `${title + id}`));
  };

  const deleteShow = (id: number, title: string) => {
    setShows(shows.filter((item) => item.id !== id));
    deleteDoc(doc(db, "shows", `${title + id}`));
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
        userInfo,
        userLogged,
        setUserLogged,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
