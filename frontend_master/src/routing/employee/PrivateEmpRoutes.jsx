import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateEmpRoutes = ({ children }) => {
   
    // // Check if user exists in state or localStorage and token is available
    const tokenFromLocalStorage = JSON.parse(localStorage.getItem('employee_token'));
    
    if (!tokenFromLocalStorage) {
        return <Navigate to="/employee/" replace={true} />;
    }

    return children;
};

export default PrivateEmpRoutes;