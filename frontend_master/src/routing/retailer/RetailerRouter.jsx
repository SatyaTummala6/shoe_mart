import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from '../../pages/retailer/HomePage';
import RLayouts from '../../components/retailer/Layouts';
import ForgotPassword from '../../pages/retailer/ForgotPassword';
import ResetPassword from '../../pages/retailer/ResetPassword';
import About from '../../pages/retailer/About';
import Shop from '../../pages/retailer/Shop';
import Contact from '../../pages/retailer/Contact';
import Dashboard from '../../pages/retailer/Dashboard';
import Cart from '../../pages/retailer/Cart';
import MyOrders from '../../pages/retailer/MyOrders';
import ChangePassword from '../../pages/retailer/ChangePassword';
import Profile from '../../pages/retailer/Profile';
import RetailerRegister from '../../pages/retailer/RetailerRegister';
import OpenRetRoutes from './OpenRetRoutes';
import PrivateRetRoutes from './PrivateRetRoutes';
import SingleProduct from '../../pages/retailer/SingleProduct';
import ViewOrder from '../../pages/retailer/ViewOrder';

const RetailerRouter = () => {
    return (


        <Routes>
            <Route path="/" element={<RLayouts />}>
                <Route index element={<OpenRetRoutes><HomePage /></OpenRetRoutes>} />
                <Route path="register" element={<OpenRetRoutes><RetailerRegister /></OpenRetRoutes>} />
                <Route path="forgot-password" element={<OpenRetRoutes><ForgotPassword /></OpenRetRoutes>} />
                <Route path="reset-password/:token" element={<OpenRetRoutes><ResetPassword /></OpenRetRoutes>} />

                <Route path="about" element={<About />} />
                <Route path="shop" element={<Shop />} />
                <Route path="get-product/:id" element={<SingleProduct />} />
                <Route path="contact" element={<Contact />} />
                <Route path="dashboard" element={<PrivateRetRoutes><Dashboard /></PrivateRetRoutes>} />
                <Route path="cart" element={<PrivateRetRoutes><Cart /></PrivateRetRoutes>} />
                <Route path="my-orders" element={<PrivateRetRoutes><MyOrders /></PrivateRetRoutes>} />
                <Route path="change-password" element={<PrivateRetRoutes><ChangePassword /></PrivateRetRoutes>} />
                <Route path="profile" element={<PrivateRetRoutes><Profile /></PrivateRetRoutes>} />
                <Route path="view-order/:id" element={<ViewOrder />} />
                {/* You can add more nested routes here */}
            </Route>
        </Routes>
     
    )
}

export default RetailerRouter