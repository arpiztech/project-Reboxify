import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, CheckCircle, XCircle } from 'lucide-react';
import Header from '../components/common/Header';
import Alert from '../components/common/Alert';
import { useBoxes } from '../context/BoxContext';
import './MyRentals.css';

const MyRentals = () => {
  const { boxes, getActiveRentals, returnBox } = useBoxes();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [selectedRental, setSelectedRental] = useState(null);
  const [returnCondition, setReturnCondition] = useState('good');

  const activeRentals = getActiveRentals();

  const handleReturn = () => {
    if (!selectedRental) return;
    
    const result = returnBox(selectedRental.id, returnCondition);
    setAlert({ 
      type: result.success ? 'success' : 'error', 
      message: result.success ? `${result.message}. Refund: ₹${result.refund}` : result.message 
    });
    setSelectedRental(null);
    
    if (result.success) {
      setTimeout(() => setAlert(null), 5000);
    }
  };

  return (
    <div className="rentals-page">
      <Header />
      
      <div className="rentals-container">
        <div className="rentals-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            <ArrowLeft size={20} />
            Back
          </button>
          <h2>My Active Rentals</h2>
        </div>

        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        {activeRentals.length === 0 ? (
          <div className="empty-state">
            <Package size={64} className="empty-icon" />
            <h3>No Active Rentals</h3>
            <p>You don't have any boxes rented at the moment.</p>
            <button onClick={() => navigate('/boxes')} className="browse-btn">
              Browse Boxes
            </button>
          </div>
        ) : (
          <div className="rentals-grid">
            {activeRentals.map(rental => {
              const box = boxes.find(b => b.id === rental.boxId);
              if (!box) return null;

              return (
                <div key={rental.id} className="rental-card">
                  <div className="rental-header">
                    <span className="rental-emoji">{box.imageUrl}</span>
                    <span className="rental-badge active">ACTIVE</span>
                  </div>
                  <div className="rental-content">
                    <h3>{box.name}</h3>
                    <div className="rental-specs">
                      <div className="rental-spec">
                        <span>Rented On:</span>
                        <strong>{new Date(rental.rentDate).toLocaleDateString()}</strong>
                      </div>
                      <div className="rental-spec">
                        <span>Deposit:</span>
                        <strong className="price">₹{rental.deposit}</strong>
                      </div>
                      <div className="rental-spec">
                        <span>Size:</span>
                        <strong>{box.size}</strong>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedRental(rental)}
                      className="return-btn"
                    >
                      Return Box
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedRental && (
          <div className="modal-overlay" onClick={() => setSelectedRental(null)}>
            <div className="modal return-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Return Box</h3>
              <p>Please select the condition of the box:</p>
              
              <div className="condition-options">
                <label className={`condition-option ${returnCondition === 'good' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="condition"
                    value="good"
                    checked={returnCondition === 'good'}
                    onChange={(e) => setReturnCondition(e.target.value)}
                  />
                  <div className="option-content">
                    <CheckCircle size={24} className="icon-good" />
                    <div>
                      <strong>Good Condition</strong>
                      <p>Full refund: ₹{selectedRental.deposit}</p>
                    </div>
                  </div>
                </label>

                <label className={`condition-option ${returnCondition === 'damaged' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="condition"
                    value="damaged"
                    checked={returnCondition === 'damaged'}
                    onChange={(e) => setReturnCondition(e.target.value)}
                  />
                  <div className="option-content">
                    <XCircle size={24} className="icon-damaged" />
                    <div>
                      <strong>Damaged</strong>
                      <p>80% refund: ₹{(selectedRental.deposit * 0.8).toFixed(0)}</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="modal-actions">
                <button onClick={handleReturn} className="btn-confirm">
                  Confirm Return
                </button>
                <button onClick={() => setSelectedRental(null)} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRentals;