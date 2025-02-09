import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRetRoutes = ({ children }) => {
   
    // Check if user exists in state or localStorage and token is available
   
    const tokenFromLocalStorage = JSON.parse(localStorage.getItem('retailer_token'));
    if (!tokenFromLocalStorage) {
        return <Navigate to="/retailer/" replace={true} />;
    }

    return children;
};

export default PrivateRetRoutes;