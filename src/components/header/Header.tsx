import { Link, useNavigate } from "react-router-dom";
import MySearchIcon from "../UI/MyIcons/MySearchIcon";
import MyButton from "../UI/MyButtons/MyButton";
import { useContext, useState } from "react";
import MyModal from "../UI/MyModals/MyModal";
import { contextData } from "../context/logic";
import MyErrorModal from "../UI/MyModals/MyErrorModal";
import BurgerMenuHeader from "./BurgerMenuHeader";

type HeaderProps = {
  options: boolean;
};

function Header({ options }: HeaderProps) {
  const navigate = useNavigate();

  const {
    requestTitle,
    errorMessage,
    setSearchBar,
    userLogged,
    userInfo,
    setUserLogged,
    getUserInfo,
    setMovies,
    setShows,
  } = useContext(contextData);
  const [modal, setModal] = useState<boolean>(false);
  const [searchBarInput, setSearchBarInput] = useState<string>("");

  return (
    <>
      <div className="w-full h-[80px] fixed flex justify-center items-center bg-[#131313] z-20">
        {options && (
          <BurgerMenuHeader
            setSearchBarInput={setSearchBarInput}
            searchBarInput={searchBarInput}
            setModal={setModal}
          />
        )}
        <div
          className={
            options
              ? "w-[90%] flex justify-center lg:justify-between items-center text-[#e6e6e6]"
              : "w-[90%] flex justify-center items-center text-[#e6e6e6]"
          }
        >
          <Link to="/">
            <h1 className="text-3xl font-extrabold">
              KINO<span className="text-[#3758c5]">MORE</span>
            </h1>
          </Link>
          <div
            className={options ? "hidden lg:flex items-center gap-3" : "hidden"}
          >
            <input
              className="w-[400px] h-[45px] rounded-md ps-3 bg-[#1b1b1b] placeholder-[#4e4e4e] focus:outline-none focus:ring-1"
              type="text"
              placeholder={`Search in ${requestTitle}s...`}
              value={searchBarInput}
              onChange={(e) => setSearchBarInput(e.target.value)}
            />
            <span onClick={() => setSearchBar(searchBarInput)}>
              <MySearchIcon className="cursor-pointer" />
            </span>
          </div>
          <div className={options ? "hidden lg:flex items-center" : "hidden"}>
            <span onClick={() => setModal(true)}>
              <MyButton>ADD {requestTitle.toUpperCase()}</MyButton>
            </span>
            {userLogged ? (
              <>
                <p>{userInfo?.email}</p>
                <span
                  onClick={() => {
                    setUserLogged(false);
                    localStorage.removeItem("user");
                    getUserInfo();
                    navigate("/login");
                    setMovies([]);
                    setShows([]);
                  }}
                >
                  <MyButton>Exit</MyButton>
                </span>
              </>
            ) : (
              <Link to="login">
                <MyButton>LOG IN</MyButton>
              </Link>
            )}
          </div>
        </div>
      </div>
      <MyModal modal={modal} setModal={setModal} />
      {errorMessage && <MyErrorModal />}
    </>
  );
}

export default Header;
