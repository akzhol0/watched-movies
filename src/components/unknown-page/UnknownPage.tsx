import { Link } from "react-router-dom";
import MyButton from "../UI/MyButtons/MyButton";
import Header from "../header/Header";

function UnknownPage() {
  return (
    <div className="w-full">
      <Header options={false} />
      <div className="w-full h-[600px] flex flex-col items-center pt-[80px]">
        <h1 className="my-2 text-center text-white">This page doesn't exist</h1>
        <Link to="/">
          <MyButton className="w-[200px] bg-[#2d4799]">
            Back to main page
          </MyButton>
        </Link>
      </div>
    </div>
  );
}

export default UnknownPage;
