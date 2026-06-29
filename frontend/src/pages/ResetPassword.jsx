import { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../api/users';

export default function ResetPassword() {
  const [form, setForm] = useState({ email: '', newPassword: '', answer: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await resetPassword(form);
      setSuccess('Password reset successfully! You can now sign in.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Reset password</h1>
        <p>Enter your email, security answer, and new password.</p>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="answer">Security answer</label>
            <input id="answer" name="answer" value={form.answer} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New password</label>
            <input id="newPassword" name="newPassword" type="password" value={form.newPassword} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset password'}
          </button>
        </form>
        <p className="auth-footer">
          <Link to="/login">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
