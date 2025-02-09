import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
   
    const tokenFromLocalStorage = JSON.parse(localStorage.getItem('admin_token'));
    if (!tokenFromLocalStorage) {
        return <Navigate to="/" replace={true} />;
    }

    return children;
};

export default PrivateRoutes;