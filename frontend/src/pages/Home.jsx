import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllRestaurants } from '../api/restaurants';
import { getAllCategories } from '../api/categories';
import { getAllFoods } from '../api/foods';
import RestaurantCard from '../components/RestaurantCard';
import FoodCard from '../components/FoodCard';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    Promise.all([
      getAllRestaurants().catch(() => ({ restaurants: [] })),
      getAllCategories().catch(() => ({ categories: [] })),
      getAllFoods().catch(() => ({ message: [] })),
    ])
      .then(([r, c, f]) => {
        setRestaurants((r.restaurants || []).slice(0, 3));
        setCategories((c.categories || []).slice(0, 4));
        const foodList = Array.isArray(f.message) ? f.message : [];
        setFoods(foodList.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="hero__eyebrow">Fresh & fast delivery</span>
            <h1>
              Order your favorite meals from top restaurants
            </h1>
            <p>
              Browse curated restaurants, explore categories, and get delicious food
              delivered to your door in minutes.
            </p>
            <div className="hero__actions">
              <Link to="/restaurants" className="btn btn--primary">
                Explore restaurants
              </Link>
              <Link to="/foods" className="btn btn--ghost">
                View full menu
              </Link>
            </div>
          </div>
          <div className="hero__image-wrap">
            <img
              className="hero__image"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
              alt="Delicious food spread"
            />
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__header">
              <div>
                <h2>Popular categories</h2>
                <p>Find what you&apos;re craving</p>
              </div>
              <Link to="/categories" className="link-arrow">
                See all →
              </Link>
            </div>
            <div className="card-grid">
              {categories.map((cat) => (
                <CategoryCard key={cat.category_id} category={cat} />
              ))}
            </div>
          </div>
        </section>
      )}

      {restaurants.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__header">
              <div>
                <h2>Top restaurants</h2>
                <p>Highly rated spots near you</p>
              </div>
              <Link to="/restaurants" className="link-arrow">
                See all →
              </Link>
            </div>
            <div className="card-grid">
              {restaurants.map((r) => (
                <RestaurantCard key={r.restaurant_code} restaurant={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {foods.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__header">
              <div>
                <h2>Trending dishes</h2>
                <p>Customer favorites this week</p>
              </div>
              <Link to="/foods" className="link-arrow">
                See all →
              </Link>
            </div>
            <div className="card-grid">
              {foods.map((food) => (
                <FoodCard key={food.food_id} food={food} onAdd={addItem} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
