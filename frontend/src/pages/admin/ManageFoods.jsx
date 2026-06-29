import { useEffect, useState } from 'react';
import { getAllFoods, createFood, updateFood, deleteFood } from '../../api/foods';
import { getAllRestaurants } from '../../api/restaurants';
import { getAllCategories } from '../../api/categories';

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    food_id: '',
    food_title: '',
    food_description: '',
    image_url: '',
    availability_status: 'Available',
    rating: 4,
    rating_count: 0,
    restaurant_code: '',
    category_id: '',
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = () => {
    getAllFoods()
      .then((res) => setFoods(Array.isArray(res.message) ? res.message : []))
      .catch(() => setFoods([]));
    getAllRestaurants().then((res) => setRestaurants(res.restaurants || [])).catch(() => {});
    getAllCategories().then((res) => setCategories(res.categories || [])).catch(() => {});
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const payload = {
        ...form,
        rating: Number(form.rating),
        rating_count: Number(form.rating_count),
        category_id: Number(form.category_id),
      };
      if (editId) {
        await updateFood(editId, payload);
        setMessage('Food updated.');
        setEditId(null);
      } else {
        await createFood(payload);
        setMessage('Food created.');
      }
      setForm({
        food_id: '',
        food_title: '',
        food_description: '',
        image_url: '',
        availability_status: 'Available',
        rating: 4,
        rating_count: 0,
        restaurant_code: '',
        category_id: '',
      });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (food) => {
    setEditId(food.food_id);
    setForm({
      food_id: food.food_id,
      food_title: food.food_title,
      food_description: food.food_description || '',
      image_url: food.image_url || '',
      availability_status: food.availability_status,
      rating: food.rating,
      rating_count: food.rating_count,
      restaurant_code: food.restaurant_code,
      category_id: String(food.category_id),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this food item?')) return;
    try {
      await deleteFood(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="admin-form">
        <h3>{editId ? 'Edit food' : 'Add food'}</h3>
        {message && <div className="form-success">{message}</div>}
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Food ID</label>
              <input value={form.food_id} onChange={(e) => setForm((p) => ({ ...p, food_id: e.target.value }))} required disabled={!!editId} />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input value={form.food_title} onChange={(e) => setForm((p) => ({ ...p, food_title: e.target.value }))} required />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.food_description} onChange={(e) => setForm((p) => ({ ...p, food_description: e.target.value }))} rows={2} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Restaurant</label>
              <select value={form.restaurant_code} onChange={(e) => setForm((p) => ({ ...p, restaurant_code: e.target.value }))} required disabled={!!editId}>
                <option value="">Select...</option>
                {restaurants.map((r) => (
                  <option key={r.restaurant_code} value={r.restaurant_code}>{r.title}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category_id} onChange={(e) => setForm((p) => ({ ...p, category_id: e.target.value }))} required disabled={!!editId}>
                <option value="">Select...</option>
                {categories.map((c) => (
                  <option key={c.category_id} value={c.category_id}>{c.category_title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Image URL</label>
              <input value={form.image_url} onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.availability_status} onChange={(e) => setForm((p) => ({ ...p, availability_status: e.target.value }))}>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn--primary">
            {editId ? 'Update' : 'Create'} food
          </button>
          {editId && (
            <button type="button" className="btn btn--ghost" style={{ marginLeft: '0.5rem' }} onClick={() => { setEditId(null); load(); }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Restaurant</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.food_id}>
                <td>{food.food_id}</td>
                <td>{food.food_title}</td>
                <td>{food.restaurant_code}</td>
                <td>{food.availability_status}</td>
                <td>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => startEdit(food)}>Edit</button>
                  <button type="button" className="btn btn--danger btn--sm" onClick={() => handleDelete(food.food_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
