import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currency';

const ORDERS_KEY = 'cravenow-orders';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch order from localStorage
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    const foundOrder = orders.find(o => o.id === orderId);

    if (!foundOrder) {
      navigate('/orders', { replace: true });
      return;
    }

    setOrder(foundOrder);
    setLoading(false);
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas">
        <Navbar forceLight />
        <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          <p className="mt-4 text-muted">Loading order details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) return null;

  const deliveryTime = new Date(order.estimatedDelivery);
  const formattedDeliveryTime = deliveryTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar forceLight />

      <section className="relative overflow-hidden bg-void pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-brand/20 blur-[100px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="animate-fade-up font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            // Order Confirmed
          </span>
          <h1 className="animate-fade-up-d1 mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Order Confirmed!
          </h1>
          <p className="animate-fade-up-d2 mt-4 text-[15px] text-white/60">
            Thank you for your order, {order.customerDetails.name}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-scale-in space-y-6">
          {/* Success Message */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-emerald-900">Order Placed Successfully</h2>
            <p className="mt-2 text-emerald-700">Your order is being prepared and will be delivered soon.</p>
          </div>

          {/* Order Details */}
          <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
              <div>
                <p className="font-mono text-xs text-muted">Order ID</p>
                <p className="font-mono text-sm font-semibold text-ink">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-muted">Estimated Delivery</p>
                <p className="font-mono text-sm font-semibold text-brand">{formattedDeliveryTime}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="font-mono text-xs text-muted">Delivery Address</p>
                <p className="mt-1 text-sm font-medium text-ink">{order.customerDetails.address}</p>
              </div>

              <div>
                <p className="font-mono text-xs text-muted">Contact</p>
                <p className="mt-1 text-sm text-ink">{order.customerDetails.name} · {order.customerDetails.phone}</p>
              </div>

              <div>
                <p className="font-mono text-xs text-muted">Payment Method</p>
                <p className="mt-1 text-sm text-ink capitalize">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <h3 className="font-display text-lg font-bold text-ink">Order Items</h3>
            <ul className="mt-4 space-y-4">
              {order.items.map((item) => (
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
          </div>

          {/* Price Summary */}
          <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <h3 className="font-display text-lg font-bold text-ink">Order Summary</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-mono font-medium text-ink">{formatINR(order.pricing.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Delivery Fee</dt>
                <dd className="font-mono font-medium text-ink">{formatINR(order.pricing.deliveryFee)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Taxes</dt>
                <dd className="font-mono font-medium text-ink">{formatINR(order.pricing.taxes)}</dd>
              </div>
              {order.pricing.discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-emerald-600">Discount</dt>
                  <dd className="font-mono font-medium text-emerald-600">−{formatINR(order.pricing.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-black/[0.06] pt-3">
                <span className="font-display text-lg font-semibold text-ink">Total</span>
                <span className="font-display text-2xl font-bold text-brand">{formatINR(order.pricing.grandTotal)}</span>
              </div>
            </dl>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link
              to="/orders"
              className="flex-1 rounded-xl bg-brand px-6 py-3.5 text-center text-sm font-medium text-white transition hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)]"
            >
              View My Orders
            </Link>
            <Link
              to="/menu"
              className="flex-1 rounded-xl border border-black/[0.08] px-6 py-3.5 text-center text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
            >
              Order More
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
