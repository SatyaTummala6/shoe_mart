// AddItemCategory.js
import React, { useState, useEffect } from "react";
import supplierServices from '../../features/supplierServices';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userServices from '../../features/userServices';

const { getUsersData } = userServices;

const { createProduct, getItemCatgories, uploadProduct, uploadProducts } = supplierServices;

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [categories, setCategories] = useState([]);
    // const [supplierData, setSupplierData] = useState(null);
    const [supplierId, setSupplierId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSupplierData = async () => {

            const response = await getUsersData('supplier'); // await the async function
            if (response?.status === 200) {
                // setSupplierData(response.data); // Set the retailer data in state

                setSupplierId(response.data._id);
            }

        };

        fetchSupplierData(); // Call the fetch function on component mount
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getItemCatgories();
                if (response) {
                    setCategories(response); // Adjusted to access nested data correctly
                } else {
                    toast.error("Failed to fetch categories.");
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchCategories();
    }, []);


    const formik = useFormik({
        initialValues: {
            title: "",
            category_id: "",
            brand: "",
            model: "",
            group: "",
            color: "",
            size: "",
            customer_size: "",
            mrp: "",
            rate: "",
            offer_rate: "",
            customer_rate: "",
            inventory_purchase_rate: "",
            min_order: "",
            description: "",
            primary_image: "",
            secondary_images: "",

        },
        validationSchema: Yup.object({

            title: Yup.string().required("Title is required"),
            category_id: Yup.string().required("Category is required"),
            brand: Yup.string().required("Brand is required"),
            model: Yup.string().required("Model is required"),
            group: Yup.number()
                .required("Group is required")
                .typeError("Group must be a positive number")
                .positive("Group must be a positive number")
                .integer("Group must be an integer"),
            color: Yup.string().required("Color is required"),
            size: Yup.string().required("Size is required"),
            customer_size: Yup.string().required("Customer Size is required"),
            mrp: Yup.number()
                .required("MRP is required")
                .typeError("MRP must be a positive decimal")
                .positive("MRP must be a positive number"),
            rate: Yup.number()
                .required("Rate is required")
                .typeError("Rate must be a positive decimal")
                .positive("Rate must be a positive number"),
            offer_rate: Yup.number()
                .required("Offer Rate is required")
                .typeError("Offer Rate must be a positive decimal")
                .positive("Offer Rate must be a positive number"),
            customer_rate: Yup.number()
                .required("Customer Rate is required")
                .typeError("Customer Rate must be a positive decimal")
                .positive("Customer Rate must be a positive number"),
            inventory_purchase_rate: Yup.number()
                .required("Inventory Purchase Rate is required")
                .typeError("Inventory Purchase Rate must be a positive decimal")
                .positive("Inventory Purchase Rate must be a positive number"),
            description: Yup.string().required("Description is required"),
            min_order: Yup.number()
            .required("Min Order is required")
            .positive("Inventory Purchase Rate must be a positive number"),
            primary_image: Yup.mixed()
                .required("Primary image is required")
                .test(
                    "fileSize",
                    "File size must be less than 2MB",
                    (file) => file && file.size <= 2 * 1024 * 1024
                )
                .test(
                    "fileFormat",
                    "Unsupported format. Only JPG, JPEG, PNG, and GIF are allowed.",
                    (file) =>
                        file &&
                        ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)
                ),
            secondary_images: Yup.mixed()
                .required("Secondary images are required")
                .test(
                    "fileSize",
                    "Each file must be less than 2MB",
                    (files) =>
                        files &&
                        Array.from(files).every((file) => file.size <= 2 * 1024 * 1024)
                )
                .test(
                    "fileFormat",
                    "Unsupported format. Only JPG, JPEG, PNG, and GIF are allowed.",
                    (files) =>
                        files &&
                        Array.from(files).every((file) =>
                            ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)
                        )
                ),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                let primaryImageUploaded = false;
                let secondaryImagesUploaded = false;
                let secondaryImageURLs = [];
                let primaryImageResult = '';

                // Upload Primary Image if selected
                if (values.primary_image) {
                    const primaryImageFile = values.primary_image;
                    const primaryImageData = new FormData();
                    primaryImageData.append("file", primaryImageFile);

                    primaryImageResult = await uploadProduct(primaryImageData);

                    if (primaryImageResult?.status === 201) {
                        primaryImageUploaded = true;
                    } else {
                        toast.error("Error Uploading Primary Image");
                        return; // Stop the process on failure
                    }
                }

                // Upload Secondary Images if selected
                if (values.secondary_images) {
                    const secondaryImageFiles = values.secondary_images; // Assuming this is an array
                    const secondaryImageData = new FormData();

                    // Append all secondary images
                    Array.from(secondaryImageFiles).forEach((file) => {
                        secondaryImageData.append("files", file);
                    });

                    const secondaryImageResult = await uploadProducts(secondaryImageData);
                    console.log(secondaryImageResult);

                    if (secondaryImageResult?.status === 201) {
                        secondaryImagesUploaded = true;

                        if (secondaryImagesUploaded && secondaryImageResult.data && secondaryImageResult.data.images) {
                            secondaryImageURLs = secondaryImageResult.data.images.map((image) => image.url);
                            console.log(secondaryImageURLs);
                        }
                    } else {
                        toast.error("Error Uploading Secondary Images");
                        return; // Stop the process on failure
                    }
                }

                const productData = {
                    ...values,
                    primary_image: primaryImageUploaded ? primaryImageResult.data.url : "", // Include URL if uploaded, else empty
                    secondary_images: secondaryImagesUploaded ? secondaryImageURLs : [], // Include URLs if uploaded, else empty array
                };

                const response = await createProduct(productData);

                // If the response is not an error object, process it as a successful response
                if (response?.status === 201) {

                    setErrorMessage("");
                    toast.success("Product Created successfully");
                    setTimeout(() => {
                        navigate("/supplier/products");
                    }, 2000);

                } else if (response === 500) {

                    setErrorMessage(response.error);
                    toast.error(response.error);

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
                    <h2 className="text-xl font-semibold">Add Product</h2>
                    <Link to="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Products
                    </Link>
                </div>
                <form onSubmit={formik.handleSubmit} className="mt-8 px-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-200 p-4">
                            <label>Name</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your name"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <small className="text-red-500">{formik.errors.title}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <select
                                id="category_id"
                                name="category_id"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formik.values.category_id} onChange={formik.handleChange}>
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.category_id && formik.errors.category_id && (
                                <small className="text-red-500">{formik.errors.category_id}</small>

                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>Brand</label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your brand"
                                value={formik.values.brand}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.brand && formik.errors.brand && (
                                <small className="text-red-500">{formik.errors.brand}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>Model</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your model"
                                value={formik.values.model}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.model && formik.errors.model && (
                                <small className="text-red-500">{formik.errors.model}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>Item Group</label>
                            <input
                                type="text"
                                id="group"
                                name="group"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter group"
                                value={formik.values.group}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.group && formik.errors.group && (
                                <small className="text-red-500">{formik.errors.group}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>Color</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter color"
                                value={formik.values.color}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.color && formik.errors.color && (
                                <small className="text-red-500">{formik.errors.color}</small>
                            )}
                        </div>


                        <div className="bg-gray-200 p-4">
                            <label>Size</label>
                            <input
                                type="text"
                                id="size"
                                name="size"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your size"
                                value={formik.values.size}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.size && formik.errors.size && (
                                <small className="text-red-500">{formik.errors.size}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>Customer Size</label>
                            <input
                                type="text"
                                id="customer_size"
                                name="customer_size"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your customer size"
                                value={formik.values.customer_size}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.customer_size && formik.errors.customer_size && (
                                <small className="text-red-500">{formik.errors.customer_size}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>MRP</label>
                            <input
                                type="text"
                                id="mrp"
                                name="mrp"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter mrp"
                                value={formik.values.mrp}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.mrp && formik.errors.mrp && (
                                <small className="text-red-500">{formik.errors.mrp}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>Rate</label>
                            <input
                                type="text"
                                id="rate"
                                name="rate"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter rate"
                                value={formik.values.rate}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.rate && formik.errors.rate && (
                                <small className="text-red-500">{formik.errors.rate}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>Offer Rate</label>
                            <input
                                type="text"
                                id="offer_rate"
                                name="offer_rate"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter offer rate"
                                value={formik.values.offer_rate}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.offer_rate && formik.errors.offer_rate && (
                                <small className="text-red-500">{formik.errors.offer_rate}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>Customer Rate</label>
                            <input
                                type="text"
                                id="customer_rate"
                                name="customer_rate"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter customer rate"
                                value={formik.values.customer_rate}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.customer_rate && formik.errors.customer_rate && (
                                <small className="text-red-500">{formik.errors.customer_rate}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>Inventory Purchase Rate</label>
                            <input
                                type="text"
                                id="inventory_purchase_rate"
                                name="inventory_purchase_rate"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter inventory purchase rate"
                                value={formik.values.inventory_purchase_rate}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.inventory_purchase_rate && formik.errors.inventory_purchase_rate && (
                                <small className="text-red-500">{formik.errors.inventory_purchase_rate}</small>
                            )}
                        </div>

                        <input
                            type="hidden"
                            name="is_supplier"
                            value={supplierId}
                        />

                        <div className="bg-gray-200 p-4">
                            <label>Min Order</label>
                            <input
                                type="text"
                                id="min_order"
                                name="min_order"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter minimum order"
                                value={formik.values.min_order}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.min_order && formik.errors.min_order && (
                                <small className="text-red-500">{formik.errors.min_order}</small>
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

                        <div className="bg-gray-200 p-4">
                            <input
                                type="file"
                                id="primary_image"
                                name="primary_image"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                accept=".jpg,.jpeg,.png,.gif"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    formik.setFieldValue("primary_image", file); // Set single file
                                }}
                            />
                            {formik.touched.primary_image && formik.errors.primary_image && (
                                <small className="text-red-500">{formik.errors.primary_image}</small>
                            )}
                        </div>

                        <div className="bg-gray-200 p-4">
                            <label>Secondary Images</label>
                            <input
                                type="file"
                                id="secondary_images"
                                name="secondary_images"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                accept=".jpg,.jpeg,.png,.gif"
                                multiple // Allow multiple file selection
                                onChange={(event) => {
                                    const files = event.currentTarget.files;
                                    formik.setFieldValue("secondary_images", files); // Set array of files
                                }}
                            />
                            {formik.touched.secondary_images && formik.errors.secondary_images && (
                                <small className="text-red-500">{formik.errors.secondary_images}</small>
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

export default AddProduct;
