import { useEffect, useState } from 'react';
import { getAllRestaurants } from '../api/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRestaurants()
      .then((res) => setRestaurants(res.restaurants || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Restaurants</h1>
          <p>Discover great places to eat near you</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          {loading && <LoadingSpinner />}
          {error && <div className="form-error">{error}</div>}
          {!loading && !error && restaurants.length === 0 && (
            <div className="empty-state">
              <h2>No restaurants yet</h2>
              <p>Check back soon for new listings.</p>
            </div>
          )}
          <div className="card-grid">
            {restaurants.map((r) => (
              <RestaurantCard key={r.restaurant_code} restaurant={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
