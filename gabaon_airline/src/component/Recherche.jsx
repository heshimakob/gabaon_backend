import React, { useState, useEffect } from 'react';
import avion from "../assets/avion.jpg";

const Recherche = () => {
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch origins and destinations from the API
    const fetchOriginsAndDestinations = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/vole/origins-destinations');
        const data = await response.json();
        setOrigins(data.origins);
        setDestinations(data.destinations);
      } catch (err) {
        console.error('Error fetching origins and destinations:', err);
      }
    };

    fetchOriginsAndDestinations();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/vole/search?origin=${origin}&destination=${destination}&date=${date}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className='h-screen pt-16 lg:pt-32 pb-24 lg:pb-52 bg-gray-900 overflow-hidden md:h-auto sm:h-auto items-center justify-center' style={{
      backgroundImage: `url(${avion})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="flex items-center justify-center mt-32 max-h-max"> 
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Recherche de Vols</h1>
          <div className="flex space-x-2 mb-4">
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Sélectionner l'origine</option>
              {origins.map((origin) => (
                <option key={origin} value={origin}>
                  {origin}
                </option>
              ))}
            </select>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Sélectionner la destination</option>
              {destinations.map((destination) => (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Rechercher
            </button>
          </div>
          {results.length > 0 && (
            <div className='bg-blue-900 text-white'>
              <h2 className="text-xl font-semibold mb-2">Résultats de la Recherche</h2>
              <ul>
                {results.map((vole) => (
                  <li key={vole._id} className="border-b border-gray-200 py-2">
                    {`Origine: ${vole.origin}, Destination: ${vole.destination}, Date: ${vole.date}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recherche;
