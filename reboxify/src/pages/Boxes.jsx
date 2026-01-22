import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import Header from '../components/common/Header';
import Alert from '../components/common/Alert';
import { useBoxes } from '../context/BoxContext';
import { useAuth } from '../context/AuthContext';
import './Boxes.css';

const Boxes = () => {
  const { boxes, rentBox } = useBoxes();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBoxes = boxes.filter(box =>
    box.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    box.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRent = () => {
    if (!selectedBox) return;
    
    const result = rentBox(selectedBox.id);
    setAlert({ 
      type: result.success ? 'success' : 'error', 
      message: result.message 
    });
    setSelectedBox(null);
    
    if (result.success) {
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="boxes-page">
      <Header />
      
      <div className="boxes-container">
        <div className="boxes-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            <ArrowLeft size={20} />
            Back
          </button>
          <h2>Available Boxes</h2>
        </div>

        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search boxes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="boxes-grid">
          {filteredBoxes.map(box => (
            <div key={box.id} className="box-card">
              <div className="box-image">
                <span className="box-emoji">{box.imageUrl}</span>
                <span className={`box-status ${box.status}`}>
                  {box.status.toUpperCase()}
                </span>
              </div>
              <div className="box-details">
                <h3>{box.name}</h3>
                <p className="box-description">{box.description}</p>
                <div className="box-specs">
                  <div className="spec">
                    <span>Size:</span>
                    <strong>{box.size}</strong>
                  </div>
                  <div className="spec">
                    <span>Category:</span>
                    <strong>{box.category}</strong>
                  </div>
                  <div className="spec">
                    <span>Deposit:</span>
                    <strong className="price">₹{box.deposit}</strong>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBox(box)}
                  disabled={box.status !== 'available'}
                  className="rent-btn"
                >
                  {box.status === 'available' ? 'Rent Now' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedBox && (
          <div className="modal-overlay" onClick={() => setSelectedBox(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Confirm Rental</h3>
              <p>
                Are you sure you want to rent <strong>{selectedBox.name}</strong> for 
                a deposit of <strong>₹{selectedBox.deposit}</strong>?
              </p>
              <div className="rental-info">
                <p>Your current balance: <strong>₹{currentUser?.wallet}</strong></p>
                {currentUser && currentUser.wallet < selectedBox.deposit && (
                  <p className="insufficient-balance">Insufficient balance!</p>
                )}
              </div>
              <div className="modal-actions">
                <button onClick={handleRent} className="btn-confirm">
                  Confirm
                </button>
                <button onClick={() => setSelectedBox(null)} className="btn-cancel">
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

export default Boxes;