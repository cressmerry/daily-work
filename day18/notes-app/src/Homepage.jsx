import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="homepage-container">
      <div className="hero-section">
        <h1 className="main-banner">
          Notes<span className="logo-sup">App</span>
        </h1>
        <p className="hero-subtitle">
          Staty Productive. Stay Active. Stay Fast
        </p>
        <div className="hero-actions">
          <Link to="/add" className="cta-button primary">
            Get Started
          </Link>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-item">
          <span>📝</span>
          <h3>Jot down your thoughts.</h3>
        </div>
        <div className="feature-item">
          <span>⚡</span>
          <h3>Lightweight and Suuuuuuperfast</h3>
        </div>
        <div className="feature-item">
          <span>🛡️</span>
          <h3>Persistent Server Storage</h3>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
