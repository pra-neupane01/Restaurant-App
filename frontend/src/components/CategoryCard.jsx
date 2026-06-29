export default function CategoryCard({ category }) {
  return (
    <article className="card category-card">
      <img
        src={category.image_url || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'}
        alt={category.category_title}
        className="category-card__image"
      />
      <h3>{category.category_title}</h3>
    </article>
  );
}
