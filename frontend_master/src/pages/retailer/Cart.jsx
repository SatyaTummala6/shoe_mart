import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../../components/retailer/Meta";
import BreadCrumb from "../../components/retailer/Breadcrumb";
import userServices from "../../features/userServices";
import retailerServices from '../../features/retailerServices';
import { ROLES } from "../../utils/constants";;
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { getUsersData } = userServices;
const { getCartItems, createPlaceOrder } = retailerServices;

const Cart = () => {

    const [cartdata, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [retailerId, setRetailerId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [totalQty, setTotalQty] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
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
        const fetchCartData = async () => {
            if (retailerId) {
                const response = await getCartItems(retailerId); // await the async function
                if (response?.status === 200) {
                    const data = response.data; // Store the fetched data
                    setData(data); // Update state with fetched data

                    // Calculate totals based on the fetched data
                    const qty = data.reduce((sum, totQty) => sum + Number(totQty.quantity), 0);
                    const price = data.reduce((sum, totPrice) => sum + Number(totPrice.product_id.rate * totPrice.quantity), 0);

                    setTotalQty(qty);
                    setTotalPrice(price);

                }
            }

        };


        fetchCartData(); // Call the fetch function on component mount
    }, [retailerId]);

    const formik = useFormik({
        enableReinitialize: true, // Allows values to update when data changes
        initialValues: {
            client_id: retailerId,
            cart_items: cartdata.map((cartd) => ({
                product_id: cartd.product_id._id,
                size: cartd.size,
                quantity: cartd.quantity,
                price: cartd.product_id.rate,
            })),
            total_quantity: totalQty,
            total_price: totalPrice,
        },
        onSubmit: async (values) => {
            try {
                const response = await createPlaceOrder(values);
                // If the response is not an error object, process it as a successful response
                if (response?.status === 201) {

                    setErrorMessage("");
                    toast.success("Order Placed successfully");
                    setTimeout(() => {
                        navigate("/retailer/my-orders");
                    }, 2000);

                } else {
                    setErrorMessage("Unexpected response status");
                    toast.error("Unexpected response status");
                }
            } catch (error) {
                console.log(error);
                // If error is returned from createItemCategory
                if (error?.error) {
                    console.error('Error:', error.message);

                    if (error.response) {
                        // The server responded with a non-2xx status code
                        console.error('Server Response Error:', error.response);
                        setErrorMessage(error.response?.data?.message || "Error occurred on the server");
                        toast.error(error.response?.data?.message || "Error occurred on the server");
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.error('Request Made but No Response:', error.request);
                        setErrorMessage("No response from the server");
                        toast.error("No response from the server");
                    } else {
                        // Something else triggered the error (e.g., configuration issue)
                        console.error('General Error Message:', error.message);
                        setErrorMessage(error.message || "An error occurred");
                        toast.error(error.message || "An error occurred");
                    }
                }
            } finally {
                setLoading(false);
            }
        },
    });


    return (
        <>
            <Meta title="Cart" />
            <BreadCrumb title="Cart" />
            <div className="flex items-center justify-center mt-10">
                <section className="relative bg-white w-full py-10">
                    <div className="container mx-auto px-4">
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                type="hidden"
                                name="client_id"
                                value={formik.values.client_id || ""}
                            />
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
                                    {cartdata.map((cartd, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border-b">
                                                <img
                                                    src={cartd.product_id.primary_image}
                                                    alt="Product"
                                                    className="w-16 h-16 object-cover"
                                                />
                                            </td>
                                            <td className="px-4 py-2 border-b">{cartd.product_id.title}</td>
                                            <td className="px-4 py-2 border-b">{cartd.size}</td>
                                            <td className="px-4 py-2 border-b">${cartd.product_id.rate}</td>
                                            <td className="px-4 py-2 border-b">{cartd.quantity}</td>
                                            <td className="px-4 py-2 border-b">
                                                ${cartd.product_id.rate * cartd.quantity}
                                            </td>
                                            <input
                                                type="hidden"
                                                name={`cart_items[${index}].product_id`}
                                                value={cartd.product_id._id || ""}
                                            />
                                            <input
                                                type="hidden"
                                                name={`cart_items[${index}].size`}
                                                value={cartd.size || ""}
                                            />
                                            <input
                                                type="hidden"
                                                name={`cart_items[${index}].quantity`}
                                                value={cartd.quantity || ""}
                                            />
                                            <input
                                                type="hidden"
                                                name={`cart_items[${index}].price`}
                                                value={cartd.product_id.rate || ""}
                                            />
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="px-4 py-2 text-left border-t font-bold">Total</td>
                                        <td colSpan="3"></td>
                                        <td className="px-4 py-2 border-t">{totalQty}</td>
                                        <td className="px-4 py-2 border-t">${totalPrice}</td>
                                        <input
                                            type="hidden"
                                            name="total_quantity"
                                            value={formik.values.total_quantity || ""}
                                        />
                                        <input
                                            type="hidden"
                                            name="total_price"
                                            value={formik.values.total_price || ""}
                                        />
                                    </tr>
                                </tfoot>
                            </table>

                            <div className="flex justify-between mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
                                >
                                    Proceed to Checkout
                                </button>
                                <Link
                                    to="/shop"
                                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </form>

                    </div>
                </section>
            </div>
            <ToastContainer />
        </>
    );
};

export default Cart;
