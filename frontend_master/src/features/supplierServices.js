import axios from "axios";
import { base_url } from "../utils/base_url";

const config = () => {
    const token = localStorage.getItem('supplier_token');
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

const uploadProduct = async (primaryImageData) => {
    try {
      const response = await axios.put(`${base_url}admin/upload-product`, primaryImageData, config());
      return response;
    } catch (error) {
      console.error("Single Upload Error:", error);
      return { status: error.response?.status || 500 };
    }
  };
  
  const uploadProducts = async (data) => {
    try {
      const response = await axios.put(`${base_url}admin/upload-products`, data, config());
      return response;
    } catch (error) {
      console.error("Multiple Upload Error:", error);
      return { status: error.response?.status || 500 };
    }
  };

const createProduct = async (data) => {
    try {
        const response = await axios.post(`${base_url}admin/create-product`,data, config()); 
        return response;
    } catch (error) {
        console.log(error);
        return error.status;
    }
};

const getItemCatgories = async () => {
    try {
        const response = await axios.get(`${base_url}admin/get-item-categories`, config()); 
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};


const supplierServices = {
    getItemCatgories,
    createProduct,
    uploadProduct,
    uploadProducts
}

export default supplierServices;