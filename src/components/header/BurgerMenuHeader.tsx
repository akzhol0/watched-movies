import { useContext, useState } from "react";
import MySearchIcon from "../UI/MyIcons/MySearchIcon";
import MyButton from "../UI/MyButtons/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { contextData } from "../context/logic";

type BurgerMenuHeaderProps = {
  searchBarInput: string;
  setSearchBarInput: (arg0: string) => void;
};

function BurgerMenuHeader({
  searchBarInput,
  setSearchBarInput,
}: BurgerMenuHeaderProps) {
  const navigate = useNavigate();
  const {
    requestTitle,
    setSearchBar,
    userInfo,
    userLogged,
    setUserLogged,
    getUserInfo,
    setMovies,
    setShows,
  } = useContext(contextData);
  const [burgerToggle, setBurgerToggle] = useState<boolean>(false);

  return (
    <div className="flex lg:hidden">
      <div
        onClick={() => setBurgerToggle(burgerToggle ? false : true)}
        className="w-[30px] h-[25px] flex flex-col justify-between cursor-pointer ms-5"
      >
        <span className="w-full h-[2px] bg-white"></span>
        <span className="w-full h-[2px] bg-white"></span>
        <span className="w-full h-[2px] bg-white"></span>
      </div>
      <div
        className={
          burgerToggle
            ? "absolute flex flex-col justify-start items-center top-[80px] w-[350px] h-screen bg-[#161616] z-10 left-[0] duration-200"
            : "absolute flex flex-col justify-start items-center top-[80px] w-[350px] h-screen bg-[#131313] z-10 left-[-360px] duration-200"
        }
      >
        <div className="flex items-center gap-3 my-4">
          <input
            className="w-[280px] h-[45px] rounded-md ps-3 text-white bg-[#1b1b1b] placeholder-[#4e4e4e] focus:outline-none focus:ring-1"
            type="text"
            placeholder={`Search in ${requestTitle}s`}
            value={searchBarInput}
            onChange={(e) => setSearchBarInput(e.target.value)}
          />
          <span onClick={() => setSearchBar(searchBarInput)}>
            <MySearchIcon className="cursor-pointer" />
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {userLogged ? (
            <>
              <p className="text-white">{userInfo?.email}</p>
              <span
                onClick={() => {
                  localStorage.removeItem("user");
                  setUserLogged(false);
                  getUserInfo();
                  navigate("/login");
                  setMovies([]);
                  setShows([]);
                }}
              >
                <MyButton className="border text-[#bebebe] hover:text-black border-[#3758c5]">
                  Exit
                </MyButton>
              </span>
            </>
          ) : (
            <Link to="login">
              <MyButton className="border text-[#bebebe] hover:text-black border-[#3758c5]">
                LOG IN
              </MyButton>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default BurgerMenuHeader;
