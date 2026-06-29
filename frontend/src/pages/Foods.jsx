import { useEffect, useState } from 'react';
import { getAllFoods } from '../api/foods';
import FoodCard from '../components/FoodCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';

export default function Foods() {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    getAllFoods()
      .then((res) => {
        const list = Array.isArray(res.message) ? res.message : [];
        setFoods(list);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Full menu</h1>
          <p>Browse all dishes across our partner restaurants</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          {loading && <LoadingSpinner />}
          {error && <div className="form-error">{error}</div>}
          {!loading && !error && foods.length === 0 && (
            <div className="empty-state">
              <h2>No dishes available</h2>
              <p>Menu items will appear here once added.</p>
            </div>
          )}
          <div className="card-grid">
            {foods.map((food) => (
              <FoodCard key={food.food_id} food={food} onAdd={addItem} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
