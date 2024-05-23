import { useContext, useState } from "react";
import MyButton from "../MyButtons/MyButton";
import MyCloseButton from "../MyIcons/MyCloseButton";
import { contextData } from "../../context/logic";

type MyModalProps = {
  modal: boolean;
  setModal: (arg0: boolean) => void;
};

function MyModal({ modal, setModal }: MyModalProps) {
  const { getInfo, requestTitle } = useContext(contextData);
  const [filmName, setMovieName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function checkingFunction() {
    if (filmName.length < 3) {
      setErrorMessage("Too short request!");
      return;
    }

    getInfo(filmName, 'addFilm');
    setMovieName("");
    setModal(false);
  }

  return (
    <>
      {modal ? (
        <div className="w-full h-screen bg-black absolute bottom-0 opacity-90 flex justify-center z-50">
          <div className="mt-[100px]">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <span onClick={() => setModal(false)}>
                <MyButton className="bg-white rounded-[12px] hover:text-white h-[45px]">
                  <MyCloseButton />
                </MyButton>
              </span>
              <input
                className="w-[250px] md:w-[400px] h-[45px] rounded-md ps-3"
                type="text"
                placeholder={`Name of the ${requestTitle}`}
                value={filmName}
                onChange={(e) => setMovieName(e.target.value)}
              />
              <span onClick={() => checkingFunction()}>
                <MyButton className="bg-white rounded-[15px] hover:text-white h-[45px]">
                  ADD {requestTitle.toUpperCase()}
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
