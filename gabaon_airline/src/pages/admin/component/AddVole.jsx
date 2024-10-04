// src/components/AddVole.jsx
import React, { useState } from 'react';

const AddVole = ({ onAddVole }) => {
  const [vole, setVole] = useState({
    origin: '',
    destination: '',
    heureDepart: '',
    heureArriver: '',
    date: '',
    typeAvion: '',
    capacite: 0,
    poidEco: 0,
    poidFirst: 0,
    poidsBusiness: 0,
    fareEco: 0,
    fareFirst: 0,
    fareBusiness: 0,
    taxeTouristique: 0,
    rqTaxe: 0,
    rsTaxe: 0,
    rvTaxe: 0,
    tvTaxe: 0,
    prix: 0,
  });

  const handleChange = (e) => {
    setVole({ ...vole, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddVole(vole);
    setVole({
      origin: '',
      destination: '',
      heureDepart: '',
      heureArriver: '',
      date: '',
      typeAvion: '',
      capacite: 0,
      poidEco: 0,
      poidFirst: 0,
      poidsBusiness: 0,
      fareEco: 0,
      fareFirst: 0,
      fareBusiness: 0,
      taxeTouristique: 0,
      rqTaxe: 0,
      rsTaxe: 0,
      rvTaxe: 0,
      tvTaxe: 0,
      prix: 0,
    });
  };

  return (
   <div className='border border-gray-300 rounded-xl p-5 mb-10'>
     <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="origin" required value={vole.origin} onChange={handleChange} placeholder="Origin" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="text" name="destination" value={vole.destination} onChange={handleChange} placeholder="Destination" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="datetime-local" name="heureDepart" value={vole.heureDepart} onChange={handleChange} className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="datetime-local" name="heureArriver" value={vole.heureArriver} onChange={handleChange} className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="date" name="date" value={vole.date} onChange={handleChange} className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="text" name="typeAvion" value={vole.typeAvion} onChange={handleChange} placeholder="Type Avion" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="capacite" value={vole.capacite} onChange={handleChange} placeholder="Capacité" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="poidEco" value={vole.poidEco} onChange={handleChange} placeholder="Poids Eco" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="poidFirst" value={vole.poidFirst} onChange={handleChange} placeholder="Poids First" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="poidsBusiness" value={vole.poidsBusiness} onChange={handleChange} placeholder="Poids Business" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="fareEco" value={vole.fareEco} onChange={handleChange} placeholder="Fare Eco" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="fareFirst" value={vole.fareFirst} onChange={handleChange} placeholder="Fare First" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="fareBusiness" value={vole.fareBusiness} onChange={handleChange} placeholder="Fare Business" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="taxeTouristique" value={vole.taxeTouristique} onChange={handleChange} placeholder="Taxe Touristique" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="rqTaxe" value={vole.rqTaxe} onChange={handleChange} placeholder="RQ Taxe" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="rsTaxe" value={vole.rsTaxe} onChange={handleChange} placeholder="RS Taxe" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="rvTaxe" value={vole.rvTaxe} onChange={handleChange} placeholder="RV Taxe" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" name="tvTaxe" value={vole.tvTaxe} onChange={handleChange} placeholder="TV Taxe" className="input p-3 mb-6 border border-gray-200 rounded-md" />
        <input type="number" required name="prix" value={vole.prix} onChange={handleChange} placeholder="Prix" className="input p-3 mb-6 border border-gray-200 rounded-md" />
      </div>
      <button type="submit" className="bg-blue-700 text-white p-3 mt-10  mb-10 rounded-xl">Ajouter Vole</button>
    </form>
   </div>
  );
};

export default AddVole;
