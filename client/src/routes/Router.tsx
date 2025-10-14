import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import SubjectManager from "../pages/SubjectManager";
import LessionManager from "../pages/LessionManager";
import NotFound from "../components/NotFound";
import ProtectedRouter from "../components/ProtectedRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/home",
    element: <ProtectedRouter element={<Home></Home>}></ProtectedRouter>,
    children: [
      { path: "subject_Manager", element: <SubjectManager></SubjectManager> },
      { path: "lession_manager", element: <LessionManager></LessionManager> },
    ],
  },

  { path: "*", element: <NotFound></NotFound> },
  { path: "subject_Manager", element: <SubjectManager></SubjectManager> },
  { path: "lession_manager", element: <LessionManager></LessionManager> },
]);
