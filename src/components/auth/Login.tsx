import { useContext, useState } from "react";
import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import MyButton from "../UI/MyButtons/MyButton";
import "../../assets/styles/global.scss";
import { auth } from "../../firebase/firebase";
import { contextData } from "../context/logic";

function Login() {
  const { setUserLogged } = useContext(contextData);
  const [eye, setEye] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        setUserLogged(true);    
        const user = userCredential.user;
        const userLS = JSON.stringify(user);
        localStorage.setItem('user', userLS);
        navigate('/')
      })
      .catch((err) => {
        if (err.code === 'auth/invalid-email') {
          setErrorMessage('Непрвильная почта')
        } else if (err.code === 'auth/missing-password') {
          setErrorMessage('Пароль не написан')
        } else if (err.code === 'auth/invalid-credential') {
          setErrorMessage('Почта или пароль не правильный')
        } else {
          setErrorMessage(err.code)
        }
      });
  };

  return (
    <div>
      <Header options={false} />
      <div className="w-full min-h-[800px] flex justify-center items-center">
        <section className="w-[350px] min-h-[400px] flex flex-col items-center bg-white rounded-lg">
          <h2 className="w-full text-center text-3xl font-Alumni border-b-2 border-black">
            Log In
          </h2>
          <div className="flex flex-col gap-2 items-center mt-[50px]">
            <input
              className="bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-sm"
              type="email"
              placeholder="Email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <div className="relative">
              <input
                className=" bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-sm"
                type={eye ? "text" : "password"}
                placeholder="Password"
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
            <Link to="/register">
              <small>Нет аккаунта? Регистрация</small>
            </Link>
            <div className="w-full flex justify-center">
              <span onClick={() => handleSignIn()}>
                <MyButton className="border border-[#3758c5] hover:text-white">
                  Войти
                </MyButton>
              </span>
            </div>
            <strong className="text-red-500 font-semibold">
              {<p>{errorMessage}</p>}
            </strong>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
