import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from '../../pages/employee/HomePage';
import ELayouts from '../../components/employee/Layouts';

import ForgotPassword from '../../pages/employee/ForgotPassword';
import ResetPassword from '../../pages/employee/ResetPassword';
import About from '../../pages/employee/About';
import Shop from '../../pages/employee/Shop';
import Contact from '../../pages/employee/Contact';
import Dashboard from '../../pages/employee/Dashboard';
import Cart from '../../pages/employee/Cart';
import MyOrders from '../../pages/employee/MyOrders';
import ChangePassword from '../../pages/employee/ChangePassword';
import Profile from '../../pages/employee/Profile';
import EmployeeRegister from '../../pages/employee/EmployeeRegister';

import OpenEmpRoutes from './OpenEmpRoutes';
import PrivateEmpRoutes from './PrivateEmpRoutes';

const EmployeeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ELayouts />}>
        <Route index element={<OpenEmpRoutes><HomePage /></OpenEmpRoutes>} />
        <Route path="register" element={<OpenEmpRoutes><EmployeeRegister /></OpenEmpRoutes>} />
        <Route path="forgot-password" element={<OpenEmpRoutes><ForgotPassword /></OpenEmpRoutes>} />
        <Route path="reset-password/:token" element={<OpenEmpRoutes><ResetPassword /></OpenEmpRoutes>} />

        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="contact" element={<Contact />} />
        <Route path="dashboard" element={<PrivateEmpRoutes><Dashboard /></PrivateEmpRoutes>} />
        <Route path="cart" element={<PrivateEmpRoutes><Cart /></PrivateEmpRoutes>} />
        <Route path="my-orders" element={<PrivateEmpRoutes><MyOrders /></PrivateEmpRoutes>} />
        <Route path="change-password" element={<PrivateEmpRoutes><ChangePassword /></PrivateEmpRoutes>} />
        <Route path="profile" element={<PrivateEmpRoutes><Profile /></PrivateEmpRoutes>} />
      </Route>
    </Routes>
  );
};


export default EmployeeRouter