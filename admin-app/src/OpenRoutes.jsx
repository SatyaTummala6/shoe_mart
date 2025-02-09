import { Navigate } from "react-router-dom";

const OpenRoutes = ({ children }) =>{
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('admin_token'));
    return getTokenFromLocalStorage ? <Navigate to="/dashboard" replace={true} /> : children;
}

export default OpenRoutes;