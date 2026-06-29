export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">🍽️ FoodieHub</p>
          <p className="footer__tagline">Delicious food, delivered fast.</p>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} FoodieHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
