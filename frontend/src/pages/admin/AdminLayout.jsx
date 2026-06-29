import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Admin dashboard</h1>
          <p>Manage restaurants, menu, categories, and orders</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <nav className="admin-nav">
            <NavLink to="/admin" end>
              Overview
            </NavLink>
            <NavLink to="/admin/restaurants">Restaurants</NavLink>
            <NavLink to="/admin/categories">Categories</NavLink>
            <NavLink to="/admin/foods">Foods</NavLink>
            <NavLink to="/admin/orders">Orders</NavLink>
          </nav>
          <Outlet />
        </div>
      </section>
    </>
  );
}
