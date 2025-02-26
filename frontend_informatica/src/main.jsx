import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import PaginaError from "./pages/PaginaError";
import AltaProyecto from "./components/AltaProyecto";
import AltaTarea from "./components/AltaTarea";
import ListadoTareas from "./components/ListadoTareas";
import ListadoProyectos from "./components/ListadoProyectos";
import ModificarProyecto from "./components/ModificarProyecto";
import ModificarTarea from "./components/ModificarTarea";
import BusquedaProyectosId from "./components/BusquedaProyectosId";
import BusquedaTareasId from "./components/BusquedaTareasId";
import ListadoProyectosFiltrado from "./components/ListadoProyectosFiltrado";
import ListadoProyectosPaginado from "./components/ListadoProyectosPaginado";
import LandPage from "./components/LandPage";

let router = createBrowserRouter([
  {
    path: "/",
    element : <Home />,
    errorElement : <PaginaError />,
    children: [   // Los hijos se renderizan en el elemento <Outlet /> del padre
      {
        path: "listadotareas",
        element: <ListadoTareas />,
      },
      {
        path: "listadoproyectos",
        element: <ListadoProyectos />,
      },
      {
        path: "altaproyecto",
        element: <AltaProyecto />,
      },
      {
        path: "altatarea",
        element: <AltaTarea />,
      },
      {
        path: "modificarproyecto/:id_proyecto",
        element: <ModificarProyecto />,
      },
      {
        path: "modificartarea/:id_tarea",
        element: <ModificarTarea />,
      },
      {
        path: "busquedaProyectosId",
        element: <BusquedaProyectosId />,
      },
      {
        path: "busquedaTareasId",
        element: <BusquedaTareasId />,
      },
      {
        path: "listadoProyectosFiltrado",
        element: <ListadoProyectosFiltrado />,
      },
      {
        path: "listadoProyectosPaginados",
        element: <ListadoProyectosPaginado />,
      },
      {
        path: "landpage",
        element: <LandPage />,
      },
      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
