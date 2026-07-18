import { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';

export default function useAddToCart() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = useCallback(
    (item) => {
      addItem(item);
      setAddedId(item.id);
      setTimeout(() => setAddedId(null), 2000);
    },
    [addItem],
  );

  const isAdded = useCallback((id) => addedId === id, [addedId]);

  return { handleAddToCart, isAdded };
}
