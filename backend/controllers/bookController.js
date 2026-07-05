import Book from '../models/bookModel.js';

// @desc    Fetch all books (with search & filters)
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: 'i' } },
            { author: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};

    const genre = req.query.genre ? { genre: req.query.genre } : {};
    const author = req.query.author
      ? { author: { $regex: req.query.author, $options: 'i' } }
      : {};

    let priceFilter = {};
    if (req.query.minPrice || req.query.maxPrice) {
      priceFilter.price = {};
      if (req.query.minPrice) {
        priceFilter.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        priceFilter.price.$lte = Number(req.query.maxPrice);
      }
    }

    const ratingFilter = req.query.rating
      ? { rating: { $gte: Number(req.query.rating) } }
      : {};

    const query = {
      ...keyword,
      ...genre,
      ...author,
      ...priceFilter,
      ...ratingFilter,
    };

    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      await Book.deleteOne({ _id: book._id });
      res.json({ message: 'Book removed' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
  try {
    const book = new Book({
      title: 'Sample Title',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      author: 'Sample Author',
      genre: 'Sample Genre',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample Description',
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
  const { title, price, description, image, author, genre, countInStock } =
    req.body;

  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = title || book.title;
      book.price = price !== undefined ? price : book.price;
      book.description = description || book.description;
      book.image = image || book.image;
      book.author = author || book.author;
      book.genre = genre || book.genre;
      book.countInStock =
        countInStock !== undefined ? countInStock : book.countInStock;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/books/:id/reviews
// @access  Private
const createBookReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      const alreadyReviewed = book.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Book already reviewed' });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      book.reviews.push(review);

      book.numReviews = book.reviews.length;

      book.rating =
        book.reviews.reduce((acc, item) => item.rating + acc, 0) /
        book.reviews.length;

      await book.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
};
