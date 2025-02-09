import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROLES } from "../utils/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userServices from "../features/userServices";
const { loginUser } = userServices;

const HomePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {

      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({

      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
        .required("Mobile is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await loginUser(values, ROLES.ADMIN);

        if (response?.status == 200) {
          setErrorMessage("");
          toast.success("Login successful");
          navigate("/dashboard");
          window.location.reload();
        } else {
          setErrorMessage("Invalid Data");
          toast.error("Login failed. Please try again.");
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
    <div className="grid grid-cols-2 divide-x">
      <div>
        <img
          src="/images/login-images/login-cover.svg"
          style={{
            backgroundColor: "#4949d1",
            height: "100vh",
            width: "100%", // Make the image responsive
            objectFit: "cover", // Ensure the image covers the area properly
          }}
          alt="Login Cover"
        />
      </div>

      <div className="flex flex-col items-center bg-gray-200 min-h-screen">
        <div className="mt-20 w-full max-w-md">
          <div className="flex flex-col items-center">
            <img
              src="/images/logo.jpg"
              alt="Login Cover"
              className="mb-4"
            />
            <h4 className="text-center text-black font-bold text-lg">
              VENKATA PREMIER SHOE MART
            </h4>
            <h5 className="text-center text-black text-base mt-2">
              Please log in to your account
            </h5>
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-8 px-4">
            {/* Username Field */}
            <div className="my-6">

              <input
                type="text"
                id="mobile"
                name="mobile"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <small className="text-red-500">{formik.errors.mobile}</small>
              )}
            </div>

            {/* Password Field */}
            <div className="my-6 relative">

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password" onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <small className="text-red-500">{formik.errors.password}</small>
              )}
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>

            {/* Submit Button */}
            <div className="text-center my-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-black text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
