import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../../components/retailer/Meta";
import BreadCrumb from "../../components/retailer/Breadcrumb";
import userServices from "../../features/userServices";
import { useLocation } from 'react-router-dom';
const { getAProduct } = userServices;
import { ROLES } from "../../utils/constants";
import retailerServices from '../../features/retailerServices';
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const { createCartProduct } = retailerServices;
const { getUsersData } = userServices;

const SingleProduct = () => {
    const [productdata, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const getProductId = location.pathname.split('/')[3];
    const [retailerId, setRetailerId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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

    const [selectedSize, setSelectedSize] = useState("");

    const handleSizeChange = (e) => {
        const size = e.target.value;
        setSelectedSize(size);
        formik.setFieldValue("size", size);  // Update Formik's value
        formik.setFieldTouched("size", true); // Mark the size field as touched
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await getAProduct(ROLES.RETAILER, getProductId);
                setData(product);
                console.log("Product data loaded:", product); // Log the product data here
            } catch (error) {
                console.error("Error fetching product data:", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getProductId]);

    const formik = useFormik({
        enableReinitialize: true, // Reinitialize the form when productdata changes
        initialValues: {
            client_id: retailerId,
            product_id: productdata?._id,
            size: "",
            quantity: productdata?.min_order || 1, // Default to productdata.min_order or 1
        },
        validationSchema: Yup.object({
            size: Yup.string().required("Size is required"),
            quantity: Yup.number()
                .required("Quantity is required")
                .typeError("Quantity must be a positive number")
                .positive("Quantity must be a positive number")
                .integer("Quantity must be an integer"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await createCartProduct(values);

                // If the response is not an error object, process it as a successful response
                if (response?.status === 201) {

                    setErrorMessage("");
                    toast.success("Product Added successfully");
                    // setTimeout(() => {
                    //     navigate("retailer/shop");
                    // }, 2000);

                } else if (response == 400) {
                    setErrorMessage("Already added to cart");
                    toast.error("Already added to cart");
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

    // Function to handle increment and decrement
    const handleQuantityChange = (action) => {
        const { quantity } = formik.values;
        const minOrder = productdata.min_order || 1; // Default to 1 if min_order is not provided

        let newQuantity = quantity;

        if (action === "increment") {
            newQuantity += minOrder;
        } else if (action === "decrement" && newQuantity > minOrder) {
            newQuantity -= minOrder;
        }

        formik.setFieldValue("quantity", newQuantity); // Update formik state
    };

    return (
        <>
            <Meta title="Shop" />
            <BreadCrumb title="Shop" />
            <div className="flex items-center justify-center">
                <section className="relative bg-white w-full flex items-center justify-center py-10 px-20">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
                            {/* Image */}
                            <img
                                src={productdata.primary_image}
                                alt={productdata.title}
                                className="w-full h-full object-cover rounded-t-lg cursor-pointer"
                            />
                        </div>
                        {/* Content */}
                        <div className="mt-4">
                            <h2 className="text-lg font-bold mt-1">{productdata.title} / {productdata?.category_id?.name} / {productdata.brand} / {productdata.model}</h2>

                            <div className="mt-2 flex gap-4">
                                <div className="text-amber-500">
                                    <span className="font-semibold">MRP: </span>
                                    <span className="line-through">{productdata.mrp}</span>
                                </div>
                                <div className="text-amber-900">
                                    <span className="font-semibold">RATE: </span>
                                    <span>{productdata.rate}</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="flex gap-4 mt-2">
                                    <h5>Color</h5>
                                    <span className="text-gray-600">{productdata.color}</span>
                                </div>
                            </div>

                            <form onSubmit={formik.handleSubmit} className="mt-4">
                                <input name="product_id" value={formik.values.product_id} type="hidden" />
                                <input name="client_id" value={formik.values.client_id} type="hidden" />

                                <div className="flex gap-4 mb-4">
                                    {productdata.size && productdata.size.split(",").map((size, index) => (
                                        <div key={index} className="flex items-center p-1">
                                            <input
                                                type="radio"
                                                className="hidden" // Hide the default radio button appearance
                                                id={`size-${size}`}
                                                name="size"
                                                value={size}
                                                checked={selectedSize === size}
                                                onChange={handleSizeChange}
                                            />
                                            <label
                                                htmlFor={`size-${size}`}
                                                className={`cursor-pointer px-4 py-2 rounded-full border-2 transition-colors duration-200 
                            ${selectedSize === size ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 text-gray-800 border-gray-300'}`}
                                            >
                                                {size}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/* Display error message for size */}
                                {formik.touched.size && formik.errors.size && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.size}</div>
                                )}

                                {/* Quantity with + and - buttons */}
                                <div className="flex gap-10 items-center mb-4">
                                    <h5>Quantity</h5>
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange("decrement")}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <input
                                        name="quantity"
                                        id="quantity"
                                        type="number"
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-16 text-center bg-gray-100 rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange("increment")}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-center my-6">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-none"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </form>

                            <p className="text-gray-600 mt-1">{productdata.description}</p>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </>
    );
};



export default SingleProduct;
