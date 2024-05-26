import { useContext } from "react";
import { contextData } from "../../context/logic";

function MyMessagerModal() {
  const { setMessagerLogin } = useContext(contextData);

  setTimeout(() => {
    setMessagerLogin(false);
  }, 3000);

  return (
    <div className="animMessager absolute top-[110px] left-[50%] -translate-x-[109px] rounded-[10px] bg-white">
      <p className="px-2 py-1 text-center text-black cursor-default">
        Please log in or register <br />  to enter the site!
      </p>
    </div>
  );
}

export default MyMessagerModal;
