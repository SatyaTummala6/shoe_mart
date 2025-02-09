import { Navigate } from "react-router-dom";

const OpenEmpRoutes = ({ children }) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('employee_token'));

    return getTokenFromLocalStorage ? <Navigate to="/employee/dashboard" replace={true} /> : children;
};

export default OpenEmpRoutes;
