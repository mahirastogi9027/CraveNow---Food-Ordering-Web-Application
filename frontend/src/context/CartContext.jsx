import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';

const STORAGE_KEY = 'cravenow-cart';
const DELIVERY_FEE = 49;
const DISCOUNT_THRESHOLD = 1500;
const DISCOUNT_RATE = 0.1;
const TAX_RATE = 0.05;

const CartContext = createContext(null);

function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;

    case 'ADD_ITEM': {
      const { item } = action.payload;
      const existing = state.find((i) => i.id === item.id);
      if (existing) {
        return state.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...state, { ...item, quantity: 1 }];
    }

    case 'REMOVE_ITEM':
      return state.filter((i) => i.id !== action.payload.id);

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity < 1) return state.filter((i) => i.id !== id);
      return state.map((i) => (i.id === id ? { ...i, quantity } : i));
    }

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], () => loadCart());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        item: {
          id: item.id,
          name: item.name,
          restaurant: item.restaurant,
          price: item.price,
          image: item.image,
        },
      },
    });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const totals = useMemo(() => {
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discount = subtotal >= DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
    const taxableAmount = Math.max(0, subtotal - discount);
    const taxes = items.length > 0 ? taxableAmount * TAX_RATE : 0;
    const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
    const grandTotal = subtotal + deliveryFee + taxes - discount;

    return { totalItems, subtotal, discount, deliveryFee, taxes, grandTotal };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      ...totals,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export { DELIVERY_FEE, DISCOUNT_THRESHOLD, DISCOUNT_RATE, TAX_RATE };
