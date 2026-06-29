import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="card-grid">
      <Link to="/admin/restaurants" className="card" style={{ padding: '1.5rem' }}>
        <h3>Restaurants</h3>
        <p className="card__meta">Create and manage restaurant listings</p>
      </Link>
      <Link to="/admin/categories" className="card" style={{ padding: '1.5rem' }}>
        <h3>Categories</h3>
        <p className="card__meta">Organize menu categories</p>
      </Link>
      <Link to="/admin/foods" className="card" style={{ padding: '1.5rem' }}>
        <h3>Food items</h3>
        <p className="card__meta">Add and edit dishes</p>
      </Link>
      <Link to="/admin/orders" className="card" style={{ padding: '1.5rem' }}>
        <h3>Orders</h3>
        <p className="card__meta">Update order status</p>
      </Link>
    </div>
  );
}
