export default function LoadingSpinner({ fullPage = false }) {
  return (
    <div className={`loading-spinner ${fullPage ? 'loading-spinner--full' : ''}`}>
      <div className="spinner" />
      {fullPage && <p>Loading...</p>}
    </div>
  );
}
