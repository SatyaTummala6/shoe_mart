import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import userServices from "../../features/userServices";
import { ROLES } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { changPassword } = userServices;

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleCPasswordVisibility = () => {
    setShowCPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await changPassword({ password: values.password, role: ROLES.SUPPLIER });

        if (response?.status === 200) {
          setErrorMessage("");
          toast.success("Password Reset successful");

          setTimeout(() => {

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

      <div
        className="ml-[190px] mt-14 p-4 bg-white min-h-screen flex items-center justify-center"
      >
        <section className="bg-gray-200 shadow-md rounded-lg p-4 w-full max-w-xl">


          <form onSubmit={formik.handleSubmit}>
            <div className="my-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={formik.values.password}  // Corrected here to use email
                onChange={formik.handleChange}
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

            {/* Password Field */}
            <div className="my-6 relative">
              <input
                type={showCPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm password"
                value={formik.values.confirmPassword}  // Corrected here to use email
                onChange={formik.handleChange}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <small className="text-red-500">{formik.errors.confirmPassword}</small>
              )}
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleCPasswordVisibility}
              >
                <i className={`fa ${showCPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>

            {/* Submit Button */}
            <div className="text-center my-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-black text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-none"
              >
                Update Password
              </button>
            </div>
          </form>

        </section>
      </div>

      <ToastContainer />
    </>
  );
};

export default ChangePassword;
