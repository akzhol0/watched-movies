import { useState } from "react";
import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "../../assets/styles/global.scss";
import MyButton from "../UI/MyButtons/MyButton";
import { auth, provider } from "../../firebase/firebase";
import MyGoogleIcon from "../UI/MyIcons/MyGoogleIcon";

function Register() {
  const [eye, setEye] = useState<boolean>(true);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordSecond, setPasswordSecond] = useState<string>("");
  const navigate = useNavigate();

  const check = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordSecond) {
      setErrorMessage("Пароли не совпадают!");
    } else {
      handleSignUp();
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, login, password)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          setErrorMessage("Почта неправильная!");
        } else if (err.code === "auth/missing-password") {
          setErrorMessage("Неправильный пароль!");
        } else if (err.code === "auth/weak-password") {
          setErrorMessage("Слабый пароль!");
        } else if (err.code === "auth/email-already-in-use") {
          setErrorMessage("Эта почта уже используется");
        } else {
          setErrorMessage(err.code);
        }
      });
  };

  return (
    <div>
      <Header options={false} />
      <div className="w-full h-[800px] flex justify-center items-center">
        <section className="w-[350px] min-h-[400px] flex flex-col items-center bg-white rounded-lg">
          <h2 className="w-full text-center text-3xl font-Alumni border-b-2 border-black">
            Register
          </h2>
          <form
            onSubmit={check}
            className="flex flex-col gap-2 items-center mt-[50px]"
          >
            <input
              className="bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-md"
              type="email"
              placeholder="Почта"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <div className="relative">
              <input
                className="bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-md"
                type={eye ? "password" : "text"}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setEye(eye ? false : true)}
              >
                <img src="img/eye.png" alt="eye" width={25} height={25} />
              </span>
            </div>
            <div className="relative">
              <input
                className="bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-md"
                type={eye ? "password" : "text"}
                placeholder="Пароль, еще раз"
                value={passwordSecond}
                onChange={(e) => setPasswordSecond(e.target.value)}
              />
              <span
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setEye(eye ? false : true)}
              >
                <img src="img/eye.png" alt="eye" width={25} height={25} />
              </span>
            </div>
            <Link to="/login">
              <small>Есть аккаунт? Войти</small>
            </Link>
            <div className="w-full flex flex-col gap-2 justify-center">
              <MyButton
                type="submit"
                className="w-full border border-[#3758c5] hover:text-white"
              >
                Sign Up
              </MyButton>
              <span onClick={() => signInWithGoogle()}>
                <MyButton className="w-full flex justify-center gap-2 py-1 border border-[#3758c5] hover:text-white">
                  <MyGoogleIcon />
                  Sign Up With Google
                </MyButton>
              </span>
            </div>
            <strong className="text-red-500 font-semibold">
              {<p>{errorMessage}</p>}
            </strong>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Register;
