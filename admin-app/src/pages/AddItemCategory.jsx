// AddItemCategory.js
import React, { useState } from "react";
import adminServices from '../features/adminServices';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { createItemCategory } = adminServices;

const AddItemCategory = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                // Call the createItemCategory function
                const response = await createItemCategory(values);
        
                // If the response is not an error object, process it as a successful response
                if (response?.status === 201) {
                    setErrorMessage("");
                    toast.success("Category Created successfully");
                    navigate("/item-categories");
                } else if (response === 500) {
                  
                        const duplicateKeyErrorMessage = `Category with name already exists.`;
                        setErrorMessage(duplicateKeyErrorMessage);
                        toast.error(duplicateKeyErrorMessage);
        
                    
                } else {
                    setErrorMessage("Unexpected response status");
                    toast.error("Unexpected response status");
                }
            } catch (error) {
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
        <div className="ml-[200px] mt-14 p-4 bg-white min-h-full flex items-center justify-center">
            <section className="bg-gray-200 shadow-md rounded-lg p-4 w-full min-h-full min-w-fit">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Add Item Category</h2>
                    <Link to="/item-categories" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Item Categories
                    </Link>
                </div>
                <form onSubmit={formik.handleSubmit} className="mt-8 px-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-200 p-4">
                            <label>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <small className="text-red-500">{formik.errors.name}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <small className="text-red-500">{formik.errors.description}</small>
                            )}
                        </div>
                    </div>

                    <div className="text-center my-6">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-none"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </section>
            <ToastContainer />
        </div>
    );
};

export default AddItemCategory;
