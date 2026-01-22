import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, TrendingUp, CheckCircle, Leaf } from 'lucide-react';
import Header from '../components/common/Header';
import { useAuth } from '../context/AuthContext';
import { useBoxes } from '../context/BoxContext';
import { ENVIRONMENTAL_IMPACT } from '../utils/constants';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { boxes, getActiveRentals, getRentalHistory } = useBoxes();
  const navigate = useNavigate();

  const activeRentals = getActiveRentals();
  const history = getRentalHistory();
  const availableBoxes = boxes.filter(b => b.status === 'available');
  
  const plasticSaved = history.length * ENVIRONMENTAL_IMPACT.PLASTIC_SAVED_PER_BOX;
  const carbonReduced = history.length * ENVIRONMENTAL_IMPACT.CARBON_REDUCED_PER_BOX;

  const stats = [
    { 
      label: 'Active Rentals', 
      value: activeRentals.length, 
      icon: Package, 
      color: '#3b82f6',
      bgColor: '#dbeafe'
    },
    { 
      label: 'Available Boxes', 
      value: availableBoxes.length, 
      icon: Package, 
      color: '#16a34a',
      bgColor: '#d1fae5'
    },
    { 
      label: 'Total Returns', 
      value: history.length, 
      icon: CheckCircle, 
      color: '#8b5cf6',
      bgColor: '#ede9fe'
    },
    { 
      label: 'Plastic Saved (kg)', 
      value: plasticSaved.toFixed(1), 
      icon: TrendingUp, 
      color: '#f59e0b',
      bgColor: '#fef3c7'
    }
  ];

  return (
    <div className="dashboard-page">
      <Header />
      
      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <h2>Welcome back, {currentUser?.name}! 👋</h2>
          <p>Manage your sustainable packaging journey</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div 
                className="stat-icon" 
                style={{ backgroundColor: stat.bgColor, color: stat.color }}
              >
                <stat.icon size={28} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button
                onClick={() => navigate('/boxes')}
                className="action-btn primary"
              >
                <Package size={20} />
                Browse Boxes
              </button>
              <button
                onClick={() => navigate('/my-rentals')}
                className="action-btn secondary"
              >
                <CheckCircle size={20} />
                My Rentals
              </button>
              <button
                onClick={() => navigate('/rental-history')}
                className="action-btn tertiary"
              >
                <TrendingUp size={20} />
                View History
              </button>
            </div>
          </div>

          <div className="dashboard-card impact-card">
            <div className="impact-header">
              <Leaf size={32} color="#16a34a" />
              <h3>Environmental Impact</h3>
            </div>
            <div className="impact-stats">
              <div className="impact-stat">
                <span className="impact-label">Boxes Reused</span>
                <span className="impact-value">{history.length}</span>
              </div>
              <div className="impact-stat">
                <span className="impact-label">Plastic Saved</span>
                <span className="impact-value">{plasticSaved.toFixed(1)} kg</span>
              </div>
              <div className="impact-stat">
                <span className="impact-label">Carbon Reduced</span>
                <span className="impact-value">{carbonReduced.toFixed(1)} kg</span>
              </div>
            </div>
            <div className="impact-message">
              <p>🌱 You're making a difference! Every reusable box saves our planet.</p>
            </div>
          </div>
        </div>

        {activeRentals.length > 0 && (
          <div className="dashboard-card">
            <h3>Active Rentals</h3>
            <div className="active-rentals-list">
              {activeRentals.map(rental => {
                const box = boxes.find(b => b.id === rental.boxId);
                if (!box) return null;
                
                return (
                  <div key={rental.id} className="rental-item">
                    <span className="rental-emoji">{box.imageUrl}</span>
                    <div className="rental-info">
                      <h4>{box.name}</h4>
                      <p>Rented on {new Date(rental.rentDate).toLocaleDateString()}</p>
                    </div>
                    <span className="rental-deposit">₹{rental.deposit}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;