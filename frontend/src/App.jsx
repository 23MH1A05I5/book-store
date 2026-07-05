import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import RouteGuard from './components/RouteGuard';

// Pages
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';

// Admin Pages
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminBookListPage from './pages/AdminBookListPage';
import AdminBookEditPage from './pages/AdminBookEditPage';
import AdminUserListPage from './pages/AdminUserListPage';
import AdminOrderListPage from './pages/AdminOrderListPage';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="d-flex flex-column min-vh-100">
                <Header />
                <main className="flex-grow-1">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/books" element={<HomePage />} />
                    <Route path="/books/search/:keyword" element={<HomePage />} />
                    <Route path="/books/page/:pageNumber" element={<HomePage />} />
                    <Route path="/book/:id" element={<DetailsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected User Routes */}
                    <Route
                      path="/shipping"
                      element={
                        <RouteGuard>
                          <ShippingPage />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/payment"
                      element={
                        <RouteGuard>
                          <PaymentPage />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/placeorder"
                      element={
                        <RouteGuard>
                          <PlaceOrderPage />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/order/:id"
                      element={
                        <RouteGuard>
                          <OrderPage />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <RouteGuard>
                          <ProfilePage />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/wishlist"
                      element={
                        <RouteGuard>
                          <WishlistPage />
                        </RouteGuard>
                      }
                    />

                    {/* Admin Routes */}
                    <Route
                      path="/admin/dashboard"
                      element={
                        <RouteGuard adminOnly>
                          <AdminDashboardPage />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/admin/books"
                      element={
                        <RouteGuard adminOnly>
                          <AdminBookListPage />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/admin/book/:id/edit"
                      element={
                        <RouteGuard adminOnly>
                          <AdminBookEditPage />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/admin/users"
                      element={
                        <RouteGuard adminOnly>
                          <AdminUserListPage />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/admin/orders"
                      element={
                        <RouteGuard adminOnly>
                          <AdminOrderListPage />
                        </RouteGuard>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
