import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminServices from "../features/adminServices";

const { getOrderListItems, editOrder } = adminServices;

const EditOrder = () => {
  const [orderdata, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const getOrderId = location.pathname.split("/")[2];


  useEffect(() => {
    const fetchOrderData = async () => {
      if (!getOrderId) return;

      try {
        const response = await getOrderListItems(getOrderId);

        if (response?.status === 200) {
          const data = response.data;
          setOrderData(data);

          // Calculate totals
          const qty = data.reduce((sum, item) => sum + Number(item.requested_quantity), 0);
          const price = data.reduce(
            (sum, item) => sum + Number(item.product_id.rate * item.requested_quantity),
            0
          );

          setTotalQty(qty);
          setTotalPrice(price);

          // Update Formik's initialValues

        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [getOrderId]);

  // Formik initialization
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      order_id: getOrderId,
      cart_items: orderdata.length > 0 ? orderdata.map((item) => ({
        order_list_id: item._id,
        product_id: item.product_id._id,
        min_order: item.product_id.min_order,
        size: item.size,
        quantity: item.requested_quantity || 0,  // Default to 0 if requested_quantity is not set
        price: item.product_id.rate,
      })) : [],
      total_quantity: totalQty,
      total_price: totalPrice,

    },

    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      try {
        const response = await editOrder(values);
        if (response?.status === 201) {
          toast.success("Order updated successfully!");
          setTimeout(() => navigate("/retailer/my-orders"), 2000);
        } else {
          toast.error("Unexpected response status.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the order.");
        console.error("Error editing order:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleQuantityChange = (action, index, minOrder = 1) => {

    let currentQuantity = Number(formik.values.cart_items[index].quantity) || minOrder;

    minOrder = minOrder || 1;  // This line ensures minOrder defaults to 1 if not passed

    let newQuantity = currentQuantity; // Start with current quantity

    if (action === "increment") {
      newQuantity += minOrder; // Increment by minOrder (or 1)
    } else if (action === "decrement" && newQuantity > minOrder) {
      newQuantity -= minOrder; // Decrement by minOrder, but ensure it doesn't go below minOrder
    }

    // console.log(newQuantity); // Debug log to see the new quantity
    formik.setFieldValue(`cart_items[${index}].quantity`, newQuantity); // Update Formik state


  };

  useEffect(() => {
    let newTotalQuantity = Number(formik.values.cart_items.reduce((total, item) => Number(total) + Number(item.quantity), 0));
    let newTotalPrice = Number(formik.values.cart_items.reduce((total, item) => Number(total) + Number(item.quantity) * Number(item.price), 0));

    // Update total_quantity and total_price in Formik state
    formik.setFieldValue("total_quantity", newTotalQuantity);
    formik.setFieldValue("total_price", newTotalPrice);
  }, [formik.values.cart_items]);



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="ml-[200px] mt-14 p-4 bg-white min-h-full flex items-center justify-center"
      >
        <section className="bg-gray-200 shadow-md rounded-lg p-4 w-full min-h-full min-w-fit">


          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Orders</h2>

          </div>
          <div className="container mx-auto px-4">
            <form onSubmit={formik.handleSubmit}>
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
                  {orderdata.map((item, index) => {
                    const rowTotal = Number(formik.values.cart_items[index]?.quantity) * Number(item.price); // Calculate row total

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        {/* Hidden Inputs */}
                        <input type="hidden" name={`cart_items[${index}].order_list_id`} value={item.order_list_id} />
                        <input type="hidden" name={`cart_items[${index}].price`} value={item.price} />

                        {/* Image */}
                        <td className="px-4 py-2 border-b">
                          <img
                            src={item.product_id.primary_image}
                            alt="Product"
                            className="w-16 h-16 object-cover"
                          />
                        </td>

                        {/* Product Title */}
                        <td className="px-4 py-2 border-b">{item.product_id.title}</td>

                        {/* Size */}
                        <td className="px-4 py-2 border-b">{item.size}</td>

                        {/* Price */}
                        <td className="px-4 py-2 border-b">${item.price}</td>

                        {/* Quantity Management */}
                        <td className="px-4 py-2 border-b">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange("decrement", index, item.product_id.min_order)}
                            className="px-2 py-2 bg-gray-200 rounded-full"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            name={`cart_items[${index}].quantity`}
                            className="w-16 text-center"
                            value={formik.values.cart_items[index]?.quantity || 0} // Default to 0 if undefined
                            onChange={(e) => formik.setFieldValue(`cart_items[${index}].quantity`, e.target.value)} // Update Formik state on change
                          />


                          <button
                            type="button"
                            onClick={() => handleQuantityChange("increment", index, item.product_id.min_order)}
                            className="px-2 py-2 bg-gray-200 rounded-full"
                          >
                            +
                          </button>
                        </td>

                        {/* Subtotal */}
                        <td className="px-4 py-2 border-b">${rowTotal}</td>
                      </tr>
                    );
                  })}
                </tbody>


                <tfoot>
                  <tr>
                    <td className="px-4 py-2 text-left border-t font-bold">
                      Total
                    </td>
                    <td colSpan="3"></td>
                    <td className="px-4 py-2 border-t">{formik.values.total_quantity}</td>
                    <td className="px-4 py-2 border-t">${formik.values.total_price}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded"
                  disabled={loading}
                >
                  Edit Order
                </button>

              </div>
            </form>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditOrder;
