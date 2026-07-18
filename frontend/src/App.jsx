import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import MealPlannerPage from './pages/MealPlannerPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import CraveAIPage from './pages/CraveAIPage';
import LocationSelectionPage from './pages/LocationSelectionPage';
import RestaurantListingPage from './pages/RestaurantListingPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/locations" element={<LocationSelectionPage />} />
            <Route path="/restaurants/:cityId" element={<RestaurantListingPage />} />
            <Route path="/restaurants/:cityId/:restaurantId" element={<RestaurantMenuPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/meal-planner" element={<MealPlannerPage />} />
            <Route path="/crave-ai" element={<CraveAIPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-confirmation/:orderId"
              element={
                <ProtectedRoute>
                  <OrderConfirmationPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
