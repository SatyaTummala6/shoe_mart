const Cart = require("../models/cartModel");
const OrderList = require("../models/orderListModel");
const Orders = require("../models/ordersModel");


createOrder = async (req, res) => {
    const { client_id, cart_items, total_quantity, total_price } = req.body;

    try {
        // Step 1: Create a new order
        const orderData = {
            client_id: client_id,
            requested_total_quantity: total_quantity,
            requested_grand_total: total_price,
        };
        const order = await Orders.create(orderData);

        // Step 2: Create order list entries
        const orderListData = cart_items.map(item => ({
            order_id: order._id,
            product_id: item.product_id,
            size: item.size,
            requested_quantity: item.quantity,
            requested_total: item.price * item.quantity,
            price: item.price,
        }));

        await OrderList.insertMany(orderListData);

        await Cart.deleteMany({ client_id: client_id });

        // Step 3: Respond with success
        res.status(201).json({ message: 'Order created successfully!' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order', error });
    }
};

const updateListOrder = async (req, res) => {
    try {
        const { order_id, cart_items, total_quantity, total_price } = req.body;

        // Fetch existing order data
        const oldData = await OrderList.find({ order_id: order_id });

        // Create a map of old order data using order_list_id to find the previous values
        const oldDataMap = oldData.reduce((acc, item) => {
            acc[item._id] = {
                oldRequestedQuantity: item.requested_quantity,
                oldRequestedTotal: item.requested_total,
            };
            return acc;
        }, {});

        // Step 1: Prepare data for the `Orders` collection update
        const oldTotalQty = oldData.reduce((sum, item) => sum + Number(item.requested_quantity), 0);
        const oldTotalAmount = oldData.reduce(
            (sum, item) => sum + Number(item.price * item.requested_quantity),
            0
        );

        const balance_total_quantity = oldTotalQty > total_quantity ? oldTotalQty - total_quantity : 0;
        const balance_grand_total = total_price > oldTotalAmount ? total_price - oldTotalAmount : oldTotalAmount - total_price;

        const orderData = {
            accepted_total_quantity: total_quantity,
            balance_total_quantity: balance_total_quantity,
            accepted_grand_total: total_price,
            balance_grand_total: balance_grand_total,
            is_balance_exits: balance_total_quantity > 0,
        };

        // Step 2: Prepare data for the `OrderList` entries, adjusting balance quantities and totals
        const orderListData = cart_items.map(item => {
            const oldItem = oldDataMap[item.order_list_id] || {};

            const newAcceptedQuantity = item.quantity;
            const oldRequestedQuantity = oldItem.oldRequestedQuantity || 0;

            // Balance quantity: absolute difference between old and new quantities
            const balanceQuantity = Math.abs(oldRequestedQuantity - newAcceptedQuantity);

            const newAcceptedTotal = item.price * newAcceptedQuantity;
            const oldRequestedTotal = oldItem.oldRequestedTotal || 0;

            // Balance total: absolute difference between old and new totals
            const balanceTotal = Math.abs(oldRequestedTotal - newAcceptedTotal);

            return {
                _id: item.order_list_id, // Ensure _id is included for correct update
                accepted_quantity: newAcceptedQuantity,
                balance_quantity: balanceQuantity, // Absolute difference from old quantity
                accepted_total: newAcceptedTotal,
                balance_total: balanceTotal, // Absolute difference from old total
            };
        });

        // Update the Orders collection
        const updatedOrder = await Orders.updateOne({ _id: order_id }, { $set: orderData });

        if (updatedOrder.modifiedCount === 0) {
            return res.status(400).json({ message: "Order not updated. Please check the order ID." });
        }

        // Step 3: Update OrderList entries (upsert if necessary)
        const updatePromises = orderListData.map(item =>
            OrderList.updateOne(
                { _id: item._id }, // Update based on _id
                { $set: item }, // Update fields
                { upsert: true } // If the entry does not exist, create a new one
            )
        );

        // Await the results of all updates
        await Promise.all(updatePromises);

        // Send success response
        res.status(200).json({ message: "Order and order list updated successfully." });

    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Error updating order", error: error.message });
    }
};



const getOrders = async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch all orders along with their associated order list entries
        const orders = await Orders.find({ client_id: id });

        res.status(200).json(orders); // Send the orders with populated data as JSON response
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


const updateStatusOrder = async (req, res) => {
    console.log(req.body);
    const { id, status } = req.body;

    try {
        // Validate input
        if (!id || !status) {
            return res.status(400).json({ message: "Order ID and status are required" });
        }

        const updatedOrder = await Orders.updateOne(
            { _id: id }, // Find the order by ID
            { $set: { status } } // Update the status
        );

        if (updatedOrder[0] === 0) {
            return res.status(404).json({ message: "Order not found" });
        }


        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        console.error("Error updating order:", error);

    }
}

const getOrderItems = async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch all orders along with their associated order list entries
        const orders = await OrderList.find({ order_id: id }).populate("product_id");

        res.status(200).json(orders); // Send the orders with populated data as JSON response
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getAllOrderDetails = async (req, res) => {
    try {
        // Fetch all orders along with their associated order list entries
        const orders = await Orders.find().populate('client_id');

        res.status(200).json(orders); // Send the orders with populated data as JSON response
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


const updateBalanceStatusOrder = async (req, res) => {
    console.log(req.body);
    const { id, balance_status } = req.body;

    try {
        // Validate input
        if (!id || !balance_status) {
            return res.status(400).json({ message: "Order ID and status are required" });
        }

        const updatedOrder = await Orders.updateOne(
            { _id: id }, // Find the order by ID
            { $set: { balance_status : balance_status } } // Update the status
        );

        if (updatedOrder[0] === 0) {
            return res.status(404).json({ message: "Order not found" });
        }


        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        console.error("Error updating order:", error);

    }
}



const getBalanceOrderDetails = async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch all orders along with their associated order list entries
        const orders = await OrderList.find({ order_id: id }).populate("product_id");

        res.status(200).json(orders); // Send the orders with populated data as JSON response
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getAllBalanceOrderDetails = async (req, res) => {

    try {
        // Fetch all orders along with their associated order list entries
        const orders = await Orders.find({
            is_balance_exists: true
        });


        res.status(200).json(orders); // Send the orders with populated data as JSON response
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};




module.exports = { getAllBalanceOrderDetails, updateBalanceStatusOrder, getBalanceOrderDetails, createOrder, getOrders, getOrderItems, getAllOrderDetails, updateStatusOrder, updateListOrder }
