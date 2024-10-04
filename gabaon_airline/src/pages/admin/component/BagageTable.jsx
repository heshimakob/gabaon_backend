import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import QRCode from 'qrcode.react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaPrint, FaEdit } from 'react-icons/fa';
import BoardingPassPDF from './BoardingPassPDF'; // Composant pour générer le PDF

const BagageTable = () => {
    const [bagages, setBagages] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/embarquement/all')
            .then(response => setBagages(response.data))
            .catch(error => console.error('Error fetching bagages:', error));
    }, []);

    const handlePrint = (reservationId) => {
        axios.get(`http://localhost:8080/api/embarquement/embarquement-carte/${reservationId}`)
            .then(response => setSelectedReservation(response.data))
            .catch(error => console.error('Error fetching reservation:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Bagage Table</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="w-1/4 px-4 py-2">Reservation</th>
                        <th className="w-1/4 px-4 py-2">Poids</th>
                        <th className="w-1/4 px-4 py-2">Dimensions</th>
                        <th className="w-1/4 px-4 py-2">Type</th>
                        <th className="w-1/4 px-4 py-2">Status</th>
                        <th className="w-1/4 px-4 py-2">QR Code</th>
                        <th className="w-1/4 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bagages.map(bagage => (
                        <tr key={bagage._id}>
                            <td className="border px-4 py-2">{bagage.reservation}</td>
                            <td className="border px-4 py-2">{bagage.poids}</td>
                            <td className="border px-4 py-2">{bagage.dimensions}</td>
                            <td className="border px-4 py-2">{bagage.type}</td>
                            <td className="border px-4 py-2">{bagage.status}</td>
                            <td className="border px-4 py-2">
                                {/* <QRCode value={bagage._id} size={50} /> */}
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handlePrint(bagage.reservation)}>
                                    <FaPrint />
                                </button>
                                {/* Ajouter ici le bouton pour changer le statut */}
                                <button className="ml-2">
                                    <FaEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedReservation && (
                <div className="mt-4">
                    <PDFDownloadLink
                        document={<BoardingPassPDF reservation={selectedReservation} />}
                        fileName="boarding_pass.pdf"
                        className="bg-blue-500 text-white p-2 rounded-md"
                    >
                        Imprimer la carte d'embarquement
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
};

export default BagageTable;
