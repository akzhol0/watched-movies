import React, { createContext, useEffect, useState } from "react";
import { MoviesPageProps, ShowsPageProps } from "../../service/types";
import { collection, doc, deleteDoc, setDoc, getDocs } from "firebase/firestore";
import db from "../../firebase/firebase";

type ContextProps = {
  getInfo: (arg0: string | undefined, arg1: string) => void;
  movies: MoviesPageProps[];
  deleteMovie: (arg0: number, arg1: string) => void;
  shows: ShowsPageProps[];
  deleteShow: (arg0: number, arg1: string) => void;
  requestTitle: string;
  setRequestTitle: (arg0: string) => void;
  errorMessage: boolean;
  setErrorMessage: (arg0: boolean) => void;
  searchBar: string;
  setSearchBar: (arg0: string) => void;
  filmLoaded: boolean;
  setFilmLoaded: (arg0: boolean) => void;
  userInfo: any;
  userLogged: boolean;
  setUserLogged: (arg0: boolean) => void;
  currentlyLoading: boolean;
  setCurrentlyLoading: (arg0: boolean) => void;
  getUserInfo: () => void;
  watchingMovies: boolean;
  setWatchingMovies: (arg0: boolean) => void;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [movies, setMovies] = useState<MoviesPageProps[]>([]);
  const [shows, setShows] = useState<ShowsPageProps[]>([]);
  const [userInfo, setUserInfo] = useState<any>([]);

  const [requestTitle, setRequestTitle] = useState<string>("movie");
  const [searchBar, setSearchBar] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [filmLoaded, setFilmLoaded] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const [currentlyLoading, setCurrentlyLoading] = useState<boolean>(true);
  const [watchingMovies, setWatchingMovies] = useState<boolean>(true);

  useEffect(() => {
    getUserInfo();
    if (!fetched) {
      getAllFilms();
    }
  }, []);

  // get user info if registered from localStor
  const getUserInfo = () => {
    const user = localStorage.getItem("user");
    const userParsed = user ? JSON.parse(user) : null;

    if (userParsed !== null) {
      setUserLogged(true);
      setUserInfo(userParsed);
    }
  };

  // get all films from firebase
  async function getAllFilms() {
    const queryShows = await getDocs(collection(db, "shows"));
    queryShows.forEach((doc: any) => {
      setShows((prev) => [...prev, doc.data()]);
      setFetched(true);
    });

    const queryMovies = await getDocs(collection(db, "movies"));
    queryMovies.forEach((doc: any) => {
      setMovies((prev) => [...prev, doc.data()]);
      setCurrentlyLoading(false);
      setFetched(true);
    });
  }

  // set movies
  async function addMovies(item: any, reqtitle: string) {
    await setDoc(doc(db, "movies", `${reqtitle + item.id}`), {
      itemType: item.itemType,
      addedTime: Date.now(),
      showType: item.showType,
      id: Number(item.id),
      userRate: 0,
      imdbId: item.imdbId,
      tmdbId: item.tmdbId,
      title: item.title,
      overview: item.overview,
      releaseYear: item.releaseYear,
      originalTitle: item.originalTitle,
      genres: item.genres,
      directors: item.directors,
      cast: item.cast,
      rating: item.rating,
      imageSet: {
        verticalPoster: {
          w240: item.imageSet.verticalPoster.w240,
          w360: item.imageSet.verticalPoster.w360,
          w480: item.imageSet.verticalPoster.w480,
          w600: item.imageSet.verticalPoster.w600,
          w720: item.imageSet.verticalPoster.w720,
        },
        horizontalPoster: "",
        verticalBackdrop: "",
        horizontalBackdrop: "",
      },
      streamingOptions: "",
    });
  }

  // set shows
  async function addShows(item: any, reqtitle: string) {
    await setDoc(doc(db, "shows", `${reqtitle + item.id}`), {
      itemType: item.itemType,
      showType: item.showType,
      addedTime: Date.now(),
      id: Number(item.id),
      imdbId: item.imdbId,
      tmdbId: item.tmdbId,
      title: item.title,
      userRate: 0,
      overview: item.overview,
      firstAirYear: item.firstAirYear,
      lastAirYear: item.lastAirYear,
      originalTitle: item.originalTitle,
      genres: item.genres,
      creators: item.creators,
      cast: item.cast,
      rating: item.rating,
      seasonCount: item.seasonCount,
      episodeCount: item.episodeCount,
      imageSet: {
        verticalPoster: {
          w240: item.imageSet.verticalPoster.w240,
          w360: item.imageSet.verticalPoster.w360,
          w480: item.imageSet.verticalPoster.w480,
          w600: item.imageSet.verticalPoster.w600,
          w720: item.imageSet.verticalPoster.w720,
        },
        horizontalPoster: "",
        verticalBackdrop: "",
        horizontalBackdrop: "",
      },
      streamingOptions: "",
    });
  }

  // get info for adding films
  async function getInfo(title: string | undefined, option: string) {
    setFilmLoaded(false);
    const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=us&title=${title}&output_language=en`;
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

      if (option === "addmovie") {
        addMovies(result[0], requestTitle);
        setMovies((prev) => [result[0], ...prev]);
      } else if (option === "addshow") {
        addShows(result[0], requestTitle);
        setShows((prev) => [result[0], ...prev]);
      }
    } catch (error) {
      setErrorMessage(true);
      console.error(error);
    }
  }

  // delete movie
  const deleteMovie = (id: number, title: string) => {
    setMovies(movies.filter((item) => Number(item.id) !== Number(id)));
    deleteDoc(doc(db, "movies", `${title + id}`));
  };

  // delete show
  const deleteShow = (id: number, title: string) => {
    setShows(shows.filter((item) => Number(item.id) !== Number(id)));
    deleteDoc(doc(db, "shows", `${title + id}`));
  };

  return (
    <contextData.Provider
      value={{
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
        filmLoaded,
        userInfo,
        userLogged,
        setUserLogged,
        currentlyLoading,
        setCurrentlyLoading,
        getUserInfo,
        watchingMovies,
        setWatchingMovies,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
