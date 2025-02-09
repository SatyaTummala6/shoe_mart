import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoOpenOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const Sidebar = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };
    return (
        <div>
            <aside className={`fixed top-0 left-0 z-50 h-full bg-gray-700 text-white p-4 transition-all`}>
                <button
                    className="text-sm font-medium float-right ml-3"
                    onClick={toggleSidebar}
                >
                    {isSidebarVisible ? <MdClose size={24} /> : <IoOpenOutline size={24} />}
                </button>

                {isSidebarVisible && (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-xl font-semibold text-center underline">Admin Panel</div>

                        </div>
                        <ul>
                            <li>
                                <Link to="dashboard" className="block py-2 px-4 hover:bg-amber-700">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="clients" className="block py-2 px-4 hover:bg-amber-700">Clients</Link>
                            </li>
                            <li>
                                <Link to="employees" className="block py-2 px-4 hover:bg-amber-700">Employees</Link>
                            </li>
                            <li>
                                <Link to="item-categories" className="block py-2 px-4 hover:bg-amber-700">Item Categories</Link>
                            </li>
                            <li>
                                <Link to="products" className="block py-2 px-4 hover:bg-amber-700">Products</Link>
                            </li>
                            <li>
                                <Link to="supplier-products" className="block py-2 px-4 hover:bg-amber-700">Supplier Products</Link>
                            </li>
                            <li>
                                <Link to="orders" className="block py-2 px-4 hover:bg-amber-700">Orders</Link>
                            </li>
                            <li>
                                <Link to="pending-orders" className="block py-2 px-4 hover:bg-amber-700">Pending Orders</Link>
                            </li>
                            <li>
                                <Link to="qr-orders" className="block py-2 px-4 hover:bg-amber-700">QR Orders</Link>
                            </li>
                            <li>
                                <Link to="pending-qr-orders" className="block py-2 px-4 hover:bg-amber-700">Pending QR Orders</Link>
                            </li>
                            <li>
                                <Link to="payments" className="block py-2 px-4 hover:bg-amber-700">Payments</Link>
                            </li>
                            <li>
                                <Link to="reports" className="block py-2 px-4 hover:bg-amber-700">Reports</Link>
                            </li>
                            <li>
                                <Link to="qr-reports" className="block py-2 px-4 hover:bg-amber-700">QR Reports</Link>
                            </li>
                            <li>
                                <Link to="/change-password" className="block py-2 px-4 hover:bg-amber-700">Change Password</Link>
                            </li>


                        </ul>
                    </>
                )}
            </aside>
        </div>
    )
}

export default Sidebar