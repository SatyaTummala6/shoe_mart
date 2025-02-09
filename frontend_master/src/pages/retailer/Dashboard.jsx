import React from 'react';
import { Link } from "react-router-dom";
import { FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import Meta from "../../components/retailer/Meta";
import BreadCrumb from "../../components/retailer/Breadcrumb";
// import { useAuthGuard } from "../../features/userServices";
const Dashboard = () => {
    // const token = useAuthGuard("admin");

    // if (!token) return null;
    return (
        <>
            <Meta title="Dashboard" />
            <BreadCrumb title="Dashboard" />
            <div className="flex items-center justify-center">
                <section className="relative bg-white w-full flex items-center justify-center py-10">
                    <div className="container mx-auto px-4">

                        {/* First Row */}
                        <div className="bg-gray-200 py-6 text-center mb-6">
                            <div className="focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <Link to="/cart"><FaShoppingCart className="text-4xl text-gray-800 mb-2 mx-auto focus:text-blue-500" /></Link>
                            </div>
                            <p className="text-lg text-gray-800">Cart</p>
                        </div>

                        {/* Second Row */}
                        <div className="bg-gray-200 py-6 text-center">
                            <div className="focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <Link to="/my-orders"><FaClipboardList className="text-4xl text-gray-800 mb-2 mx-auto focus:text-blue-500" /></Link>
                            </div>
                            <p className="text-lg text-gray-800">My Orders</p>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
};

export default Dashboard;
