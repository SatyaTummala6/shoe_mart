import { Navigate } from "react-router-dom";

const OpenSupRoutes = ({ children }) =>{
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('supplier_token'));
    return getTokenFromLocalStorage ? <Navigate to="/supplier/dashboard" replace={true} /> : children;
}

export default OpenSupRoutes;