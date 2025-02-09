import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import adminServices from "../features/adminServices";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { getAllOrders, getOrderListItems, updateOrder } = adminServices;

const ViewOrder = () => {
  const [cartdata, setCartData] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const getOrderId = location.pathname.split('/')[3];

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await getOrderListItems(getOrderId);
        if (response?.status === 200) {
          const data = response.data;
          setCartData(data);

          // Calculate initial totals
          const qty = data.reduce((sum, item) => sum + Number(item.quantity), 0);
          const price = data.reduce(
            (sum, item) => sum + Number(item.product_id.rate * item.quantity),
            0
          );
          setTotalQty(qty);
          setTotalPrice(price);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [getOrderId]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartData = [...cartdata];
    updatedCartData[index].quantity = newQuantity;

    // Update the totals
    const newTotalQty = updatedCartData.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    const newTotalPrice = updatedCartData.reduce(
      (sum, item) => sum + Number(item.product_id.rate * item.quantity),
      0
    );

    setCartData(updatedCartData);
    setTotalQty(newTotalQty);
    setTotalPrice(newTotalPrice);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      client_id: getOrderId,
      cart_items: cartdata.map((item) => ({
        product_id: item.product_id._id,
        size: item.size,
        quantity: item.quantity,
        price: item.product_id.rate,
      })),
      total_quantity: totalQty,
      total_price: totalPrice,
    };

    try {
      const response = await createPlaceOrder(orderData);
      if (response?.status === 201) {
        toast.success("Order updated successfully");
        setTimeout(() => {
          navigate("/retailer/my-orders");
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Error updating order");
    }
  };

  return (
    <div className="ml-[200px] mt-14 p-4 bg-white min-h-full flex items-center justify-center">
      <section className="bg-gray-200 shadow-md rounded-lg p-4 w-full min-h-full min-w-fit">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Orders</h2>
        </div>
        <form onSubmit={handleSubmit}>
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
                  <td className="px-4 py-2 border-b">
                    <input
                      type="number"
                      min="1"
                      value={cartd.quantity}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                      className="w-16 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    ${cartd.product_id.rate * cartd.quantity}
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
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Update Order
            </button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </div>
  );
};

export default ViewOrder;
