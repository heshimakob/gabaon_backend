// src/components/TicketComponent.jsx
// import React from 'react';
// import { QRCode } from 'qrcode.react';

// const TicketComponent = ({ ticketInfo }) => {
//   return (
//     <div id="ticket">
//       <h1>Billet Électronique</h1>
//       <p><strong>Nom:</strong> {ticketInfo.reservation.user.name}</p>
//       <p><strong>Vol:</strong> {ticketInfo.reservation.vole.origin} - {ticketInfo.reservation.vole.destination}</p>
//       <p><strong>Statut:</strong> {ticketInfo.reservation.status}</p>
//       <div id="qrCode">
//         <QRCode value={`http://localhost:8080/api/reservation/${ticketInfo.reservation._id}`} />
//       </div>
//     </div>
//   );
// };

// export default TicketComponent;


// src/components/TicketComponent.jsx
// src/components/TicketComponent.jsx
import React, { forwardRef } from 'react';
// import QRCode from 'qrcode.react';

const TicketComponent = forwardRef(({ ticketInfo }, ref) => {
  return (
    <div ref={ref}>
      <h1>Billet Électronique</h1>
      <p><strong>Nom:</strong> {ticketInfo.reservation.user.name}</p>
      <p><strong>Vol:</strong> {ticketInfo.reservation.vole.origin} - {ticketInfo.reservation.vole.destination}</p>
      <p><strong>Statut:</strong> {ticketInfo.reservation.status}</p>
      <div id="qrCode">
        <QRCode value={`http://localhost:8080/api/reservations/${ticketInfo.reservation._id}`} />
      </div>
    </div>
  );
});

export default TicketComponent;



