import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from '../../pages/supplier/HomePage';
import SLayouts from '../../components/supplier/Layouts';
import SupplierRegister from '../../pages/supplier/SupplierRegister';
import Dashboard from '../../pages/supplier/Dashboard';
import OpenSupRoutes from './OpenSupRoutes';
import PrivateSupRoutes from './PrivateSupRoutes';
import ForgotPassword from '../../pages/supplier/ForgotPassword';
import ResetPassword from '../../pages/supplier/ResetPassword';
import ChangePassword from '../../pages/supplier/ChangePassword';
import Products from '../../pages/supplier/Products';
import AddProduct from '../../pages/supplier/AddProduct';

const SupplierRouter = () => {
  return (

    <Routes>
      {/* Route without layout */}
      <Route path="/" element={<OpenSupRoutes><HomePage /></OpenSupRoutes>} />
      <Route path="/register" element={<OpenSupRoutes><SupplierRegister /></OpenSupRoutes>} />

      <Route path="/forgot-password" element={<OpenSupRoutes><ForgotPassword /></OpenSupRoutes>} />
      <Route path="/reset-password/:token" element={<OpenSupRoutes><ResetPassword /></OpenSupRoutes>} />
      {/* Routes with layout */}
      <Route path="/" element={<SLayouts />}>

        <Route path="dashboard" element={<PrivateSupRoutes><Dashboard /></PrivateSupRoutes>} />
        <Route path="change-password" element={<PrivateSupRoutes><ChangePassword /></PrivateSupRoutes>} />
        <Route path="products" element={<PrivateSupRoutes><Products /></PrivateSupRoutes>} />
        <Route path="add-product" element={<PrivateSupRoutes><AddProduct /></PrivateSupRoutes>} />
        {/* Add more nested routes here */}
      </Route>
    </Routes>

  );
};

export default SupplierRouter;
