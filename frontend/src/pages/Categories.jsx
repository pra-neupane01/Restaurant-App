import { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categories';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res.categories || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Categories</h1>
          <p>Explore food by type and cuisine</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          {loading && <LoadingSpinner />}
          {error && <div className="form-error">{error}</div>}
          {!loading && !error && categories.length === 0 && (
            <div className="empty-state">
              <h2>No categories yet</h2>
            </div>
          )}
          <div className="card-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.category_id} category={cat} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
