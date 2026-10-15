import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Baas from "./pages/Baas.jsx";
import WhiteLabelPage from "./pages/WhiteLabelPage.jsx";
import Tributario from "./pages/Tributario.jsx";
import Regularizacao from "./pages/Regularizacao.jsx";
import Recuperacao from "./pages/Recuperacao.jsx";
import { Privacidade, Termos } from "./pages/Legal.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/baas" element={<Baas />} />
        <Route path="/white-label" element={<WhiteLabelPage />} />
        <Route path="/tributario" element={<Tributario />} />
        <Route path="/tributario/regularizacao" element={<Regularizacao />} />
        <Route path="/tributario/recuperacao-de-creditos" element={<Recuperacao />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
