import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userServices from "../../features/userServices";

const { getCategories, registerUser } = userServices;

const SupplierRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                if (response && response.data) {
                    setCategories(response.data); // Adjusted to access nested data correctly
                } else {
                    toast.error("Failed to fetch categories.");
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchCategories();
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            firm_name: "",
            city: "",
            mobile: "",
            password: "",
            category_id: "",
            remarks: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email format").required("Email is required"),
            firm_name: Yup.string().required("Firm Name is required"),
            city: Yup.string().required("City is required"),
            mobile: Yup.string()
                .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
                .required("Mobile is required"),
            category_id: Yup.string().required("Category is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await registerUser(values);
              
                if (response.status == 201) {
                    setErrorMessage("");
                    toast.success("Registration successful");
                    // navigate("/login");
                } else {
                    toast.error("Registration failed. Please try again.");
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <>
            <div className="flex items-center justify-center mt-0">
                <section className="relative bg-white w-full mt-10 flex items-center justify-center">
                    <div
                        className="relative z-10 bg-cover bg-center bg-no-repeat p-16 w-[600px] h-[800px]"
                        style={{ backgroundImage: "url('/images/innerpage/login-bg.png')" }}
                    >
                        <h2 className="text-4xl font-bold dark:text-white text-center mb-6">Register</h2>
                        <h4 className="text-center mb-3 text-black">
                            Already have an account?{" "}
                            <Link to="/" className="font-bold text-black">
                                Login
                            </Link>
                        </h4>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="my-6">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <small className="text-red-500">{formik.errors.name}</small>
                                )}
                            </div>


                            <div className="my-6">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter email" value={formik.values.email} onChange={formik.handleChange}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <small className="text-red-500">{formik.errors.email}</small>
                                )}
                            </div>

                            <div className="my-6">
                                <input
                                    type="text"
                                    id="firm_name"
                                    name="firm_name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your firm name" value={formik.values.firm_name} onChange={formik.handleChange}
                                />
                                {formik.touched.firm_name && formik.errors.firm_name && (
                                    <small className="text-red-500">{formik.errors.firm_name}</small>
                                )}
                            </div>

                            <div className="my-6">
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your city" value={formik.values.city} onChange={formik.handleChange}
                                />
                                {formik.touched.city && formik.errors.city && (
                                    <small className="text-red-500">{formik.errors.city}</small>
                                )}
                            </div>

                            <div className="my-6">
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your mobile number" value={formik.values.mobile} onChange={formik.handleChange}
                                />
                                {formik.touched.mobile && formik.errors.mobile && (
                                    <small className="text-red-500">{formik.errors.mobile}</small>
                                )}
                            </div>

                            <div className="my-6">
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

                            <div className="my-6">
                                <input
                                    type="text"
                                    id="remarks"
                                    name="remarks"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter remarks" value={formik.values.remarks} onChange={formik.handleChange}
                                />
                            </div>

                            <div className="my-6 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                <span
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </span>
                                {formik.touched.password && formik.errors.password && (
                                    <small className="text-red-500">{formik.errors.password}</small>
                                )}
                            </div>

                            <div className="text-center my-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full px-4 py-2 ${loading ? "bg-gray-400" : "bg-black"
                                        } text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-none`}
                                >
                                    {loading ? "Processing..." : "Register"}
                                </button>
                            </div>
                        </form>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error */}

                    </div>
                </section>
            </div>
            <ToastContainer />
        </>
    );
};

export default SupplierRegister;