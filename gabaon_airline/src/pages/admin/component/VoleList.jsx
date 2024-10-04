// src/components/VolesList.jsx
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const VoleList = ({ voles, onEdit, onDelete }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>Origin</th>
          <th>Destination</th>
          <th>Heure de Départ</th>
          <th>Heure d'Arrivée</th>
          <th>Date</th>
          <th>Type d'Avion</th>
          <th>Capacité</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {voles.map((vole) => (
          <tr key={vole._id}>
            <td>{vole.origin}</td>
            <td>{vole.destination}</td>
            <td>{new Date(vole.heureDepart).toLocaleString()}</td>
            <td>{new Date(vole.heureArriver).toLocaleString()}</td>
            <td>{new Date(vole.date).toLocaleDateString()}</td>
            <td>{vole.typeAvion}</td>
            <td>{vole.capacite}</td>
            <td>
              <button onClick={() => onEdit(vole)} className="text-blue-500 mr-2">
                <FaEdit />
              </button>
              <button onClick={() => onDelete(vole._id)} className="text-red-500">
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VoleList;

