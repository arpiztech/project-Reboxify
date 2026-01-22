import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import Header from '../components/common/Header';
import { useBoxes } from '../context/BoxContext';
import './RentalHistory.css';

const RentalHistory = () => {
  const { boxes, getRentalHistory } = useBoxes();
  const navigate = useNavigate();
  const history = getRentalHistory();

  return (
    <div className="history-page">
      <Header />
      
      <div className="history-container">
        <div className="history-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            <ArrowLeft size={20} />
            Back
          </button>
          <h2>Rental History</h2>
        </div>

        {history.length === 0 ? (
          <div className="empty-state">
            <Package size={64} className="empty-icon" />
            <h3>No History Yet</h3>
            <p>Your rental history will appear here once you return boxes.</p>
          </div>
        ) : (
          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Box</th>
                  <th>Rented On</th>
                  <th>Returned On</th>
                  <th>Condition</th>
                  <th>Deposit</th>
                </tr>
              </thead>
              <tbody>
                {history.map(rental => {
                  const box = boxes.find(b => b.id === rental.boxId);
                  if (!box) return null;

                  return (
                    <tr key={rental.id}>
                      <td>
                        <div className="box-info">
                          <span className="box-icon">{box.imageUrl}</span>
                          <strong>{box.name}</strong>
                        </div>
                      </td>
                      <td>{new Date(rental.rentDate).toLocaleDateString()}</td>
                      <td>{rental.returnDate ? new Date(rental.returnDate).toLocaleDateString() : '-'}</td>
                      <td>
                        <span className={`condition-badge ${rental.returnCondition}`}>
                          {rental.returnCondition?.toUpperCase()}
                        </span>
                      </td>
                      <td className="deposit">₹{rental.deposit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalHistory;