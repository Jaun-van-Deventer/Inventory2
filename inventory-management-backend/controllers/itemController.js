const Item = require('../models/Item');

const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createItem = async (req, res) => {
    const { name, quantity, price } = req.body;
    const newItem = new Item({ name, quantity, price });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add more functions for update and delete as needed

module.exports = { getItems, createItem };