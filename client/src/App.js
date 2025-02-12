import "./App.css";
import { RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

//
const router = createBrowserRouter([
    {
        path: "/",
        element: <Signup />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/Home",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "/reset_password",
        element: <ResetPassword />,
    },
    {
        path: "/forgot_password",
        element: <ForgotPassword />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
