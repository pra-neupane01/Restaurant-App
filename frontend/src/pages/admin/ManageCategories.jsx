import { useEffect, useState } from 'react';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../api/categories';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ category_title: '', image_url: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = () => {
    getAllCategories()
      .then((res) => setCategories(res.categories || []))
      .catch(() => setCategories([]));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (editId) {
        await updateCategory(editId, form);
        setMessage('Category updated.');
        setEditId(null);
      } else {
        await createCategory(form);
        setMessage('Category created.');
      }
      setForm({ category_title: '', image_url: '' });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (cat) => {
    setEditId(cat.category_id);
    setForm({ category_title: cat.category_title, image_url: cat.image_url || '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await deleteCategory(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="admin-form">
        <h3>{editId ? 'Edit category' : 'Add category'}</h3>
        {message && <div className="form-success">{message}</div>}
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input value={form.category_title} onChange={(e) => setForm((p) => ({ ...p, category_title: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input value={form.image_url} onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))} />
            </div>
          </div>
          <button type="submit" className="btn btn--primary">
            {editId ? 'Update' : 'Create'} category
          </button>
          {editId && (
            <button type="button" className="btn btn--ghost" style={{ marginLeft: '0.5rem' }} onClick={() => { setEditId(null); setForm({ category_title: '', image_url: '' }); }}>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.category_id}>
                <td>{cat.category_id}</td>
                <td>{cat.category_title}</td>
                <td>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => startEdit(cat)}>Edit</button>
                  <button type="button" className="btn btn--danger btn--sm" onClick={() => handleDelete(cat.category_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
