import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Layouts from './components/Layouts';
import Clients from './pages/Clients';
import Employees from './pages/Employees';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import SupplierProducts from './pages/SupplierProducts';
import Orders from './pages/Orders';
import EditOrder from './pages/EditOrder';
import ViewOrder from './pages/ViewOrder';
import QROrders from './pages/QROrders';
import EditQROrder from './pages/EditQROrder';
import ViewQROrder from './pages/ViewQROrder';
import PendingOrders from './pages/PendingOrders';
import ViewPendingOrder from './pages/ViewPendingOrder';
import PendingQROrders from './pages/PendingQROrders';
import ViewPendingQROrder from './pages/ViewPendingQROrder';

import Reports from './pages/Reports';
import ViewReports from './pages/ViewReports';
import QRReports from './pages/QRReports';
import ViewQRReports from './pages/ViewQRReports';

import Payments from './pages/Payments';
import ViewPayment from './pages/ViewPayment';
import AddEmployee from './pages/AddEmployee';
import OpenRoutes from './OpenRoutes';
import PrivateRoutes from './PrivateRoutes';
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import Practce from './pages/Practce';
import ItemCategories from './pages/ItemCategories';
import AddItemCategory from './pages/AddItemCategory';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<OpenRoutes><HomePage /></OpenRoutes>} />
        <Route path="/register" element={<OpenRoutes><Register /></OpenRoutes>} />
        <Route path="/practice" element={<Practce />} />
        <Route path="/" element={<Layouts />}>

          <Route path="dashboard" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />

          <Route path="clients" element={<PrivateRoutes><Clients /></PrivateRoutes>} />

          <Route path="employees" element={<PrivateRoutes><Employees /></PrivateRoutes>} />

          <Route path="add-employee" element={<PrivateRoutes><AddEmployee /></PrivateRoutes>} />

          <Route path="item-categories" element={<PrivateRoutes>< ItemCategories /></PrivateRoutes>} />
          
          <Route path="add-item-category" element={<PrivateRoutes><AddItemCategory /></PrivateRoutes>} />

          <Route path="products" element={<PrivateRoutes><Products /></PrivateRoutes>} />

          <Route path="add-product" element={<PrivateRoutes><AddProduct /></PrivateRoutes>} />

          <Route path="supplier-products" element={<PrivateRoutes><SupplierProducts /></PrivateRoutes>} />

          <Route path="orders" element={<PrivateRoutes><Orders /></PrivateRoutes>} />

          <Route path="edit-order/:id" element={<PrivateRoutes><EditOrder /></PrivateRoutes>} />

          <Route path="view-order/:id" element={<PrivateRoutes><ViewOrder /></PrivateRoutes>} />

          <Route path="qr-orders" element={<PrivateRoutes><QROrders /></PrivateRoutes>} />

          <Route path="edit-qr-order/:id" element={<PrivateRoutes><EditQROrder /></PrivateRoutes>} />

          <Route path="view-qr-order/:id" element={<PrivateRoutes><ViewQROrder /></PrivateRoutes>} />

          <Route path="pending-orders" element={<PrivateRoutes><PendingOrders /></PrivateRoutes>} />

          <Route path="view-pending-order/:id" element={<PrivateRoutes><ViewPendingOrder /></PrivateRoutes>} />

          <Route path="pending-qr-orders" element={<PrivateRoutes><PendingQROrders /></PrivateRoutes>} />

          <Route path="view-pending-order/:id" element={<PrivateRoutes><ViewPendingOrder /></PrivateRoutes>} />

          <Route path="view-pending-qr-order/:id" element={<PrivateRoutes><ViewPendingQROrder /></PrivateRoutes>} />

          <Route path="reports" element={<PrivateRoutes><Reports /></PrivateRoutes>} />

          <Route path="view-reports/:id" element={<PrivateRoutes><ViewReports /></PrivateRoutes>} />

          <Route path="qr-reports" element={<PrivateRoutes><QRReports /></PrivateRoutes>} />

          <Route path="view-qr-reports/:id" element={<PrivateRoutes><ViewQRReports /></PrivateRoutes>} />

          <Route path="payments" element={<PrivateRoutes><Payments /></PrivateRoutes>} />

          <Route path="view-payment/:id" element={<PrivateRoutes><ViewPayment /></PrivateRoutes>} />

          <Route path="change-password" element={<PrivateRoutes><ChangePassword /></PrivateRoutes>} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
