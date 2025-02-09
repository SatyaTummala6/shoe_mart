import axios from "axios";
import { base_url } from "../utils/base_url";

const config = () => {
    const token = localStorage.getItem('retailer_token');
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

const createCartProduct = async (data) => {
    try {
        const response = await axios.post(`${base_url}retailer/add-to-cart`,data, config()); 

        return response;
    } catch (error) {
        console.log(error);
        return error.status;
    }
};

const createPlaceOrder= async (data) => {
    try {
        const response = await axios.post(`${base_url}retailer/place-order`,data, config()); 
        return response;
    } catch (error) {
        console.log(error);
        return error.status;
    }
};

const getRetailerOrders = async (id) => {
    try {
        const response = await axios.get(`${base_url}retailer/get-orders/${id}`, config()); 
        return response;
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

const getCartItems = async (id) => {
    try {
        const response = await axios.get(`${base_url}retailer/get-cart/${id}`, config()); 
        return response;
    } catch (error) {
        console.error(error.message);
    }
};

const retailerServices = {
    createCartProduct,
    getCartItems,
    createPlaceOrder,
    getRetailerOrders,
    getOrderListItems
}

export default retailerServices;