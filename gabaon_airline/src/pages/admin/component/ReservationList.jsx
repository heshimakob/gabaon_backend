// src/components/ReservationsList.jsx
import React from 'react';
import { FaEdit, FaTicketAlt } from 'react-icons/fa';

const ReservationList = ({ reservations, onUpdateStatus, onGenerateTicket }) => {
  if (!Array.isArray(reservations)) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Vol</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation._id}>
            {/* <td>{reservation.user.email}</td> */}
            <td>{reservation.vole.origin} - {reservation.vole.destination}</td>
            <td>{reservation.status}</td>
            <td>
              <button onClick={() => onUpdateStatus(reservation)} className="text-blue-500 mr-2">
                <FaEdit />
              </button>
              <button onClick={() => onGenerateTicket(reservation._id)} className="text-green-500">
                <FaTicketAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservationList;
