const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  const { name, stock, whereToBuy, description } = req.body;  // Ensure the request body includes 'whereToBuy'

  try {
    const newProduct = new Product({ name, stock, whereToBuy, description }); // Save 'whereToBuy' to the new product
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id); // Use Mongoose to find and delete by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // Return error if product not found
    }
    res.status(200).json({ message: 'Product deleted successfully' }); // Return success if product is deleted
  } catch (error) {
    console.error('Error deleting product:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error deleting product' }); // Return error message
  }
});

// Update product details (Edit product)
router.put('/:id', async (req, res) => {
  const { name, stock, whereToBuy, description } = req.body; // Include all fields to be updated

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, stock, whereToBuy, description }, // Update multiple fields
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' }); // Return error if product not found
    }

    res.json(updatedProduct); // Respond with the updated product
  } catch (error) {
    console.error('Error updating product:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating product' }); // Return error message
  }
});


module.exports = router;
