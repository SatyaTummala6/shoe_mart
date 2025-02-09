import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";

const Layouts = () => {
  return (
    <div>
      <Header />
      <Outlet /> {/* This is where child components like HomePage will render */}
      <Footer />
    </div>
  );
};

export default Layouts;
