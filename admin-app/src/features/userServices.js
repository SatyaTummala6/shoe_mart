import axios from "axios";
import { base_url } from "../utils/base_url";
import { useNavigate } from "react-router-dom";

const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${base_url}user/register`, userData);
      
        return response;
    } catch (error) {
      
        // Check for 400 status and specific error message
        if (error.response?.status === 400) {
           
            throw new Error(error.response?.data?.message || "User already exists");
        }
        // Generic error for other statuses
        throw new Error("Registration failed");
    }
};

const getCategories = async () => {
    try {
        const response = await axios.get(`${base_url}user/get-categories`);
   
        return response;
    } catch (error) {
        throw new Error("Error fetching categories");
    }
};

// const loginUser = async (credentials, role) => {
//     try {

//         const response = await axios.post(`${base_url}${role}/login`, credentials);
//         console.log(response);
//         // if (response.data.token) {
//         //     localStorage.setItem(`${role}_token`, response.data.token);
//         // }
//     } catch (error) {
//         console.error("Login error:", error.message);
//     }
//   };


const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${base_url}admin/login`, credentials);
      if (response.data.data.token) {
 
        localStorage.setItem('admin_token', JSON.stringify(response.data.data.token));
      }
  
      return response;
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };


  const config = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
        console.warn("No token found, ensure the user is logged in");
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    };
};

const getUsersData = async (role) => {
    try {
        const response = await axios.post(`${base_url}user/get-user-data`, { role }, config());
      
        return response;
    } catch (error) {
        if (error.status === 401 || error.status === 403) {
            localStorage.removeItem(role+"_token");
            window.location.reload(); // Redirect or reload the page
        }else{
         console.error(error.message);
        }
    }
};

const getProducts = async () => {
    try {
        const response = await axios.get(`${base_url}user/get-products`, config()); 
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const getAllProducts = async (role) => {
    try {
        const response = await axios.get(`${base_url}user/get-all-products`, config(role)); 
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const getAProduct = async (role,id) => {
    try {
        const response = await axios.get(`${base_url}user/get-product/${id}`, config(role)); 
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const getSupplierProducts = async (role) => {
    try {
        const response = await axios.get(`${base_url}user/get-supplier-products`, config(role)); 
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const changPassword = async (data) => {
    try {
       
        const data1 = {
            password: data?.password,
            role: data?.role // Add role here
        };
        const response = await axios.put(
            `${base_url}${data?.role}/change-password`, data1
            , config(data?.role));
        return response; // Returning the full response
    } catch (error) {
        console.error(error.message);
        throw error; // You should propagate the error in case the caller needs to handle it
    }
};


const getClientsData = async () => {
    try {
        const response = await axios.get(`${base_url}admin/get-clients`, config()); 
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const getEmployeeData = async () => {
    try {
        const response = await axios.get(`${base_url}admin/get-employees`, config()); 
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

  
  


const useAuthGuard = (role) => {
    const navigate = useNavigate();
    const token = localStorage.getItem(`${role}_token`);

    useEffect(() => {
        if (!token) {
            navigate(`/${role}/login`);
        }
    }, [token, navigate, role]);

    return token;
};



const userServices = {
    registerUser,
    getCategories,
    useAuthGuard,
    loginUser,
    getUsersData,
    getClientsData,
    getEmployeeData,
    changPassword,
    getProducts,
    getAllProducts,
    getSupplierProducts,
    getAProduct
};

export default userServices;
