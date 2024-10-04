import React, { useState } from 'react';
import axios from 'axios';

const BagageModal = ({ reservationId, onClose, onRefresh }) => {
  const [poids, setPoids] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [type, setType] = useState('bagage main');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/embarquement/checkin-baggage', {
        reservationId,
        poids,
        dimensions,
        type,
      });
      onRefresh(); // Refresh the reservations
      onClose(); // Close the modal
    } catch (err) {
      console.error('Error adding bagage:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Ajouter un Bagage</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Poids (kg):</label>
            <input
              type="number"
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Dimensions:</label>
            <input
              type="text"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="bagage main">Bagage Main</option>
              <option value="verifier">Vérifier</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Ajouter</button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Annuler</button>
        </form>
      </div>
    </div>
  );
};

export default BagageModal;
