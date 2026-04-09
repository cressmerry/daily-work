import { Link } from "react-router-dom";
import "./App.css";

function Homepage() {
  return (
    <div className="homepage-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>
            Secu<span className="brand-highlight">Forms</span>
          </h1>
          <p className="hero-subtitle">
            Capture your answers, secure your account, and stay protected with industry-leading validation.
          </p>
          <div className="hero-buttons">
            <Link to="/demo" className="btn-primary">
              Try Demo
            </Link>
            <a href="#features" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </header>

      <section id="features" className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Resilient</h3>
          <p>Built with robust sanitization to stand strong against malicious injections.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👤</div>
          <h3>User-First</h3>
          <p>Designed with accessibility and ease of use as our absolute first priority.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure</h3>
          <p>The title says it all ;-).</p>
        </div>
      </section>
    </div>
  );
}

export default Homepage;