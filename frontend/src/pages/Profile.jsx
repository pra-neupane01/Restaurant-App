import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser, updatePassword, deleteUser } from '../api/users';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [profileForm, setProfileForm] = useState({
    userName: user?.userName || '',
    address: user?.address || '',
    phoneNumber: user?.phoneNumber || '',
  });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await updateUser(profileForm);
      updateProfile({
        userName: res.user.username,
        address: res.user.address,
        phoneNumber: res.user.phonenumber,
      });
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await updatePassword(passwordForm);
      setMessage('Password updated successfully.');
      setPasswordForm({ oldPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
    try {
      await deleteUser();
      logout();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>My profile</h1>
          <p>{user?.email} · {user?.userType}</p>
        </div>
      </div>
      <section className="section">
        <div className="container profile-grid">
          {message && <div className="form-success" style={{ gridColumn: '1 / -1' }}>{message}</div>}
          {error && <div className="form-error" style={{ gridColumn: '1 / -1' }}>{error}</div>}

          <div className="profile-card">
            <h2>Edit profile</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label htmlFor="userName">Name</label>
                <input
                  id="userName"
                  value={profileForm.userName}
                  onChange={(e) => setProfileForm((p) => ({ ...p, userName: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm((p) => ({ ...p, address: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  value={profileForm.phoneNumber}
                  onChange={(e) => setProfileForm((p) => ({ ...p, phoneNumber: e.target.value }))}
                />
              </div>
              <button type="submit" className="btn btn--primary" disabled={loading}>
                Save changes
              </button>
            </form>
          </div>

          <div className="profile-card">
            <h2>Change password</h2>
            <form onSubmit={handlePasswordUpdate}>
              <div className="form-group">
                <label htmlFor="oldPassword">Current password</label>
                <input
                  id="oldPassword"
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, oldPassword: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New password</label>
                <input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" className="btn btn--primary" disabled={loading}>
                Update password
              </button>
            </form>
          </div>

          <div className="profile-card" style={{ gridColumn: '1 / -1' }}>
            <h2>Danger zone</h2>
            <p className="card__meta" style={{ marginBottom: '1rem' }}>
              Permanently delete your account and all associated data.
            </p>
            <button type="button" className="btn btn--danger" onClick={handleDelete}>
              Delete account
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
