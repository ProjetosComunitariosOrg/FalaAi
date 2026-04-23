import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import NovaReclamacao from "./pages/NovaReclamacao";
import MinhasReclamacoes from "./pages/MinhasReclamacoes";
import DetalhesReclamacao from "./pages/DetalhesReclamacao";
import ReclamacoesPublicas from "./pages/ReclamacoesPublicas";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "cadastro", Component: Cadastro },
      { path: "home", Component: Home },
      { path: "nova-reclamacao", Component: NovaReclamacao },
      { path: "minhas-reclamacoes", Component: MinhasReclamacoes },
      { path: "reclamacoes-publicas", Component: ReclamacoesPublicas },
      { path: "reclamacao/:id", Component: DetalhesReclamacao },
    ],
  },
]);
