import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import products from '../data/products.js';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

// Function to import data
const importData = async () => {
  try {
    // Clear out existing data first to prevent duplicates
    await Product.deleteMany();

    // Insert the array of products into the Product collection
    await Product.insertMany(products);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    // Clear out all data
    await Product.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check for command line arguments to decide which function to run
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
