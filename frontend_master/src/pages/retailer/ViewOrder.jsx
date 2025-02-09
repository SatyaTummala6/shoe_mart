import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Meta from "../../components/retailer/Meta";
import BreadCrumb from "../../components/retailer/Breadcrumb";
import retailerServices from '../../features/retailerServices';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { getOrderListItems } = retailerServices;

const ViewOrder = () => {

    const [orderdata, setData] = useState([]);
    const [totalQty, setTotalQty] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const getOrderId = location.pathname.split('/')[3];
    console.log(getOrderId);


    useEffect(() => {
        const fetchOrderData = async () => {
        
                const response = await getOrderListItems(getOrderId); // await the async function
                if (response?.status === 200) {
                    const data = response.data; // Store the fetched data
                    setData(data); // Update state with fetched data
                    // Calculate totals based on the fetched data
                    const qty = data.reduce((sum, totQty) => sum + Number(totQty.requested_quantity), 0);
                    const price = data.reduce((sum, totPrice) => sum + Number(totPrice.price * totPrice.requested_quantity), 0);

                    setTotalQty(qty);
                    setTotalPrice(price);

                }
        };
        fetchOrderData(); // Call the fetch function on component mount
    }, [getOrderId]);

    return (
        <>
            <Meta title="Cart" />
            <BreadCrumb title="Cart" />
            <div className="flex items-center justify-center mt-10">
                <section className="relative bg-white w-full py-10">
                    <div className="container mx-auto px-4">

                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left border-b">Image</th>
                                    <th className="px-4 py-2 text-left border-b">Product</th>
                                    <th className="px-4 py-2 text-left border-b">Size</th>
                                    <th className="px-4 py-2 text-left border-b">Price</th>
                                    <th className="px-4 py-2 text-left border-b">Quantity</th>
                                    <th className="px-4 py-2 text-left border-b">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderdata.map((orderd, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b">
                                            <img
                                                src={orderd.product_id.primary_image}
                                                alt="Product"
                                                className="w-16 h-16 object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b">{orderd.product_id.title}</td>
                                        <td className="px-4 py-2 border-b">{orderd.size}</td>
                                        <td className="px-4 py-2 border-b">${orderd.product_id.rate}</td>
                                        <td className="px-4 py-2 border-b">{orderd.requested_quantity}</td>
                                        <td className="px-4 py-2 border-b">
                                            ${orderd.price * orderd.requested_quantity}
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="px-4 py-2 text-left border-t font-bold">Total</td>
                                    <td colSpan="3"></td>
                                    <td className="px-4 py-2 border-t">{totalQty}</td>
                                    <td className="px-4 py-2 border-t">${totalPrice}</td>
                                  
                                </tr>
                            </tfoot>
                        </table>



                    </div>
                </section>
            </div>
            <ToastContainer />
        </>
    );
};

export default ViewOrder;
