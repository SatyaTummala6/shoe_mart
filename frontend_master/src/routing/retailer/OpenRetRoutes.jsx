import { Navigate } from "react-router-dom";

const OpenRetRoutes = ({ children }) =>{
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('retailer_token'));
    return getTokenFromLocalStorage ? <Navigate to="/retailer/dashboard" replace={true} /> : children;
}

export default OpenRetRoutes;