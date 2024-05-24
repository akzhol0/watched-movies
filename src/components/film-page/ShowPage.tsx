import { useNavigate, useParams } from "react-router-dom";
import MyButton from "../UI/MyButtons/MyButton";
import Header from "../header/Header";
import { contextData } from "../context/logic";
import { useContext, useEffect } from "react";

function ShowPage() {
  const { getInfo, showPageInfo, filmLoaded, setFilmLoaded, setWatchingMovies } =
    useContext(contextData);
  const { title } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getInfo(title, "showPage");
  }, []);

  return (
    <>
      <Header options={false} />
      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] mt-[80px] min-h-[800px] flex flex-col justify-start">
          <div className="py-4">
            <span
              onClick={() => {
                navigate("/");
                setFilmLoaded(false);
                setWatchingMovies(false);
              }}
            >
              <MyButton className="bg-white hover:bg-[#c4c4c4]">Back</MyButton>
            </span>
          </div>
          {filmLoaded ? (
            <div className="flex flex-col md:flex-row gap-5 xl:gap-0 items-center md:items-start">
              <div className="min-w-[280px] overflow-hidden rounded-[15px] relative">
                <img
                  className="w-[400px] h-[500px] sm:h-[600px] object-cover"
                  src={showPageInfo[0].imageSet.verticalPoster.w720}
                  alt="screen-poster"
                />
                <div className="px-2 cursor-default rounded-[6px] bg-blue-600 absolute top-3 left-3">
                  <p className="text-white">
                    {[...String(showPageInfo[0].rating)].join(".")}
                  </p>
                </div>
              </div>
              <div className="max-w-[800px] flex flex-col text-white xl:ps-[50px]">
                <div className="flex flex-col gap-2">
                  <span>
                    <h1 className="text-2xl font-bold">
                      {showPageInfo[0].title} (
                      {showPageInfo[0].firstAirYear +
                        "-" +
                        showPageInfo[0].lastAirYear}
                      )
                    </h1>
                    <h5 className="mt-2 text-[#d1d1d1]">
                      {showPageInfo[0].originalTitle}
                    </h5>
                  </span>
                  <h1 className="text-2xl mt-5">About film:</h1>
                  <div className="flex flex-col gap-1 text-[#d1d1d1]">
                    <span className="flex">
                      <p className="w-[100px] md:w-[150px]">Country:</p>
                      <p>USA</p>
                    </span>
                    <span className="flex">
                      <p className="w-[100px] md:w-[150px]">Seasons:</p>
                      <p>
                        {showPageInfo[0].seasonCount} seasons,{" "}
                        {showPageInfo[0].episodeCount} episodes
                      </p>
                    </span>
                    <span className="flex">
                      <p className="w-[100px] md:w-[150px]">Genres:</p>
                      <p className="flex gap-1">
                        {showPageInfo[0].genres.map((item: any) => (
                          <p key={item.name}>{item.name},</p>
                        ))}
                      </p>
                    </span>
                    <span className="flex">
                      <p className="w-[100px] md:w-[150px]">Director:</p>
                      <p className="flex gap-1">
                        {showPageInfo[0].creators.find((item: string) => (
                          <>{item}, </>
                        ))}
                      </p>
                    </span>

                    <span className="flex">
                      <p className="w-[100px] md:w-[150px]">Released:</p>
                      <p>
                        {showPageInfo[0].firstAirYear +
                          "-" +
                          showPageInfo[0].lastAirYear}
                      </p>
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

export default ShowPage;
