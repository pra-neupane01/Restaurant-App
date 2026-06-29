import { useEffect, useState } from 'react';
import {
  getAllRestaurants,
  createRestaurant,
  deleteRestaurant,
} from '../../api/restaurants';

export default function ManageRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({
    restaurant_code: '',
    title: '',
    image_url: '',
    foods: [],
    open_time: '10:00',
    pickup: 'Available',
    delivery: 'Available',
    service_door: 'Open',
    logo_url: '',
    rating: 4,
    address: '',
  });
  const [foodsInput, setFoodsInput] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = () => {
    getAllRestaurants()
      .then((res) => setRestaurants(res.restaurants || []))
      .catch(() => setRestaurants([]));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const foods = foodsInput.split(',').map((f) => f.trim()).filter(Boolean);
      await createRestaurant({ ...form, foods, rating: Number(form.rating) });
      setMessage('Restaurant created.');
      setForm({
        restaurant_code: '',
        title: '',
        image_url: '',
        foods: [],
        open_time: '10:00',
        pickup: 'Available',
        delivery: 'Available',
        service_door: 'Open',
        logo_url: '',
        rating: 4,
        address: '',
      });
      setFoodsInput('');
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this restaurant?')) return;
    try {
      await deleteRestaurant(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="admin-form">
        <h3>Add restaurant</h3>
        {message && <div className="form-success">{message}</div>}
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Restaurant code</label>
              <input value={form.restaurant_code} onChange={(e) => setForm((p) => ({ ...p, restaurant_code: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Logo URL</label>
              <input value={form.logo_url} onChange={(e) => setForm((p) => ({ ...p, logo_url: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input value={form.image_url} onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))} />
            </div>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label>Food tags (comma-separated)</label>
            <input value={foodsInput} onChange={(e) => setFoodsInput(e.target.value)} placeholder="burger, pizza, pasta" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Rating (1-5)</label>
              <input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Open time</label>
              <input type="time" value={form.open_time} onChange={(e) => setForm((p) => ({ ...p, open_time: e.target.value }))} />
            </div>
          </div>
          <button type="submit" className="btn btn--primary">Create restaurant</button>
        </form>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Address</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((r) => (
              <tr key={r.restaurant_code}>
                <td>{r.restaurant_code}</td>
                <td>{r.title}</td>
                <td>{r.address}</td>
                <td>★ {r.rating}</td>
                <td>
                  <button type="button" className="btn btn--danger btn--sm" onClick={() => handleDelete(r.restaurant_code)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
