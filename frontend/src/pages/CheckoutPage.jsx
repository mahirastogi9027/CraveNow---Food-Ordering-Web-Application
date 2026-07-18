import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currency';

const ORDERS_KEY = 'cravenow-orders';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalItems, subtotal, deliveryFee, taxes, discount, grandTotal, clearCart } = useCart();
  const [success, setSuccess] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    phone: user?.phone || '',
    address: '',
    paymentMethod: 'cod',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsPlacing(true);
    try {
      // Generate unique order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Calculate estimated delivery time (25-35 minutes from now)
      const deliveryMinutes = Math.floor(Math.random() * 11) + 25;
      const deliveryTime = new Date(Date.now() + deliveryMinutes * 60000);

      // Create order object
      const order = {
        id: orderId,
        userId: user?.id,
        customerDetails: {
          name: formData.name,
          phone: formData.phone,
          email: user?.email,
          address: formData.address,
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          restaurant: item.restaurant,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        paymentMethod: formData.paymentMethod,
        pricing: {
          subtotal,
          deliveryFee,
          taxes,
          discount,
          grandTotal,
        },
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        estimatedDelivery: deliveryTime.toISOString(),
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      const updatedOrders = [order, ...existingOrders];
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));

      // Clear cart
      clearCart();

      // Navigate to order confirmation
      navigate(`/order-confirmation/${orderId}`, { replace: true });
    } catch (error) {
      console.error('Error placing order:', error);
      setSuccess('Failed to place order. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-canvas">
        <Navbar forceLight />
        <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">// Checkout</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink">Your cart is empty</h1>
          <p className="mt-3 text-muted">Add items to your cart before proceeding to checkout.</p>
          <Link
            to="/menu"
            className="mt-8 rounded-xl bg-brand px-8 py-3.5 text-sm font-medium text-white transition hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)]"
          >
            Browse Menu
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar forceLight />

      <section className="relative overflow-hidden bg-void pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-brand/20 blur-[100px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="animate-fade-up font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            // Secure Checkout
          </span>
          <h1 className="animate-fade-up-d1 mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Checkout
          </h1>
          <p className="animate-fade-up-d2 mt-4 text-[15px] text-white/60">
            Signed in as <span className="text-white">{user?.email}</span>
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {success && (
          <div className="animate-fade-up mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status">
            {success}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
              <h2 className="font-display text-xl font-bold text-ink">Delivery Details</h2>
              <form className="mt-5 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/20 ${
                      errors.name ? 'border-red-300 focus:border-red-500' : 'border-black/[0.08] focus:border-brand'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/20 ${
                      errors.phone ? 'border-red-300 focus:border-red-500' : 'border-black/[0.08] focus:border-brand'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-ink">
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete delivery address"
                    rows={3}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none ${
                      errors.address ? 'border-red-300 focus:border-red-500' : 'border-black/[0.08] focus:border-brand'
                    }`}
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                </div>
              </form>
            </section>

            <section className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
              <h2 className="font-display text-xl font-bold text-ink">Payment Method</h2>
              <div className="mt-5 space-y-3">
                <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                  formData.paymentMethod === 'cod' ? 'border-brand bg-brand/5' : 'border-black/[0.08] hover:border-brand/50'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand focus:ring-brand"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-ink">Cash on Delivery</p>
                    <p className="text-xs text-muted">Pay when your order arrives</p>
                  </div>
                  <svg className="h-6 w-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a.75.75 0 00-.75.75v.75m15 0h.375a.75.75 0 00.75-.75v-.75m0 0h-.375a.75.75 0 00-.75.75v.75m-2.625-4.5v.75c0 .414.336.75.75.75h.375m-1.5-1.5h.375a.75.75 0 00.75.75v.75m-15 0h.375a.75.75 0 00.75-.75v-.75m0 0h-.375a.75.75 0 00-.75.75v.75" />
                  </svg>
                </label>

                <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                  formData.paymentMethod === 'online' ? 'border-brand bg-brand/5' : 'border-black/[0.08] hover:border-brand/50'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand focus:ring-brand"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-ink">Online Payment</p>
                    <p className="text-xs text-muted">Pay securely online (Coming Soon)</p>
                  </div>
                  <svg className="h-6 w-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0016.5 3.75h-9A2.25 2.25 0 005.25 6v12a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </label>
              </div>
              {errors.paymentMethod && <p className="mt-2 text-xs text-red-500">{errors.paymentMethod}</p>}
            </section>

            <section className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
              <h2 className="font-display text-xl font-bold text-ink">Order Items</h2>
              <ul className="mt-5 space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-semibold text-ink">{item.name}</p>
                      <p className="text-xs text-muted">{item.restaurant}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-muted">x{item.quantity}</p>
                      <p className="font-mono text-sm font-medium text-ink">
                        {formatINR(item.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="animate-fade-up-d2 sticky top-28 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <h2 className="font-display text-xl font-bold text-ink">Payment Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Items ({totalItems})</dt>
                <dd className="font-mono font-medium text-ink">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Delivery fee</dt>
                <dd className="font-mono font-medium text-ink">{formatINR(deliveryFee)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Taxes</dt>
                <dd className="font-mono font-medium text-ink">{formatINR(taxes)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-emerald-600">Discount</dt>
                  <dd className="font-mono font-medium text-emerald-600">−{formatINR(discount)}</dd>
                </div>
              )}
            </dl>
            <div className="mt-5 flex justify-between border-t border-black/[0.06] pt-5">
              <span className="font-display text-lg font-semibold text-ink">Total</span>
              <span className="font-display text-2xl font-bold text-brand">{formatINR(grandTotal)}</span>
            </div>
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isPlacing || !!success}
              className="mt-6 w-full rounded-xl bg-brand py-3.5 text-sm font-medium text-white transition hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPlacing ? 'Placing order...' : 'Place Order'}
            </button>
            <Link
              to="/cart"
              className="mt-3 block w-full rounded-xl border border-black/[0.08] py-3.5 text-center text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
            >
              Back to Cart
            </Link>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
