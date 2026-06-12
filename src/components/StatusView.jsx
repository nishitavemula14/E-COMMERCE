export default function StatusView({ loading, error }) {
  if (loading) {
    return <p className="status">Loading products...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  return null;
}
