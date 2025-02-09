import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateSupRoutes = ({ children }) => {
   
    const tokenFromLocalStorage = JSON.parse(localStorage.getItem('supplier_token'));
    if (!tokenFromLocalStorage) {
        return <Navigate to="/supplier/" replace={true} />;
    }

    return children;
};

export default PrivateSupRoutes;