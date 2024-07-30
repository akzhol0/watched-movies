import { useContext, useEffect, useState } from "react";
import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import MyButton from "../UI/MyButtons/MyButton";
import "../../assets/styles/global.scss";
import { auth, provider } from "../../firebase/firebase";
import db from "../../firebase/firebase";
import { contextData } from "../context/logic";
import { doc, getDoc, setDoc } from "firebase/firestore";
import MyMessagerModal from "../UI/MyModals/MyMessagerModal";
import MyGoogleIcon from "../UI/MyIcons/MyGoogleIcon";

function Login() {
  const { setUserLogged, getUserInfo, userLogged, messagerLogin } =
    useContext(contextData);
  const [eye, setEye] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged) {
      navigate("/");
    }
  }, []);

  async function checkIfPostsExists(user: any) {
    const movieRef = doc(db, `${user.user.uid}`, "shows");
    const docSnap = await getDoc(movieRef);

    if (!docSnap.exists()) {
      console.log("created");
      await setDoc(doc(db, `${user.user.uid}`, "shows"), {});
      await setDoc(doc(db, `${user.user.uid}`, "movies"), {});
    }
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        const userLS = JSON.stringify(user);
        localStorage.setItem("user", userLS);

        checkIfPostsExists(userCredential);

        setUserLogged(true);
        getUserInfo();
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userLS = JSON.stringify(user);
        localStorage.setItem("user", userLS);

        checkIfPostsExists(userCredential);

        setUserLogged(true);
        getUserInfo();
        navigate("/");
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          setErrorMessage("Неправильная почта");
        } else if (err.code === "auth/missing-password") {
          setErrorMessage("Пароль не написан");
        } else if (err.code === "auth/invalid-credential") {
          setErrorMessage("Почта или пароль не правильный");
        } else {
          setErrorMessage(err.code);
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
          <form
            onSubmit={handleSignIn}
            className="flex flex-col gap-2 items-center mt-[50px]"
          >
            <input
              className="bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-md"
              type="email"
              placeholder="Email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <div className="relative">
              <input
                className=" bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-md"
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
            <div className="w-full flex flex-col gap-2 justify-center">
              <MyButton
                type="submit"
                className="w-full py-1 border border-[#3758c5] hover:text-white"
              >
                Sign In
              </MyButton>
              <span onClick={() => signInWithGoogle()}>
                <MyButton className="w-full flex justify-center gap-2 py-1 border border-[#3758c5] hover:text-white">
                  <MyGoogleIcon />
                  Sign In With Google
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

export default Login;
