import { createContext, useContext, useMemo, useState } from 'react';
import { getFoodPrice } from '../utils/price';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (food) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.food_id === food.food_id);
      if (existing) {
        return prev.map((i) =>
          i.food_id === food.food_id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...food, quantity: 1, price: getFoodPrice(food) }];
    });
  };

  const removeItem = (foodId) => {
    setItems((prev) => prev.filter((i) => i.food_id !== foodId));
  };

  const updateQuantity = (foodId, quantity) => {
    if (quantity < 1) {
      removeItem(foodId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.food_id === foodId ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
