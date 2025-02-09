import axios from "axios";
import { base_url } from "../utils/base_url";
import { useNavigate } from "react-router-dom";


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


const createItemCategory = async (data) => {
    try {
        const response = await axios.post(`${base_url}admin/create-item-category`,data, config()); 
        return response;
    } catch (error) {
        console.log(error);
        return error.status;
    }
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

const getAllOrders = async (id) => {
    try {
        const response = await axios.get(`${base_url}admin/get-all-orders`, config()); 
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const getOrderListItems = async (order_id) => {
    try {
        const response = await axios.get(`${base_url}retailer/get-order-data/${order_id}`, config()); 
        return response;
    } catch (error) {
        console.error(error.message);
    }
};


const updateOrderStatus = async (data) => {
    try {
        const response = await axios.put(`${base_url}admin/update-order-status`,data, config()); 
        return response;
    } catch (error) {
        console.log(error);
        return error.status;
    }
};

const getAllPendingOrders = async (id) => {
    try {
        const response = await axios.get(`${base_url}admin/get-all-pending-orders`, config()); 
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};


const getOrderBalanceItems = async (order_id) => {
    try {
        const response = await axios.get(`${base_url}retailer/get-balance-order-data/${order_id}`, config()); 
        return response;
    } catch (error) {
        console.error(error.message);
    }
};


const updateBalanceOrderStatus = async (data) => {
    try {
        const response = await axios.put(`${base_url}admin/update-balance-order-status`,data, config()); 
        return response;
    } catch (error) {
        console.log(error);
        return error.status;
    }
};


const editOrder = async (data) => {
    try {
        const response = await axios.put(`${base_url}admin/update-order-list`,data, config()); 
        return response;
    } catch (error) {
        console.log(error);
        return error.status;
    }
};


const adminServices = {
    getItemCatgories,
    createItemCategory,
    createProduct,
    uploadProduct,
    uploadProducts,
    getAllOrders,
    getOrderListItems,
    updateOrderStatus,
    editOrder,
    updateBalanceOrderStatus,
    getOrderBalanceItems,
    getAllPendingOrders

}

export default adminServices;