import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../../components/retailer/Meta";
import BreadCrumb from "../../components/retailer/Breadcrumb";
import userServices from "../../features/userServices";
import retailerServices from '../../features/retailerServices';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { getUsersData } = userServices;
const { getRetailerOrders } = retailerServices;

const Cart = () => {

    const [orderdata, setData] = useState([]);
    const [retailerId, setRetailerId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRetailerData = async () => {

            const response = await getUsersData('retailer'); // await the async function
            if (response?.status === 200) {
                setRetailerId(response.data._id);
            }

        };

        fetchRetailerData(); // Call the fetch function on component mount
    }, []);

    useEffect(() => {
        const fetchOrderData = async () => {
            if (retailerId) {
                const response = await getRetailerOrders(retailerId); // await the async function
                if (response?.status === 200) {
                    const data = response.data; // Store the fetched data
                    setData(data); // Update state with fetched 

                }
            }

        };
        fetchOrderData(); // Call the fetch function on component mount
    }, [retailerId]);


    return (
        <>
            <Meta title="Cart" />
            <BreadCrumb title="Cart" />
            <div className="flex items-center justify-center mt-10">
                <section className="relative bg-white w-full py-10">
                    <div className="container mx-auto px-4">

                        <div className="grid grid-cols-3 gap-4 bg-gray-300 p-2">
                            {orderdata &&
                                orderdata.map((item, index) => (
                                    <div key={index}>
                                        <Link to={`/retailer/view-order/${item._id}`}>
                                            <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                                                <h1 className="text-lg font-semibold mb-2 text-center">REQUESTED ORDER</h1>
                                                <h2 className="text-lg font-semibold mb-2">Order #{item._id}</h2>
                                                <p><strong>Order Date:</strong> {item.order_date || 'Pending'}</p>
                                                <p><strong>Requested Quantity:</strong> {item.requested_total_quantity || 'N/A'}</p>
                                                <p><strong>Requested Price:</strong> ${item.requested_grand_total || 'N/A'}</p>
                                                <p><strong>Status:</strong> {item.status || 'Pending'}</p>
                                            </div>
                                        </Link>

                                        {item.is_balance_exists === true && (
                                            <Link to={`/retailer/view-order/${item._id}`}>
                                                <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                                                    <h1 className="text-lg font-semibold mb-2 text-center">BALANCE</h1>
                                                    <h2 className="text-lg font-semibold mb-2">Order #{item._id}</h2>
                                                    <p><strong>Order Date:</strong> {item.order_date || 'Pending'}</p>
                                                    <p><strong>Balance Quantity:</strong> {item.balance_total_quantity || 'N/A'}</p>
                                                    <p><strong>Balance Price:</strong> ${item.balance_grand_total || 'N/A'}</p>
                                                    <p><strong>Status:</strong> {item.balance_status || 'Pending'}</p>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                ))}

                        </div>


                    </div>
                </section>
            </div>
            <ToastContainer />
        </>
    );
};

export default Cart;
