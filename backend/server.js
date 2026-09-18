import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import User from './models/userModel.js';
import Book from './models/bookModel.js';
import Order from './models/orderModel.js';
import users from './data/users.js';
import books from './data/books.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

// Connect to MongoDB & Auto-seed initial books if database is empty
connectDB().then(async () => {
  try {
    const count = await Book.countDocuments();
    if (count === 0) {
      console.log('🌱 Database is empty. Seeding initial books...');
      const createdUsers = await User.insertMany(users);
      const adminUser = createdUsers[0]._id;
      const sampleBooks = books.map((book) => ({ ...book, user: adminUser }));
      await Book.insertMany(sampleBooks);
      console.log('✅ Initial books seeded successfully!');
    }
  } catch (err) {
    console.warn('Auto-seed check notice:', err.message);
  }
});

const app = express();

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Manual database seed endpoint
app.get('/api/seed', async (req, res) => {
  try {
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleBooks = books.map((book) => ({ ...book, user: adminUser }));
    await Book.insertMany(sampleBooks);

    res.json({ message: 'Books and users imported successfully!', count: sampleBooks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
