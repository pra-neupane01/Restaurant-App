import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRestaurantById } from '../api/restaurants';
import { getFoodsByRestaurant } from '../api/foods';
import FoodCard from '../components/FoodCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    Promise.all([
      getRestaurantById(id),
      getFoodsByRestaurant(id).catch(() => ({ food: [] })),
    ])
      .then(([r, f]) => {
        setRestaurant(r.restaurant);
        setFoods(f.food || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) {
    return (
      <div className="container section">
        <div className="form-error">{error}</div>
        <Link to="/restaurants" className="link-arrow">← Back to restaurants</Link>
      </div>
    );
  }

  const image = restaurant?.image_url || restaurant?.logo_url;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Link to="/restaurants" className="link-arrow" style={{ display: 'block', marginBottom: '0.5rem' }}>
            ← All restaurants
          </Link>
          <h1>{restaurant?.title}</h1>
          <p>{restaurant?.address}</p>
          <div className="card__tags" style={{ marginTop: '0.75rem' }}>
            <span className="tag">★ {restaurant?.rating}</span>
            {restaurant?.delivery === 'Available' && <span className="tag tag--green">Delivery</span>}
            {restaurant?.pickup === 'Available' && <span className="tag">Pickup</span>}
          </div>
        </div>
      </div>
      {image && (
        <div className="container" style={{ marginBottom: '1.5rem' }}>
          <img
            src={image}
            alt={restaurant.title}
            style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
          />
        </div>
      )}
      <section className="section">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '1.25rem' }}>Menu</h2>
          {foods.length === 0 ? (
            <div className="empty-state">
              <p>No menu items for this restaurant yet.</p>
            </div>
          ) : (
            <div className="card-grid">
              {foods.map((food) => (
                <FoodCard key={food.food_id} food={food} onAdd={addItem} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
