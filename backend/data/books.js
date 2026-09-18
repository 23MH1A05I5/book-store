const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publisher: 'Scribner',
    isbn: '978-0-7432-7356-5',
    genre: 'Classic Fiction',
    description:
      'Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan. A story of decadence, idealism, resistance to change, social upheaval, and excess.',
    price: 12.99,
    countInStock: 50,
    rating: 4.5,
    numReviews: 128,
    image:
      'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    isFeatured: true,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publisher: 'J. B. Lippincott & Co.',
    isbn: '978-0-06-112008-4',
    genre: 'Classic Fiction',
    description:
      'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice. It views its characters and events through the eyes of Scout Finch, a precocious girl whose father is a defense attorney in a case involving a Black man wrongly accused of raping a white woman.',
    price: 10.99,
    countInStock: 40,
    rating: 4.8,
    numReviews: 215,
    image:
      'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
    isFeatured: true,
  },
  {
    title: '1984',
    author: 'George Orwell',
    publisher: 'Secker & Warburg',
    isbn: '978-0-452-28423-4',
    genre: 'Dystopian Fiction',
    description:
      'Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic vision becomes more real. A startling and haunting vision of the world, so powerful that it is completely convincing from start to finish.',
    price: 11.99,
    countInStock: 60,
    rating: 4.7,
    numReviews: 340,
    image:
      'https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg',
    isFeatured: true,
  },
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    publisher: 'Bloomsbury',
    isbn: '978-0-7475-3269-9',
    genre: 'Fantasy',
    description:
      'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle.',
    price: 14.99,
    countInStock: 80,
    rating: 4.9,
    numReviews: 520,
    image:
      'https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg',
    isFeatured: true,
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    publisher: 'HarperCollins',
    isbn: '978-0-06-231609-7',
    genre: 'Philosophy',
    description:
      'Paulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different — and far more satisfying — than he ever imagined.',
    price: 13.49,
    countInStock: 45,
    rating: 4.6,
    numReviews: 280,
    image:
      'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
    isFeatured: true,
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    publisher: 'Harper',
    isbn: '978-0-06-231609-7',
    genre: 'Non-Fiction',
    description:
      'From a renowned historian comes a groundbreaking narrative of humanity\'s creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us.',
    price: 18.99,
    countInStock: 35,
    rating: 4.7,
    numReviews: 195,
    image:
      'https://covers.openlibrary.org/b/isbn/9780099590088-L.jpg',
    isFeatured: false,
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    publisher: 'George Allen & Unwin',
    isbn: '978-0-547-92822-7',
    genre: 'Fantasy',
    description:
      'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely travelling any further than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure.',
    price: 15.99,
    countInStock: 55,
    rating: 4.8,
    numReviews: 310,
    image:
      'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
    isFeatured: false,
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    publisher: 'Avery',
    isbn: '978-0-7352-1129-2',
    genre: 'Self-Help',
    description:
      'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones.',
    price: 16.99,
    countInStock: 70,
    rating: 4.8,
    numReviews: 420,
    image:
      'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    isFeatured: true,
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    publisher: 'Chilton Books',
    isbn: '978-0-441-17271-9',
    genre: 'Science Fiction',
    description:
      'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness.',
    price: 17.49,
    countInStock: 30,
    rating: 4.7,
    numReviews: 255,
    image:
      'https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg',
    isFeatured: false,
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publisher: 'Little, Brown and Company',
    isbn: '978-0-316-76948-0',
    genre: 'Classic Fiction',
    description:
      'The novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school. A coming of age story that captures the spirit of teenage rebellion and alienation.',
    price: 9.99,
    countInStock: 25,
    rating: 4.1,
    numReviews: 178,
    image:
      'https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg',
    isFeatured: false,
  },
  {
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    publisher: 'New World Library',
    isbn: '978-1-57731-152-2',
    genre: 'Self-Help',
    description:
      'The author shows that our \'normal\' state of mind is characterized by compulsive thinking. This unobserved mind runs our life. But if we can step out of the mind and make it our servant rather than our master, we discover our true identity.',
    price: 14.49,
    countInStock: 40,
    rating: 4.5,
    numReviews: 165,
    image:
      'https://covers.openlibrary.org/b/isbn/9781577311522-L.jpg',
    isFeatured: false,
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publisher: 'T. Egerton',
    isbn: '978-0-14-143951-8',
    genre: 'Romance',
    description:
      'Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. The story of the Bennet family and Elizabeth\'s relationship with the proud Mr. Darcy is a timeless tale of love and social manners.',
    price: 8.99,
    countInStock: 60,
    rating: 4.7,
    numReviews: 290,
    image:
      'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
    isFeatured: false,
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    publisher: 'Farrar, Straus and Giroux',
    isbn: '978-0-374-27563-1',
    genre: 'Psychology',
    description:
      'In the international bestseller, Thinking, Fast and Slow, Daniel Kahneman, the renowned psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
    price: 17.99,
    countInStock: 28,
    rating: 4.6,
    numReviews: 210,
    image:
      'https://covers.openlibrary.org/b/isbn/9780374275631-L.jpg',
    isFeatured: false,
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    publisher: 'Allen & Unwin',
    isbn: '978-0-544-00341-5',
    genre: 'Fantasy',
    description:
      'An epic high-fantasy novel that follows the hobbit Frodo Baggins and the Fellowship of the Ring, as they journey to destroy the One Ring, and thus ensure the destruction of the Dark Lord Sauron.',
    price: 22.99,
    countInStock: 42,
    rating: 4.9,
    numReviews: 488,
    image:
      'https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg',
    isFeatured: true,
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    publisher: 'Chatto & Windus',
    isbn: '978-0-06-085052-4',
    genre: 'Dystopian Fiction',
    description:
      'Huxley\'s most famous novel depicts a dystopian future in which humanity is carefree, healthy and technologically advanced. Warfare and poverty have been eliminated and everyone is permanently happy. The price to be paid, however, is individuality and freedom.',
    price: 11.49,
    countInStock: 33,
    rating: 4.4,
    numReviews: 142,
    image:
      'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg',
    isFeatured: false,
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    publisher: 'Warner Books',
    isbn: '978-1-61218-011-7',
    genre: 'Finance',
    description:
      'Rich Dad Poor Dad is Robert\'s story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing.',
    price: 13.99,
    countInStock: 65,
    rating: 4.5,
    numReviews: 380,
    image:
      'https://covers.openlibrary.org/b/isbn/9781612180113-L.jpg',
    isFeatured: false,
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    publisher: 'HarperOne',
    isbn: '978-0-06-245771-7',
    genre: 'Self-Help',
    description:
      'In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be "positive" all the time so that we can truly become better, happier people.',
    price: 15.49,
    countInStock: 50,
    rating: 4.4,
    numReviews: 330,
    image:
      'https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg',
    isFeatured: false,
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    publisher: 'Doubleday',
    isbn: '978-0-385-50420-5',
    genre: 'Thriller',
    description:
      'An astonishing tale of a murder inside the Louvre and clues hidden in works by Leonardo da Vinci lead to the discovery of a religious mystery protected by a secret society for two thousand years.',
    price: 14.99,
    countInStock: 38,
    rating: 4.2,
    numReviews: 265,
    image:
      'https://covers.openlibrary.org/b/isbn/9780385504201-L.jpg',
    isFeatured: false,
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    publisher: 'Random House',
    isbn: '978-0-399-59050-4',
    genre: 'Memoir',
    description:
      'A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University. An account of the struggle for self-invention.',
    price: 16.49,
    countInStock: 22,
    rating: 4.7,
    numReviews: 185,
    image:
      'https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg',
    isFeatured: false,
  },
  {
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    publisher: 'Crown Publishers',
    isbn: '978-0-307-58836-4',
    genre: 'Thriller',
    description:
      'On a warm summer morning in North Carthage, Missouri, it is Nick and Amy Dunne\'s fifth wedding anniversary. Presents are being wrapped and reservations are being made when Nick\'s clever and beautiful wife disappears.',
    price: 12.49,
    countInStock: 44,
    rating: 4.3,
    numReviews: 220,
    image:
      'https://covers.openlibrary.org/b/isbn/9780307588364-L.jpg',
    isFeatured: false,
  },
];

export default books;
