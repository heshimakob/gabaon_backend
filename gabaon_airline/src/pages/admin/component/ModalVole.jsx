// src/components/ModalVole.jsx
import React, { useState } from 'react';

const ModalVole = ({ vole, onUpdateVole, onClose }) => {
  const [updatedVole, setUpdatedVole] = useState({ ...vole });

  const handleChange = (e) => {
    setUpdatedVole({ ...updatedVole, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateVole(updatedVole);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl mb-4">Modifier Vole</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="origin" value={updatedVole.origin} onChange={handleChange} placeholder="Origin" className="input" />
            <input type="text" name="destination" value={updatedVole.destination} onChange={handleChange} placeholder="Destination" className="input" />
            <input type="datetime-local" name="heureDepart" value={updatedVole.heureDepart} onChange={handleChange} className="input" />
            <input type="datetime-local" name="heureArriver" value={updatedVole.heureArriver} onChange={handleChange} className="input" />
            <input type="date" name="date" value={updatedVole.date} onChange={handleChange} className="input" />
            <input type="text" name="typeAvion" value={updatedVole.typeAvion} onChange={handleChange} placeholder="Type Avion" className="input" />
            <input type="number" name="capacite" value={updatedVole.capacite} onChange={handleChange} placeholder="Capacité" className="input" />
            <input type="number" name="poidEco" value={updatedVole.poidEco} onChange={handleChange} placeholder="Poids Eco" className="input" />
            <input type="number" name="poidFirst" value={updatedVole.poidFirst} onChange={handleChange} placeholder="Poids First" className="input" />
            <input type="number" name="poidsBusiness" value={updatedVole.poidsBusiness} onChange={handleChange} placeholder="Poids Business" className="input" />
            <input type="number" name="fareEco" value={updatedVole.fareEco} onChange={handleChange} placeholder="Fare Eco" className="input" />
            <input type="number" name="fareFirst" value={updatedVole.fareFirst} onChange={handleChange} placeholder="Fare First" className="input" />
            <input type="number" name="fareBusiness" value={updatedVole.fareBusiness} onChange={handleChange} placeholder="Fare Business" className="input" />
            <input type="number" name="taxeTouristique" value={updatedVole.taxeTouristique} onChange={handleChange} placeholder="Taxe Touristique" className="input" />
            <input type="number" name="rqTaxe" value={updatedVole.rqTaxe} onChange={handleChange} placeholder="RQ Taxe" className="input" />
            <input type="number" name="rsTaxe" value={updatedVole.rsTaxe} onChange={handleChange} placeholder="RS Taxe" className="input" />
            <input type="number" name="rvTaxe" value={updatedVole.rvTaxe} onChange={handleChange} placeholder="RV Taxe" className="input" />
            <input type="number" name="tvTaxe" value={updatedVole.tvTaxe} onChange={handleChange} placeholder="TV Taxe" className="input" />
            <input type="number" name="prix" value={updatedVole.prix} onChange={handleChange} placeholder="Prix" className="input" />
          </div>
          <button type="submit" className="btn btn-primary mt-4">Mettre à jour</button>
          <button type="button" onClick={onClose} className="btn btn-secondary mt-4 ml-4">Annuler</button>
        </form>
      </div>
    </div>
  );
};

export default ModalVole;
