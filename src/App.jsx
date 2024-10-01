import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";
import TestimonialForClient from "./pages/TestimonialForClient";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const App = () => {
  const router = createBrowserRouter([
    { path: "/", exact: true, element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/feedback-matters/:idStr", element: <TestimonialForClient /> },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    { path: "*", element: <h1>404 Not Found</h1> },
  ]);
  return (
    // <div>Ayyappa!!</div>
    <Suspense fallback={<h3>Loading..</h3>}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
};

export default App;
