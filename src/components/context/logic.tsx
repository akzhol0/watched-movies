import React, { createContext, useEffect, useState } from "react";
import { MoviesProps, ShowsProps, foo } from "../../service/types";
import { collection, doc, deleteDoc, setDoc, getDocs } from "firebase/firestore";
import db from "../../firebase/firebase";

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
  setFilmLoaded: (arg0: boolean) => void;
  userInfo: any;
  userLogged: boolean;
  setUserLogged: (arg0: boolean) => void;
  currentlyLoading: boolean;
  setCurrentlyLoading: (arg0: boolean) => void;
  getUserInfo: () => void;
  watchingMovies: boolean;
  setWatchingMovies: (arg0: boolean) => void;
  setMovies: (arg0: MoviesProps[]) => void;
  setShows: (arg0: ShowsProps[]) => void;
  messagerLogin: boolean;
  setMessagerLogin: (arg0: boolean) => void;
  filteredBySearch: (arg0: string) => foo;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [shows, setShows] = useState<ShowsProps[]>([]);
  const [userInfo, setUserInfo] = useState<any>([]);

  const [requestTitle, setRequestTitle] = useState<string>("movie");
  const [searchBar, setSearchBar] = useState<string>("");

  const [messagerLogin, setMessagerLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [filmLoaded, setFilmLoaded] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const [currentlyLoading, setCurrentlyLoading] = useState<boolean>(true);
  const [watchingMovies, setWatchingMovies] = useState<boolean>(true);

  useEffect(() => {
    if (!fetched) getUserInfo();
  }, []);

  // filter
  function filteredBySearch(target: string) {
    let result;

    target === "movies"
      ? (result = movies?.filter((item) => item.title.toLowerCase().includes(searchBar.toLowerCase()))
      : (result = shows?.filter((item) => item.title.toLowerCase().includes(searchBar.toLowerCase()));

    return result;
  }

  // get user info (if registered) from localStorage and posts from firebase
  const getUserInfo = () => {
    const user = localStorage.getItem("user");
    const userParsed = user ? JSON.parse(user) : null;

    if (userParsed !== null) {
      setUserLogged(true);
      getAllFilms(userParsed);
      setUserInfo(userParsed);
    } else {
      setMessagerLogin(true);
    }
  };

  // get all films from firebase
  async function getAllFilms(user: any) {
    const queryShows = await getDocs(
      collection(db, `${user.uid}`, "shows", "shows-subj")
    );
    queryShows.forEach((doc: any) => {
      setShows((prev) => [...prev, doc.data()]);
      setFetched(true);
    });

    const queryMovies = await getDocs(
      collection(db, `${user.uid}`, "movies", "movies-subj")
    );
    queryMovies.forEach((doc: any) => {
      setMovies((prev) => [...prev, doc.data()]);
      setFetched(true);
    });

    setCurrentlyLoading(false);
  }

  // set movies
  async function addMovies(item: any, reqtitle: string) {
    await setDoc(
      doc(
        db,
        `${userInfo.uid}`,
        "movies",
        "movies-subj",
        `${reqtitle + item.id}`
      ),
      {
        itemType: item.itemType,
        addedTime: new Date(),
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
      }
    );
  }

  // set shows
  async function addShows(item: any, reqtitle: string) {
    await setDoc(
      doc(
        db,
        `${userInfo.uid}`,
        "shows",
        "shows-subj",
        `${reqtitle + item.id}`
      ),
      {
        itemType: item.itemType,
        showType: item.showType,
        addedTime: new Date(),
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
      }
    );
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
    }
  }

  // delete movie
  const deleteMovie = (id: number) => {
    setMovies(movies.filter((item) => Number(item.id) !== Number(id)));
    deleteDoc(
      doc(db, `${userInfo.uid}`, "movies", "movies-subj", `movie${id}`)
    );
  };

  // delete show
  const deleteShow = (id: number) => {
    setShows(shows.filter((item) => Number(item.id) !== Number(id)));
    deleteDoc(doc(db, `${userInfo.uid}`, "shows", "shows-subj", `show${id}`));
  };

  return (
    <contextData.Provider
      value={{
        movies,
        getInfo,
        setFilmLoaded,
        shows,
        deleteShow,
        deleteMovie,
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
        setMovies,
        setShows,
        messagerLogin,
        setMessagerLogin,
        filteredBySearch,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
