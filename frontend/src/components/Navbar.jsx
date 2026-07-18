import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../data/homeData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CartIcon() {
  return (
    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}

function NavLink({ link, scrolled, onClick, className = '' }) {
  const baseClass = `rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${className} ${
    scrolled
      ? 'text-muted hover:bg-black/[0.04] hover:text-ink'
      : 'text-white/60 hover:bg-white/[0.06] hover:text-white'
  }`;

  if (link.isRoute) {
    return (
      <Link to={link.href} className={baseClass} onClick={onClick}>
        {link.label}
      </Link>
    );
  }

  return (
    <a href={link.href} className={baseClass} onClick={onClick}>
      {link.label}
    </a>
  );
}

function UserMenu({ isLight }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, initials, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-xl border px-2.5 py-1.5 transition-all ${
          isLight
            ? 'border-black/[0.08] bg-white hover:border-brand/30'
            : 'border-white/10 bg-white/[0.06] hover:border-white/20'
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 font-mono text-[10px] font-medium text-brand">
          {initials}
        </span>
        <span className={`hidden max-w-[100px] truncate text-[13px] font-medium sm:block ${isLight ? 'text-ink' : 'text-white'}`}>
          {user.fullName.split(' ')[0]}
        </span>
        <svg className={`h-3.5 w-3.5 ${isLight ? 'text-muted' : 'text-white/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="animate-scale-in absolute right-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
          <div className="border-b border-black/[0.06] px-4 py-3">
            <p className="truncate font-display text-sm font-semibold text-ink">{user.fullName}</p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>
          <div className="p-2">
            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ink transition hover:bg-black/[0.04]"
            >
              <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              </svg>
              My Orders
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar({ forceLight = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const isLight = forceLight || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5 ${
          isLight
            ? 'glass-light border-black/[0.06] bg-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.06)]'
            : 'border border-white/10 bg-white/[0.04] backdrop-blur-xl'
        }`}
      >
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rounded-lg bg-brand/20 blur-md transition group-hover:bg-brand/40" />
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 font-mono text-[10px] font-medium text-brand">
              CN
            </span>
          </span>
          <span className={`font-display text-[15px] font-semibold tracking-tight ${isLight ? 'text-ink' : 'text-white'}`}>
            Crave Now
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink link={link} scrolled={isLight} />
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/cart"
            className={`relative rounded-lg p-2 transition-all ${
              isLight ? 'text-muted hover:bg-black/[0.04] hover:text-ink' : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
            }`}
            aria-label={`Cart${totalItems > 0 ? `, ${totalItems} items` : ''}`}
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 animate-scale-in items-center justify-center rounded-full bg-brand px-1 font-mono text-[9px] font-medium text-white">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <UserMenu isLight={isLight} />
          ) : (
            <>
              <Link
                to="/login"
                className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-all ${
                  isLight ? 'text-muted hover:text-ink' : 'text-white/70 hover:text-white'
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-brand px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)] active:scale-[0.97]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className={`rounded-lg p-2 md:hidden ${isLight ? 'text-ink' : 'text-white'}`}
          aria-label="Toggle menu"
          onClick={() => setIsOpen((v) => !v)}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <div className={`mx-auto mt-2 max-w-6xl overflow-hidden transition-all duration-300 md:hidden ${isOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glass-light rounded-2xl border border-black/[0.06] bg-white/90 p-4 shadow-xl">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  link={link}
                  scrolled
                  className="block"
                  onClick={() => setIsOpen(false)}
                />
              </li>
            ))}
          </ul>

          {isAuthenticated ? (
            <div className="mt-3 space-y-2 border-t border-black/[0.06] pt-3">
              <Link
                to="/orders"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm text-ink transition hover:bg-black/[0.04]"
              >
                My Orders
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-red-500 transition hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mt-3 flex gap-2 border-t border-black/[0.06] pt-3">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-xl py-2.5 text-center text-sm text-muted transition hover:text-brand"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-xl bg-brand py-2.5 text-center text-sm font-medium text-white"
              >
                Sign Up
              </Link>
            </div>
          )}

          <div className="mt-3 border-t border-black/[0.06] pt-3">
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="relative flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.08] py-2.5 text-sm text-muted transition hover:border-brand hover:text-brand"
            >
              <CartIcon />
              Cart
              {totalItems > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 font-mono text-[10px] font-medium text-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
