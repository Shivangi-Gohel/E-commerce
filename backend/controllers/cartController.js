import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        if(!userId || !productId || !quantity) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        let cart = await Cart.findOne({ userId });

        if(!cart) {
            cart = new Cart({ userId, items: [], totalAmount: 0 });
        }

        const product = await Product.findById(productId);
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if(itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        cart.totalAmount += quantity * product.price;
        await cart.save();
        return res.status(200).json({ message: "Product added to cart successfully", cart });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getCartById = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if(!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json({ cart });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        let cart = await Cart.findOne({ userId });

        if(!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if(itemIndex > -1) {
            const product = await Product.findById(productId);
            cart.totalAmount -= cart.items[itemIndex].quantity * product.price;
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.status(200).json({ message: "Product removed from cart successfully", cart });
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { addToCart, getCartById, removeFromCart };