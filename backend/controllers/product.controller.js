import mongoose from "mongoose";
import Product from '../models/product.model.js';

export const getProduct = async (req,res) => {
    try {
        const products =await Product.find({});
        res.status(200).json({success:true,data:products})
    } catch (error) {
        console.log("Error in fetching the products: ",error.message);
        res.status(500).json({success:false,message: "Server Error"})
    }
}

export const createProduct = async (req,res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({
            success:false,message: "Please provide all fields"
        })
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        return res.status(201).json({success:true,data: newProduct})
    } catch (error) {
        console.error("Error in create Product : ",error.message)
        res.status(500).json({
            success:false,message: "server Error"
        })
    }
}

export const deleteProduct = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Product not found"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message: "Product deleted"});
    } catch (error) {
        console.log("Error in deleting product : ",error.message);
        res.status(500).json({success: false,message: "Server Error"});
    }
}

export const updateProduct = async (req,res) => { //patch to update a product and put to update all the data
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Product not found"});
    }

    const product = req.body;
    try {
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({success:true,data: updatedProduct});
    } catch (error) {
        res.status(500).json({success:false,message:"Server error"})
    }
}