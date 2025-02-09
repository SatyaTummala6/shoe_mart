import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userServices from '../features/userServices';

const { getUsersData } = userServices;   
const Header = () => {

    const [adminData, setAdminData] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const tokenFromLocalStorage = JSON.parse(localStorage.getItem('admin_token'));

     useEffect(() => {
            const fetchAdminData = async () => {
                if (tokenFromLocalStorage) {
                    const response = await getUsersData('admin'); // await the async function
                    if (response?.status === 200) {
                        setAdminData(response.data); // Set the retailer data in state
                    }
                }
            };
    
            fetchAdminData(); // Call the fetch function on component mount
        }, [tokenFromLocalStorage]);

    const handlelogout = () => {
        localStorage.removeItem('admin_token');
        window.location.reload();
    }



    return (
        <>



            {/* Main content area */}

            <header className="w-full bg-amber-300 text-white z-40 font-josefin fixed top-0 left-0 h-14 flex items-center px-4">

                <section className="p-4 flex justify-between items-center w-full">
                    <p className="tracking-wide text-sm text-center flex-grow">
                        VENKATA PREMIERE SHOE MART
                    </p>

                    <div className="relative">
                        <button
                            className="text-sm font-medium"
                            onClick={toggleDropdown}
                        >
                            {adminData && adminData.name ? adminData.name : 'Admin'} {/* Replace with actual admin name */}
                        </button>

                        {/* Dropdown menu */}
                        {isDropdownVisible && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                                <ul className="py-2">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-200">
                                            Change Password
                                        </a>
                                    </li>
                                    <li onClick={handlelogout} className="block px-4 py-2 text-sm hover:bg-gray-200">
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            </header>


        </>
    );
};

export default Header;
