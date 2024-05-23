import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import MyButton from "../UI/MyButtons/MyButton";
import { useContext, useEffect } from "react";
import { contextData } from "../context/logic";

function MoviePage() {
  const { getInfo, filmLoaded, moviePageInfo, setFilmLoaded } =
    useContext(contextData);
  const { title } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getInfo(title, "moviePage");
  }, []);

  return (
    <>
      <Header options={false} />
      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] min-h-[800px] flex flex-col justify-start">
          <span
            onClick={() => {
              navigate("/");
              setFilmLoaded(false);
            }}
            className="py-4"
          >
            <MyButton className="bg-white hover:bg-[#c4c4c4]">Back</MyButton>
          </span>
          {filmLoaded ? (
            <div className="flex flex-col md:flex-row gap-5 xl:gap-0 items-center md:items-start">
              <div className="min-w-[280px] overflow-hidden rounded-[15px] relative">
                <img
                  className="w-[400px] h-[500px] sm:h-[600px] object-cover"
                  src={moviePageInfo[0].imageSet.verticalPoster.w720}
                  alt="screen-poster"
                />
                <div className="px-2 cursor-default rounded-[6px] bg-blue-600 absolute top-3 left-3">
                  <p className="text-white">
                    {[...String(moviePageInfo[0].rating)].join(".")}
                  </p>
                </div>
              </div>
              <div className="max-w-[800px] flex flex-col text-white xl:ps-[50px]">
                <div className="flex flex-col gap-2">
                  <span>
                    <h1 className="text-2xl font-bold">
                      {moviePageInfo[0].title} ({moviePageInfo[0].releaseYear})
                    </h1>
                    <h5 className="mt-2 text-[#d1d1d1]">
                      {moviePageInfo[0].originalTitle}
                    </h5>
                  </span>
                  <h1 className="text-2xl mt-5">About film:</h1>
                  <div className="flex flex-col gap-1 text-[#d1d1d1]">
                    <span className="flex">
                      <p className="w-[100px] md:w-[150px]">Country:</p>
                      <p>USA</p>
                    </span>
                    <span className="flex">
                      <p className="w-[100px] md:w-[150px]">Genres:</p>
                      <p className="flex gap-1">
                        {moviePageInfo[0].genres.map((item: any) => (
                          <p key={item.name}>{item.name},</p>
                        ))}
                      </p>
                    </span>
                    <span className="flex">
                      <p className="w-[100px] md:w-[150px]">Director:</p>
                      <p className="flex gap-1">
                        {moviePageInfo[0].directors.find((item: any) => (
                          <>{item}, </>
                        ))}
                      </p>
                    </span>

                    <span className="flex">
                      <p className="w-[100px] md:w-[150px]">Released:</p>
                      <p>{moviePageInfo[0].releaseYear}</p>
                    </span>
                  </div>
                </div>
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
