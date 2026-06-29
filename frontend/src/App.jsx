import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';

function Placeholder() {
  return (
    <div className="hero">
      <div className="container">
        <span className="hero__eyebrow">FoodieHub</span>
        <h1>Frontend loading...</h1>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Placeholder />} />
          </Route>
        </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
