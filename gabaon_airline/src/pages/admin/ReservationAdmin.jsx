// src/components/ReservationAdmin.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReservationList from './component/ReservationList';
import ModalUpdateStatus from './component/ModalUpdateStatus';
import Sidebar from './SideBar';
import TicketComponent from './component/TicketComponent';
import { useReactToPrint } from 'react-to-print';
import ReservationsTable from './component/ReservationsTable';
import { MdGridView } from 'react-icons/md';
import { FaList } from 'react-icons/fa';
import Tabs from "../../component/Tabs"
import Reservation from "../Reservation"
const TABS = [
  { title: "liste reservation", icon: <MdGridView /> },
  { title: "faire une reservation", icon: <FaList /> },
];

const ReservationAdmin = () => {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const ticketRef = useRef();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/reservation/all');
      setReservations(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = (reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleStatusUpdate = async (reservationId, status) => {
    try {
      const response = await axios.patch(`http://localhost:8080/api/reservation/status/${reservationId}/`, { status });
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === reservationId ? response.data : reservation
        )
      );
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateTicket = async (reservationId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reservation/ticket/${reservationId}`);
      const ticketInfo = response.data;
      setSelectedReservation(ticketInfo);

      // Wait for the state update to complete
      setTimeout(() => {
        if (ticketRef.current) {
          handlePrint();
        }
      }, 0);

    } catch (err) {
      console.error(err);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => ticketRef.current,
    documentTitle: 'ticket',
  });

  return (
    <>
      <Sidebar />
      <div className="container mx-auto p-4">

      <div className='container mb-20'>
<Tabs tabs={TABS} setSelected={setSelected}>
    

    {selected !== 1 ? (
    <ReservationsTable/>
    ) : (
      <div className='w-full'>
        <Reservation/>
      </div>
    )}
  </Tabs>
</div>





        {/* <h1 className="text-2xl mb-4">Liste des Réservations</h1>
        <ReservationList
          reservations={reservations}
          onUpdateStatus={handleUpdateStatus}
          onGenerateTicket={handleGenerateTicket}
        />
        {showModal && (
          <ModalUpdateStatus
            reservation={selectedReservation}
            onUpdateStatus={handleStatusUpdate}
            onClose={() => setShowModal(false)}
          />
        )}
        <div style={{ display: 'none' }}>
          {selectedReservation && (
            <TicketComponent ref={ticketRef} ticketInfo={selectedReservation} />
          )}
        </div> */}
      </div>
    </>
  );
};

export default ReservationAdmin;
