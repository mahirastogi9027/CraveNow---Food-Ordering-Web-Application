import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmptyCart from '../components/cart/EmptyCart';
import CartLineItem from '../components/cart/CartLineItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items } = useCart();
  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar forceLight />

      <section className="relative overflow-hidden bg-void pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-brand/20 blur-[100px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="animate-fade-up font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            // Your Order
          </span>
          <h1 className="animate-fade-up-d1 mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Shopping Cart
          </h1>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {items.length} {items.length === 1 ? 'item' : 'items'} in cart
              </p>
              {items.map((item, index) => (
                <CartLineItem key={item.id} item={item} index={index} />
              ))}
            </div>

            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
