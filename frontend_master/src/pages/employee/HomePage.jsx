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


const { loginUser } = userServices;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };



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
        const response = await loginUser(values, ROLES.EMPLOYEE);

        if (response?.status == 200) {
          setErrorMessage("");
          toast.success("Login successful");
          navigate("/employee/dashboard");

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
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />
      <div className="flex items-center justify-center mt-0">
        <section className="relative bg-white w-full mt-10 flex items-center justify-center">
          {/* Card Container with Image Background */}
          <div
            className="relative z-10 bg-cover bg-center bg-no-repeat p-16 w-[600px] h-[500px]"
            style={{ backgroundImage: "url('/images/innerpage/login-bg.png')" }}
          >
            <h2 className="text-4xl font-bold dark:text-white text-center mb-6">Employee Login</h2>


            <h4 className="text-center mb-3 text-black">
              Do you have an account?{" "}
              <Link to="/employee/register" className="font-bold text-black">
                Sign up for free
              </Link>
            </h4>

            <form onSubmit={formik.handleSubmit}>
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

            {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error */}

            {/* Additional Links */}
            <div className="text-center mt-4">
              <a href="/employee/forgot-password" className="text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
