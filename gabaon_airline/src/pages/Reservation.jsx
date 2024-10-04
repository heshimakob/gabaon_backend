// import React from 'react'
// import NavBar from '../component/NavBar'

// const Reservation = () => {
//   return (
//  <>
//  <NavBar/>
//  <div>

//  </div>
//  </>
//   )
// }

// export default Reservation
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../component/NavBar';
import swal from "sweetalert";

const Reservation = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [voleId, setVoleId] = useState('');
  const [ticketType, setTicketType] = useState('economie');
  const [ticket, setTicket] = useState('aller-simple');
  const [voles, setVoles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/vole').then(response => {
      setVoles(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/reservation/create', {
        name,
        email,
        voleId,
        ticketType,
        ticket
      });
      swal("Reservation", "Reservation envoyer consulte ton mail!", "Success");
      console.log('Reservation added:', response.data);
    } catch (err) {
      console.error('Error adding reservation:', err);
    }
  };

  return (
  <>
  <NavBar/>
  <div className="max-w-md mx-auto mt-32">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-6">Add Reservation</h2>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Vole</label>
          <select
            value={voleId}
            onChange={(e) => setVoleId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a Vole</option>
            {voles.map((vole) => (
              <option key={vole._id} value={vole._id}>
                {vole.origin} to {vole.destination}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ticket Type</label>
          <select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="economie">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ticket</label>
          <select
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="aller-simple">Aller-simple</option>
            <option value="aller-retour">Aller-retour</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Reservation</button>
      </form>
    </div>
  </>
  );
};

export default Reservation;

