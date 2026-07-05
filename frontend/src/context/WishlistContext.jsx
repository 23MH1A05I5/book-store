import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { userInfo } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist when user logs in
  useEffect(() => {
    if (userInfo?.token) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [userInfo]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/users/wishlist');
      setWishlist(data);
    } catch (err) {
      console.error('Wishlist fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (bookId) => {
    try {
      const { data } = await axios.post(`/api/users/wishlist/${bookId}`);
      // Re-fetch to get full book objects
      await fetchWishlist();
      return data.message;
    } catch (err) {
      console.error('Wishlist toggle error:', err.message);
    }
  };

  const isInWishlist = (bookId) => {
    return wishlist.some((book) => book._id === bookId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, toggleWishlist, isInWishlist, fetchWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
