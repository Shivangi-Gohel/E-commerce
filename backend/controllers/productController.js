import { Product } from "../models/productModel.js";

const addProduct = async(req, res) => {
    try {
        console.log(req.files);
        const { name, description, price, category, stock } = req.body;

        if (!name || !price || !category || !stock) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }
        if(!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one product image is required" });
        }

        const images = req.files.map(file => file.path);

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            images
        });
        await newProduct.save();

        return res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

const updateProduct = async(req, res) => {
    try {
        const { productId, name, description, price, category, stock, images } = req.body;
        
        if(!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const product = await Product.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            category,
            stock,
            images
        }, { new: true });

        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.save();

        return res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

const deleteProduct = async(req, res) => {
    try {
        const { productId } = req.body;

        if(!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }
        const product = await Product.findById(productId);

        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isDeleted = true;
        await product.save();
        
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

const getProductById = async(req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);

        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ product });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}


export { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById };