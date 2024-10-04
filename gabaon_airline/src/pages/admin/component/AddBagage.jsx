// src/components/AddBaggage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddBaggage = ({ reservationId }) => {
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [type, setType] = useState('bagage main');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/embarquement/checkin-baggage', {
        reservationId,
        weight,
        dimensions,
        type,
      });
      alert('Bagage ajouté avec succès');
      // Reset fields
      setWeight('');
      setDimensions('');
      setType('bagage main');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'ajout du bagage');
    }
  };

  return (
    <div className='container'>
        <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-lg font-bold mb-4">Ajouter un Bagage</h2>
      <div className="mb-4">
        <label className="block mb-2">Poids (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Dimensions (L x l x H)</label>
        <input
          type="text"
          value={dimensions}
          onChange={(e) => setDimensions(e.target.value)}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Type de Bagage</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded w-full py-2 px-3"
          required
        >
          <option value="bagage main">Bagage Main</option>
          <option value="verifier">Bagage Vérifié</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4">
        Ajouter le Bagage
      </button>
    </form>
    </div>
  );
};

export default AddBaggage;
