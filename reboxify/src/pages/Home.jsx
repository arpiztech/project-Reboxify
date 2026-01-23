import React from "react";
import { useNavigate } from "react-router-dom";
import { Package, Leaf, Shield, TrendingUp, ArrowRight } from "lucide-react";
import Footer from "../components/common/Footer";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Package,
      title: "Reusable Boxes",
      description:
        "High-quality, durable boxes that can be used multiple times",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description:
        "Reduce plastic waste and carbon footprint with every rental",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Refundable deposits ensure box safety and accountability",
    },
    {
      icon: TrendingUp,
      title: "Track Impact",
      description: "Monitor your environmental contribution in real-time",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Register",
      description: "Create your free account in seconds",
    },
    {
      number: "2",
      title: "Choose Box",
      description: "Select from various sizes and categories",
    },
    {
      number: "3",
      title: "Pay Deposit",
      description: "Fully refundable security deposit",
    },
    {
      number: "4",
      title: "Use & Return",
      description: "Return anytime and get your deposit back",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Leaf size={16} />
            <span>Sustainable Packaging Solution</span>
          </div>
          <h1 className="hero-title">
            Replace Single-Use Boxes with
            <span className="gradient-text"> Reusable Smart Boxes</span>
          </h1>
          <p className="hero-description">
            Join the sustainability revolution. Rent eco-friendly boxes, save
            money, and help save the planet.
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => navigate("/register")}
              className="btn-primary-large"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="btn-secondary-large"
            >
              Sign In
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <strong>1000+</strong>
              <span>Users</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>50K+</strong>
              <span>Boxes Reused</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>125 Tons</strong>
              <span>Plastic Saved</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-box box-1">📦</div>
          <div className="floating-box box-2">📦</div>
          <div className="floating-box box-3">📦</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose ReBoxify?</h2>
          <p className="section-subtitle">
            Experience the future of sustainable packaging
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <feature.icon size={32} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in 4 simple steps</p>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="step-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Join thousands of users making packaging sustainable</p>
            <button onClick={() => navigate("/register")} className="btn-cta">
              Start Your Journey Today
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
