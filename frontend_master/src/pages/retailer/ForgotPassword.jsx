import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../../components/retailer/Meta";
import BreadCrumb from "../../components/retailer/Breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import userServices from "../../features/userServices";
import { ROLES } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { forgotPassword } = userServices;

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "", // Ensure the initial value is for email
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email format").required("Email is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await forgotPassword(values, ROLES.RETAILER);

                if (response?.status === 200) {
                    setErrorMessage("");
                    toast.success("Reset link sent successfully");

                    setTimeout(() => {
                        navigate("/retailer/");
                        window.location.reload();
                    }, 2000);
                } else {
                    setErrorMessage("Invalid Data");
                    toast.error("Please try again.");
                }
            } catch (error) {
                setErrorMessage(error.message);
                toast.error(error.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <>
            <Meta title="Forgot Password" />
            <BreadCrumb title="Forgot Password" />
            <div className="flex items-center justify-center mt-0">
                <section className="relative bg-white w-full mt-10 flex items-center justify-center">
                    {/* Card Container with Image Background */}
                    <div
                        className="relative z-10 bg-cover bg-center bg-no-repeat p-16 w-[600px] h-[500px]"
                        style={{ backgroundImage: "url('/images/innerpage/login-bg.png')" }}
                    >
                        <h2 className="text-4xl font-bold dark:text-white text-center mb-6">Forgot Password</h2>

                        <h4 className="text-blue mb-3">
                            A reset link will be shared to your email which expires in 10 mins
                        </h4>

                        <form onSubmit={formik.handleSubmit}>
                            {/* Email Field */}
                            <div className="my-6">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your email"
                                    value={formik.values.email}  // Corrected here to use email
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <small className="text-red-500">{formik.errors.email}</small>
                                )}
                            </div>

                            <div className="text-center my-6">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-black text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-none"
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                        {/* Additional Links */}
                        <div className="text-center mt-4">
                            <Link to="/retailer/" className="font-bold text-black">
                                Login
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </>
    );
};

export default ForgotPassword;
