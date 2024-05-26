import { BrowserRouter } from "react-router-dom";
import "./assets/styles/global.scss";
import Footer from "./components/footer/Footer";
import { ContextOverAll } from "./components/context/logic";
import AppRoutes from "./components/AppRoutes";

function Router() {
  return (
    <ContextOverAll>
      <BrowserRouter>
        <AppRoutes/>
        <Footer />
      </BrowserRouter>
    </ContextOverAll>
  );
}

export default Router;
