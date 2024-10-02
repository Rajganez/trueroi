import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const TestimonialForClient = lazy(() => import("./pages/TestimonialForClient"));

const App = () => {
  const router = createBrowserRouter([
    { path: "/", exact: true, element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/feedback-matters/:idStr", element: <TestimonialForClient /> },
    { path: "/unsubscribe", element: <Unsubscribe /> },
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
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      }
    >
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
};

export default App;
