import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import userServices from '../../features/userServices'

const { getUsersData } = userServices;

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const [employeeData, setEmployeeData] = useState(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
    const tokenFromLocalStorage = JSON.parse(localStorage.getItem('employee_token'));

    useEffect(() => {
        const fetchEmployeeData = async () => {
            if (tokenFromLocalStorage) {
                const response = await getUsersData('employee'); // await the async function
                if (response?.status === 200) {
                    setEmployeeData(response.data); // Set the retailer data in state
                }
            }
        };

        fetchEmployeeData(); // Call the fetch function on component mount
    }, [tokenFromLocalStorage]);

    const handlelogout = () => {
        localStorage.removeItem('employee_token');
        window.location.reload();
    }
    return (
        <header className="w-screen bg-red-500 text-white z-50 font-josefin">

            {/* First Section */}
            <section className="p-1">
                <p className="tracking-wide text-sm text-center">
                    VENKATA PREMIERE SHOE MART
                </p>
            </section>

            {/* Second Section (Navbar) */}
            <section className="bg-white text-black">
                <nav className="container mx-auto p-4">
                    <ul className="flex justify-center space-x-6 text-[18px]">
                        <li className="hover:text-gray-700">
                            <Link to="/employee/" className="text-black">
                                Home
                            </Link>
                        </li>
                        <li className="hover:text-gray-700">
                            <Link to="/employee/about" className="text-black">
                                About
                            </Link>
                        </li>
                        <li className="hover:text-gray-700">
                            <Link to="/employee/shop" className="text-black">
                                Shop
                            </Link>
                        </li>
                        <li className="hover:text-gray-700">
                            <Link to="/employee/contact" className="text-black">
                                Contact
                            </Link>
                        </li>
                        {
                            tokenFromLocalStorage && (
                                <>
                                    <li className="hover:text-gray-700">
                                        <Link to="/employee/dashboard" className="text-black">
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li className="hover:text-gray-700">
                                        <Link to="/employee/cart" className="text-black">
                                            Cart
                                        </Link>
                                    </li>
                                    <li className="hover:text-gray-700">
                                        <Link to="/employee/my-orders" className="text-black">
                                            My Orders
                                        </Link>
                                    </li>
                                    <li className="hover:text-gray-700 relative flex items-center cursor-pointer" onClick={toggleDropdown}>
                                        <span className="font-josefin">{employeeData && employeeData.name ? employeeData.name : 'Guest'}</span>
                                        <svg
                                            className={`ml-2 w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>

                                        {isDropdownOpen && (
                                            <ul className="absolute left-0 top-full mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                                                <li>
                                                    <a
                                                        href="/employee/change-password"
                                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    >
                                                        Change Password
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="/employee/profile"
                                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    >
                                                        My Profile
                                                    </a>
                                                </li>
                                                <li onClick={handlelogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                                    Logout
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                </>
                            )}
                    </ul>
                </nav>
            </section>


        </header>
    );
};

export default Header;
