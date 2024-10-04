// src/pages/TicketPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TicketPage = () => {
  const { reservationId } = useParams();
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reservation/ticket/${reservationId}`);
        setTicketInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTicketInfo();
  }, [reservationId]);

  if (!ticketInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Billet Électronique</h1>
      <p><strong>Nom:</strong> {ticketInfo.reservation.user.name}</p>
      <p><strong>Vol:</strong> {ticketInfo.reservation.vole.origin} - {ticketInfo.reservation.vole.destination}</p>
      <p><strong>Statut:</strong> {ticketInfo.reservation.status}</p>
      <img src={ticketInfo.qrCodeUrl} alt="QR Code" />
    </div>
  );
};

export default TicketPage;
