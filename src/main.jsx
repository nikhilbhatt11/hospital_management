import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout, Login, Signup } from "./components/index.js";

import AddDoc from "./pages/AddDoc.jsx";
import AllDoc from "./pages/AllDoc.jsx";
import Home from "./pages/Home.jsx";
import EditDoc from "./pages/EditDoc.jsx";
import Doctor from "./pages/Doctor.jsx";
import AddPatient from "./pages/AddPatient.jsx";
import PatientDetail from "./pages/PatientDetail.jsx";
import AllPatients from "./pages/AllPatients.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-docs",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllDoc />
          </AuthLayout>
        ),
      },
      {
        path: "/add-doc",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddDoc />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-doc/:url",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditDoc />
          </AuthLayout>
        ),
      },
      {
        path: "/all-patient",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPatients />
          </AuthLayout>
        ),
      },
      {
        path: "/add-patient",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPatient />
          </AuthLayout>
        ),
      },
      {
        path: "/patient-detail/:url",
        element: (
          <AuthLayout authentication>
            {" "}
            <PatientDetail />
          </AuthLayout>
        ),
      },
      {
        path: "/doc/:url",
        element: <Doctor />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <StrictMode>
        <App />
      </StrictMode>
    </RouterProvider>
  </Provider>
);
