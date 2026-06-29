import { formatPrice, getFoodPrice } from '../utils/price';

export default function FoodCard({ food, onAdd, showAdd = true }) {
  const price = getFoodPrice(food);
  const unavailable = food.availability_status === 'Unavailable';

  return (
    <article className="card food-card">
      <div className="card__image-wrap food-card__image">
        <img
          src={food.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'}
          alt={food.food_title}
          className="card__image"
        />
        {unavailable && <span className="card__overlay">Unavailable</span>}
      </div>
      <div className="card__body">
        <h3>{food.food_title}</h3>
        <p className="card__desc">{food.food_description || 'Tasty dish from our kitchen.'}</p>
        <div className="food-card__footer">
          <div>
            <span className="food-card__price">{formatPrice(price)}</span>
            <span className="card__meta">★ {food.rating}</span>
          </div>
          {showAdd && (
            <button
              type="button"
              className="btn btn--primary btn--sm"
              disabled={unavailable}
              onClick={() => onAdd?.(food)}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
