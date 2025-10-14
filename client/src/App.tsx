import React from "react";

import ModalAddSubject from "./components/modalAddSubject";
import ModalUpdateSubject from "./components/ModalUpdateSubject";
import ModalDelete from "./components/ModalDelete";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import SnackbarSuccess from "./components/SnackbarSuccess";
import Register from "./pages/Register";
import SubjectManager from "./pages/SubjectManager";

export default function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
