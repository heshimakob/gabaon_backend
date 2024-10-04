// src/components/ModalUpdateStatus.jsx
import React, { useState } from 'react';

const ModalUpdateStatus = ({ reservation, onUpdateStatus, onClose }) => {
  const [status, setStatus] = useState(reservation.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(reservation._id, status);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl mb-4">Modifier le statut</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2">Statut</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="input">
              <option value="payer">Payer</option>
              <option value="attente">En attente</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-4">Mettre à jour</button>
          <button type="button" onClick={onClose} className="btn btn-secondary mt-4 ml-4">Annuler</button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateStatus;
