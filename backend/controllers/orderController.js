import { Order } from '../models/orderModel.js';
import { Product } from '../models/productModel.js';
import { User } from '../models/userModel.js';

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items } = req.body;

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const address = user.address;

        if(!items || items.length === 0) {
            return res.status(400).json({ message: "Order must contain at least one item" });
        }

        let totalAmount = 0;
        const orderedItems = [];

        for (const item of items) {
            const { productId, quantity } = item;
            if (!productId || !quantity || quantity <= 0) {
                return res.status(400).json({ message: "Each item must have a valid productId and quantity" });
            }

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productId} not found` });
            }

            const price = product.price;
            totalAmount += price * quantity;

            orderedItems.push({
                productId,
                price,
                quantity,
            });
        }

        const newOrder = new Order({
            userId,
            items: orderedItems,
            totalAmount,
            address
        }); 
        await newOrder.save();
        return res.status(201).json({ message: "Order created successfully", orderId: newOrder._id });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId }).sort({createdAt: -1}).populate({path:"items.productId", select: "-isDeleted"})
        if(!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }   
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        if(!orderId || !status) {
            return res.status(400).json({ message: "Order ID and status are required" });
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if(!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        if(!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }
        const order = await Order.findById(orderId);
        if(!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = "Cancelled";
        await order.save();
        return res.status(200).json({ message: "Order cancelled successfully", order });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;

        const startIndex = (page - 1) * limit;
        const total = await Order.countDocuments();
        const orders = await Order.find().sort({createdAt: -1}).populate("items.productId").populate("userId", "name email").skip(startIndex).limit(limit);
        return res.status(200).json({ orders, total });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export {createOrder, getMyOrders, updateOrderStatus, cancelOrder, getAllOrders};