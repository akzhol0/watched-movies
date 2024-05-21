import { Link } from "react-router-dom";
import MySearchIcon from "../UI/MyIcons/MySearchIcon";
import MyButton from "../UI/MyButtons/MyButton";
import { useState } from "react";
import MyModal from "../UI/MyModal/MyModal";

type HeaderProps = {
  options: boolean;
};

function Header({ options }: HeaderProps) {
  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  return (
    <div className="w-full h-[80px] flex justify-center bg-[#131313]">
      <div
        className={
          options
            ? "w-[90%] flex justify-between items-center text-[#e6e6e6]"
            : "w-[90%] flex justify-center items-center text-[#e6e6e6]"
        }
      >
        <div>
          <Link to="/">
            <h1 className="text-3xl font-extrabold">
              KINO<span className="text-[#3758c5]">MORE</span>
            </h1>
          </Link>
        </div>
        <div className={options ? "flex items-center gap-3" : "hidden"}>
          <input
            className="w-[400px] h-[45px] rounded-md ps-3 bg-[#1b1b1b] placeholder-[#4e4e4e] focus:outline-none focus:ring-1"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>
            <MySearchIcon className="cursor-pointer" />
          </span>
        </div>
        <div className={options ? "block" : "hidden"}>
          <span onClick={() => setModal(true)}>
            <MyButton>ADD MOVIE</MyButton>
          </span>
          <Link to="login">
            <MyButton>LOG IN</MyButton>
          </Link>
        </div>
      </div>
      <MyModal modal={modal} setModal={setModal} />
    </div>
  );
}

export default Header;
