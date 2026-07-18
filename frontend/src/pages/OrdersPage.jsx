import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currency';

const ORDERS_KEY = 'cravenow-orders';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    // Filter orders for current user
    const userOrders = user?.id 
      ? allOrders.filter(order => order.userId === user.id)
      : allOrders;
    
    setOrders(userOrders);
    setLoading(false);
  }, [user?.id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700';
      case 'preparing':
        return 'bg-amber-100 text-amber-700';
      case 'delivered':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas">
        <Navbar forceLight />
        <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          <p className="mt-4 text-muted">Loading orders...</p>
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
        <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-brand/20 blur-[100px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="animate-fade-up font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            // Order History
          </span>
          <h1 className="animate-fade-up-d1 mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            My Orders
          </h1>
          <p className="animate-fade-up-d2 mt-4 text-[15px] text-white/60">
            Track and manage orders for {user?.fullName}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {orders.length === 0 ? (
          <div className="animate-fade-up rounded-3xl border border-black/[0.06] bg-white p-10 text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10">
              <svg className="h-8 w-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-ink">No orders yet</h2>
            <p className="mt-3 text-[15px] text-muted">
              Once you place an order from checkout, it will appear here for easy tracking.
            </p>
            <Link
              to="/menu"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-sm font-medium text-white transition hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)]"
            >
              Order Now
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </p>
            {orders.map((order, index) => (
              <Link
                key={order.id}
                to={`/order-confirmation/${order.id}`}
                className="animate-fade-up block rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition hover:border-brand/30 hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-ink">{order.id}</span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ink">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-brand">
                      {formatINR(order.pricing.grandTotal)}
                    </p>
                    <p className="text-xs text-muted capitalize">
                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-black/[0.06] pt-4">
                  <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="text-xs text-muted">
                    {order.items.map(item => item.name).join(', ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
