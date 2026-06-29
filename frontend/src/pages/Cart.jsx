import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orders';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/price';

export default function Cart() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      for (const item of items) {
        const orderId = `ORD-${Date.now()}-${item.food_id}`;
        await createOrder({
          order_id: orderId,
          payment_amount: item.price * item.quantity,
          food_id: item.food_id,
        });
      }
      clearCart();
      setSuccess('Order placed successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !success) {
    return (
      <div className="container section">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add some delicious food to get started.</p>
          <Link to="/foods" className="btn btn--primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
            Browse menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Your cart</h1>
          <p>{items.length} item(s) ready to order</p>
        </div>
      </div>
      <section className="section">
        <div className="container cart-layout">
          <div>
            {success && <div className="form-success">{success}</div>}
            {error && <div className="form-error">{error}</div>}
            {items.map((item) => (
              <div key={item.food_id} className="cart-item">
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'}
                  alt={item.food_title}
                />
                <div className="cart-item__info">
                  <h3>{item.food_title}</h3>
                  <p className="card__meta">{formatPrice(item.price)} each</p>
                  <div className="qty-control">
                    <button type="button" onClick={() => updateQuantity(item.food_id, item.quantity - 1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.food_id, item.quantity + 1)}>
                      +
                    </button>
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => removeItem(item.food_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order summary</h3>
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="cart-summary__total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={handleCheckout}
              disabled={loading || items.length === 0}
            >
              {loading ? 'Placing order...' : isAuthenticated ? 'Place order' : 'Sign in to order'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
