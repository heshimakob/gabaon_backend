// src/components/BoardingPass.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BoardingPass = ({ reservationId }) => {
  const [boardingPass, setBoardingPass] = useState(null);

  useEffect(() => {
    const fetchBoardingPass = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/embarquement/embarquement-carte/${reservationId}`);
        setBoardingPass(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchBoardingPass();
  }, [reservationId]);

  if (!boardingPass) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Carte d'Embarquement</h2>
      <p><strong>PNR:</strong> {boardingPass.PNR}</p>
      <p><strong>Vol:</strong> {boardingPass.vole.origin} - {boardingPass.vole.destination}</p>
      <p><strong>Passager:</strong> {boardingPass.user.name}</p>
      <p><strong>Portique:</strong> {boardingPass.gate}</p>
      <p><strong>Siège:</strong> {boardingPass.seat}</p>
      <h3 className="mt-4">Bagages</h3>
      <ul>
        {boardingPass.bagages.map(baggage => (
          <li key={baggage._id}>{baggage.type} - {baggage.dimensions} - {baggage.poids} kg</li>
        ))}
      </ul>
    </div>
  );
};

export default BoardingPass;
