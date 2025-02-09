import React from 'react';
import { Link } from "react-router-dom";
import Meta from "../../components/employee/Meta";
import BreadCrumb from "../../components/employee/Breadcrumb";

const Cart = () => {
    return (
        <>
            <Meta title="Cart" />
            <BreadCrumb title="Cart" />
            <div className="flex items-center justify-center mt-10">
                <section className="relative bg-white w-full py-10">
                    <div className="container mx-auto px-4">

                        {/* Cart Table */}
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left border-b">Image</th>
                                    <th className="px-4 py-2 text-left border-b">Product</th>
                                    <th className="px-4 py-2 text-left border-b">Price</th>
                                    <th className="px-4 py-2 text-left border-b">Quantity</th>
                                    <th className="px-4 py-2 text-left border-b">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b"> {/* Image */} <img src="path-to-image.jpg" alt="Product" className="w-16 h-16 object-cover" /> </td>
                                    <td className="px-4 py-2 border-b">Product Name</td>
                                    <td className="px-4 py-2 border-b">$10.00</td>
                                    <td className="px-4 py-2 border-b">2</td>
                                    <td className="px-4 py-2 border-b">$20.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="4" className="px-4 py-2 text-left border-t font-bold">Total</td>
                                    <td className="px-4 py-2 border-t">$20.00</td>
                                </tr>
                            </tfoot>
                        </table>

                        {/* Add some space for buttons below */}
                        <div className="flex justify-between mt-6">
                            <Link to="/checkout" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700">Proceed to Checkout</Link>
                            <Link to="/shop" className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700">Continue Shopping</Link>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
};

export default Cart;
