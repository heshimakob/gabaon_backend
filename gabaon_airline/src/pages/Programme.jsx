import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../component/NavBar';

const Programme = () => {
  const [voles, setVoles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/vole')
      .then(response => {
        setVoles(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
   <>
   <NavBar/>
   <div className="container mx-auto p-4 mt-32">
      <h1 className="text-3xl font-bold mb-4">Nos vols disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {voles.map(vole => (
          <div key={vole._id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">
              {vole.origin} to {vole.destination}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-gray-600">Departure:</p>
                <p>{vole.heureDepart ? vole.heureDepart.toLocaleString() : 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Arrival:</p>
                <p>{vole.heureArriver ? vole.heureArriver.toLocaleString() : 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Date:</p>
                <p>{vole.date ? vole.date.toLocaleString() : 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Aircraft:</p>
                <p>{vole.typeAvion}</p>
              </div>
              <div>
                <p className="text-gray-600">Capacity:</p>
                <p>{vole.capacite}</p>
              </div>
              <div>
                <p className="text-gray-600">Economy:</p>
                <p>{vole.fareEco} €</p>
              </div>
              <div>
                <p className="text-gray-600">First Class:</p>
                <p>{vole.fareFirst} €</p>
              </div>
              <div>
                <p className="text-gray-600">Business:</p>
                <p>{vole.fareBusiness} €</p>
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <p className="text-gray-600">Taxes:</p>
              <ul className="list-disc list-inside">
                {vole.taxeTouristique > 0 && <li>Tourist Tax: {vole.taxeTouristique} €</li>}
                {vole.rqTaxe > 0 && <li>RQ Tax: {vole.rqTaxe} €</li>}
                {vole.rsTaxe > 0 && <li>RS Tax: {vole.rsTaxe} €</li>}
                {vole.rvTaxe > 0 && <li>RV Tax: {vole.rvTaxe} €</li>}
                {vole.tvTaxe > 0 && <li>TV Tax: {vole.tvTaxe} €</li>}
              </ul>
            </div>
            <p className="text-lg font-semibold mt-4">Total Price: {vole.prix} €</p>
          </div>
        ))}
      </div>
    </div>
   </>
  );
};

export default Programme;