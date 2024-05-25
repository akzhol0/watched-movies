import { BrowserRouter } from "react-router-dom";
import "./assets/styles/global.scss";
import Footer from "./components/footer/Footer";
import { ContextOverAll } from "./components/context/logic";
import AppRouter from "./components/AppRouter";

function Router() {
  return (
    <ContextOverAll>
      <BrowserRouter>
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </ContextOverAll>
  );
}

export default Router;
