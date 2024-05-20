import { useContext, useState } from "react";
import MyButton from "../MyButtons/MyButton";
import MyCloseButton from "../MyIcons/MyCloseButton";
import { contextData } from "../../context/logic";

type MyModalProps = {
  modal: boolean;
  setModal: (arg0: boolean) => void;
};

function MyModal({ modal, setModal }: MyModalProps) {
  const { addMovie } = useContext(contextData);
  const [movieName, setMovieName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function checkingFunction() {
    if (movieName.length < 3) {
      setErrorMessage("Too short request!");
      return;
    }

    addMovie(movieName);
    setMovieName("");
    setModal(false);
  }

  return (
    <>
      {modal ? (
        <div className="w-full h-screen bg-black absolute bottom-0 opacity-90 flex justify-center overflow-y-hidden z-50">
          <div className="mt-[100px]">
            <div className="flex gap-3 items-center">
              <span onClick={() => setModal(false)}>
                <MyButton className="bg-white rounded-[6px] hover:text-white h-[45px]">
                  <MyCloseButton />
                </MyButton>
              </span>
              <input
                className="w-[400px] h-[45px] rounded-md ps-3"
                type="text"
                placeholder="Search..."
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
              />
              <span onClick={() => checkingFunction()}>
                <MyButton className="bg-white rounded-[6px] hover:text-white h-[45px]">
                  ADD MOVIE
                </MyButton>
              </span>
            </div>
            <p className="text-red-600 font-bold text-center mt-3">
              {errorMessage}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MyModal;
