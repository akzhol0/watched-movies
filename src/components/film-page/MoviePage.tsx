import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import MyButton from "../UI/MyButtons/MyButton";
import { useContext, useEffect, useState } from "react";
import { contextData } from "../context/logic";
import db from "../../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function MoviePage() {
  const { setWatchingMovies, setErrorMessage, userInfo } = useContext(contextData);
  const [moviePageInfo, setMoviePageInfo] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [userRate, setUserRate] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  async function updateRate() {
    const movieRef = doc(db, `${userInfo.uid}`, "movies", "movies-subj", `movie${id}`);

    await updateDoc(movieRef, {
      userRate: userRate,
    });
  }

  async function getMovieInfo() {
    const docRef = doc(db, `${userInfo.uid}`, "movies", "movies-subj", `movie${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setMoviePageInfo(docSnap.data());
      setLoaded(true);
    } else {
      setErrorMessage(true);
    }
  }

  useEffect(() => {
    getMovieInfo();
  }, []);

  useEffect(() => {
    setUserRate(moviePageInfo.userRate);
  }, [loaded]);

  return (
    <>
      <Header options={false} />
      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] mt-[80px] min-h-[800px] flex flex-col justify-start">
          <div className="py-4">
            <span
              onClick={() => {
                navigate("/");
                setWatchingMovies(true);
              }}
              className="py-4"
            >
              <MyButton className="bg-white hover:bg-[#c4c4c4]">Back</MyButton>
            </span>
          </div>
          {loaded ? (
            <div className="flex flex-col gap-5 xl:gap-0 items-center md:items-start">
              <div className="flex flex-col md:flex-row gap-5 xl:gap-0">
                <div className="min-w-[280px] overflow-hidden rounded-[15px] relative">
                  <img
                    className="w-[400px] h-[500px] sm:h-[600px] object-cover rounded-[15px]"
                    src={moviePageInfo.imageSet.verticalPoster.w720}
                    alt="screen-poster"
                  />
                  <div className="px-2 cursor-default rounded-[6px] bg-blue-600 absolute top-3 left-3">
                    <span className="text-white">
                      {[...String(moviePageInfo.rating)].join(".")}
                    </span>
                  </div>
                </div>
                <div className="max-w-[800px] flex flex-col text-white xl:ps-[50px]">
                  <div className="flex flex-col gap-2">
                    <span>
                      <h1 className="text-2xl font-bold">
                        {moviePageInfo.title} ({moviePageInfo.releaseYear})
                      </h1>
                      <h5 className="mt-2 text-[#d1d1d1]">
                        {moviePageInfo.originalTitle}
                      </h5>
                    </span>
                    <h1 className="text-2xl mt-5">About film:</h1>
                    <div className="flex flex-col gap-1 text-[#d1d1d1]">
                      <div className="max-w-[500px] flex gap-[40px]">
                        <p className="w-[120px]">Country:</p>
                        <p>USA</p>
                      </div>
                      <div className="max-w-[500px] flex gap-[40px]">
                        <p className="w-[120px]">Genres:</p>
                        <span className="max-w-[300px] flex flex-wrap">
                          {moviePageInfo.genres.map(
                            (item: { name: string; id: string }) => (
                              <p className="flex flex-wrap" key={item.id}>
                                {item.name},&nbsp;
                              </p>
                            )
                          )}
                        </span>
                      </div>
                      <div className="max-w-[500px] flex gap-[40px]">
                        <p className="w-[120px]">Release year:</p>
                        <p>{moviePageInfo.releaseYear}</p>
                      </div>
                      <div className="max-w-[500px] flex gap-[40px]">
                        <p className="w-[120px]">Type:</p>
                        <p>{moviePageInfo.showType}</p>
                      </div>
                      <div className="max-w-[500px] flex gap-[40px]">
                        <p className="w-[120px]">Rating imdb:</p>
                        <p>
                          {[...String(moviePageInfo.rating)].join(".") +
                            "/" +
                            10}
                        </p>
                      </div>
                      <div className="max-w-[500px] flex gap-[40px]">
                        <p className="w-[120px]">Rating user:</p>
                        <span>
                          {userRate}/10
                        </span>
                      </div>
                      <div className="max-w-[500px] flex gap-[40px]">
                        <p className="w-[120px]">Directors:</p>
                        <span className="max-w-[400px]">
                          {moviePageInfo.directors.map((item: string) => (
                            <p key={item}>{item}</p>
                          ))}
                        </span>
                      </div>
                      <div className="max-w-[400px] py-4">
                        <input
                          className="w-full"
                          type="range"
                          min="0"
                          max="10"
                          step="0.1"
                          value={userRate}
                          onChange={(e) => setUserRate(Number(e.target.value))}
                        />
                        <span className="flex items-center justify-center gap-5">
                          <span className="w-[140px] text-center text-xl rounded-[5px] cursor-default">
                            <p>User rate: {userRate}</p>
                          </span>
                          <span onClick={() => updateRate()}>
                            <MyButton className="bg-[#3758c5] hover:scale-105">
                              Submit
                            </MyButton>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col text-[#d1d1d1]">
                <span className="w-full flex flex-wrap gap-1">
                  <span className="flex flex-col">
                    <p className="text-2xl text-white mt-5 mb-1">Cast:</p>
                    <span className="flex flex-wrap">
                      {moviePageInfo.cast.map((item: string) => (
                        <p className="flex flex-wrap" key={item}>
                          {item},&nbsp;
                        </p>
                      ))}
                    </span>
                  </span>
                </span>
                <span className="w-full flex flex-wrap gap-1">
                  <span className="flex flex-col">
                    <p className="text-2xl text-white mt-5 mb-1">Overview:</p>
                    <p>{moviePageInfo.overview}</p>
                  </span>
                </span>
              </div>
            </div>
          ) : (
            <h1 className="text-white text-center">Loading...</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default MoviePage;
