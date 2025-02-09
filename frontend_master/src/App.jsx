import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RetailerRouter from './routing/retailer/RetailerRouter';
import EmployeeRouter from './routing/employee/EmployeeRouter';
import SupplierRouter from './routing/supplier/SupplierRouter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Employee routes */}
        <Route path="employee/*" element={<EmployeeRouter />} />

        {/* Retailer routes */}
        <Route path="retailer/*" element={<RetailerRouter />} />

        {/* Supplier routes */}
        <Route path="supplier/*" element={<SupplierRouter />} />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<div>Route not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
