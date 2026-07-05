import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import books from './data/books.js';
import User from './models/userModel.js';
import Book from './models/bookModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear all existing documents
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    // Insert users and retrieve them
    const createdUsers = await User.insertMany(users);

    // Get the first user (which is the Admin in users.js)
    const adminUser = createdUsers[0]._id;

    // Attach admin user to each book
    const sampleBooks = books.map((book) => {
      return { ...book, user: adminUser };
    });

    // Insert books
    await Book.insertMany(sampleBooks);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error during import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error during destroy: ${error.message}`);
    process.exit(1);
  }
};

// Check CLI arguments to run import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
