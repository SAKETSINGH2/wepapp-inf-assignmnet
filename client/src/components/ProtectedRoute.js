import { useEffect } from "react";
import { useAuth } from "./context/auth";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/signup");
        }
    }, [token, navigate]);

    return token ? children : null;
};
export default ProtectedRoute;
