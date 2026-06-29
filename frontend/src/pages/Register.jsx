import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api/auth';

export default function Register() {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    userType: 'Client',
    answer: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await registerApi(form);
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p>Join FoodieHub and start ordering today.</p>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Full name</label>
            <input id="userName" name="userName" value={form.userName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone</label>
            <input id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input id="address" name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="answer">Security answer</label>
            <input id="answer" name="answer" value={form.answer} onChange={handleChange} placeholder="For password recovery" />
          </div>
          <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
