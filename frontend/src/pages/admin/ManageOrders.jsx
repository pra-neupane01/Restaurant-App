import { useState } from 'react';
import { updateOrderStatus } from '../../api/orders';

export default function ManageOrders() {
  const [form, setForm] = useState({ orderId: '', order_status: 'Preparing' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await updateOrderStatus(form.orderId, { order_status: form.order_status });
      setOrder(res.order);
      setMessage('Order status updated successfully.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="admin-form">
        <h3>Update order status</h3>
        <p className="card__meta" style={{ marginBottom: '1rem' }}>
          Enter an order ID to update its delivery status.
        </p>
        {message && <div className="form-success">{message}</div>}
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Order ID</label>
              <input value={form.orderId} onChange={(e) => setForm((p) => ({ ...p, orderId: e.target.value }))} required placeholder="ORD-..." />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.order_status} onChange={(e) => setForm((p) => ({ ...p, order_status: e.target.value }))}>
                <option value="Preparing">Preparing</option>
                <option value="On the way">On the way</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn--primary">Update status</button>
        </form>
      </div>

      {order && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Food ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.order_id}</td>
                <td>{order.food_id}</td>
                <td>Rs. {order.payment_amount}</td>
                <td>{order.order_status}</td>
                <td>{order.user_id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
