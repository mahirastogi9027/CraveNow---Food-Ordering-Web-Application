import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { DISCOUNT_THRESHOLD, TAX_RATE } from '../../context/CartContext';
import { formatINR } from '../../utils/currency';

const COUPONS = {
  CRAVE10: { type: 'percent', value: 0.1, label: '10% off' },
  SAVE50: { type: 'fixed', value: 50, label: '₹50 off' },
  WELCOME: { type: 'percent', value: 0.15, label: '15% off' },
};

export default function CartSummary() {
  const { totalItems, subtotal, deliveryFee, discount, taxes, grandTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError('Enter a coupon code');
      return;
    }

    const coupon = COUPONS[code];
    if (!coupon) {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon({ code, ...coupon });
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === 'percent'
      ? grandTotal * appliedCoupon.value
      : Math.min(appliedCoupon.value, grandTotal)
    : 0;

  const finalTotal = Math.max(0, grandTotal - couponDiscount);

  return (
    <div className="animate-fade-up-d2 sticky top-28 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
      <h2 className="font-display text-xl font-bold text-ink">Order Summary</h2>

      <div className="mt-5">
        <label htmlFor="coupon-code" className="font-mono text-[10px] uppercase tracking-wider text-muted">
          Apply Coupon
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="coupon-code"
            type="text"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
              if (couponError) setCouponError('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
            placeholder="e.g. CRAVE10"
            disabled={!!appliedCoupon}
            className="flex-1 rounded-xl border border-black/[0.08] bg-canvas px-3.5 py-2.5 font-mono text-sm text-ink placeholder:text-subtle transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-60"
          />
          {appliedCoupon ? (
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="shrink-0 rounded-xl border border-black/[0.08] px-4 py-2.5 text-sm font-medium text-muted transition hover:border-red-200 hover:text-red-500 active:scale-[0.98]"
            >
              Remove
            </button>
          ) : (
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="shrink-0 rounded-xl bg-void px-4 py-2.5 text-sm font-medium text-white transition hover:bg-void/90 active:scale-[0.98]"
            >
              Apply
            </button>
          )}
        </div>
        {couponError && (
          <p className="mt-2 text-xs text-red-500">{couponError}</p>
        )}
        {appliedCoupon && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {appliedCoupon.code} applied — {appliedCoupon.label}
          </p>
        )}
        {!appliedCoupon && !couponError && (
          <p className="mt-2 font-mono text-[10px] text-subtle">Try CRAVE10, SAVE50, or WELCOME</p>
        )}
      </div>

      <dl className="mt-6 space-y-3 border-t border-black/[0.06] pt-6">
        <div className="flex justify-between text-sm">
          <dt className="text-muted">Total items</dt>
          <dd className="font-mono font-medium text-ink">{totalItems}</dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="text-muted">Item subtotal</dt>
          <dd className="font-mono font-medium text-ink">{formatINR(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="text-muted">Delivery fee</dt>
          <dd className="font-mono font-medium text-ink">{formatINR(deliveryFee)}</dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="text-muted">Taxes ({Math.round(TAX_RATE * 100)}%)</dt>
          <dd className="font-mono font-medium text-ink">{formatINR(taxes)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <dt className="text-emerald-600">Auto discount (10%)</dt>
            <dd className="font-mono font-medium text-emerald-600">−{formatINR(discount)}</dd>
          </div>
        )}
        {couponDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <dt className="text-emerald-600">Coupon ({appliedCoupon.code})</dt>
            <dd className="font-mono font-medium text-emerald-600">−{formatINR(couponDiscount)}</dd>
          </div>
        )}
        {discount === 0 && subtotal > 0 && (
          <p className="rounded-lg bg-brand/5 px-3 py-2 font-mono text-[10px] text-brand">
            Add {formatINR(DISCOUNT_THRESHOLD - subtotal)} more for 10% off
          </p>
        )}
      </dl>

      <div className="mt-5 flex justify-between border-t border-black/[0.06] pt-5">
        <span className="font-display text-lg font-semibold text-ink">Grand Total</span>
        <span className="font-display text-2xl font-bold text-brand">{formatINR(finalTotal)}</span>
      </div>

      <div className="mt-6 space-y-3">
        <Link
          to="/checkout"
          className="block w-full rounded-xl bg-brand py-3.5 text-center text-sm font-medium text-white transition-all hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)] active:scale-[0.98]"
        >
          Proceed to Checkout
        </Link>
        <Link
          to="/menu"
          className="block w-full rounded-xl border border-black/[0.08] py-3.5 text-center text-sm font-medium text-ink transition-all hover:border-brand hover:text-brand active:scale-[0.98]"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
