import { Link } from 'react-router-dom';

export default function RestaurantCard({ restaurant }) {
  const image = restaurant.image_url || restaurant.logo_url;

  return (
    <Link to={`/restaurants/${restaurant.restaurant_code}`} className="card restaurant-card">
      <div className="card__image-wrap">
        <img
          src={image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600'}
          alt={restaurant.title}
          className="card__image"
        />
        <span className="card__badge">★ {restaurant.rating}</span>
      </div>
      <div className="card__body">
        <h3>{restaurant.title}</h3>
        <p className="card__meta">{restaurant.address}</p>
        <div className="card__tags">
          {restaurant.delivery === 'Available' && <span className="tag tag--green">Delivery</span>}
          {restaurant.pickup === 'Available' && <span className="tag">Pickup</span>}
          <span className={`tag ${restaurant.service_door === 'Open' ? 'tag--green' : 'tag--red'}`}>
            {restaurant.service_door}
          </span>
        </div>
      </div>
    </Link>
  );
}
