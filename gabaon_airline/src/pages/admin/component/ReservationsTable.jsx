import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react'; // Utilisation de QRCodeCanvas
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    // Fetch all reservations
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reservation/all');
        setReservations(response.data);
      } catch (err) {
        console.error('Error fetching reservations:', err);
      }
    };

    fetchReservations();
  }, []);

  const handlePrint = async (reservationId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reservation/ticket/${reservationId}`);
      setSelectedReservation(response.data);
    } catch (err) {
      console.error('Error fetching ticket:', err);
    }
  };

  const handleStatusUpdate = async (reservationId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8080/api/reservation/update-status/${reservationId}`, { status: newStatus });
      setReservations(reservations.map(res => res._id === reservationId ? { ...res, status: newStatus } : res));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Liste des Réservations</h1>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 py-2">Origine</th>
            <th className="w-1/3 py-2">Destination</th>
            <th className="w-1/3 py-2">Date</th>
            <th className="w-1/3 py-2">Statut</th>
            <th className="w-1/3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td className="border px-4 py-2">{reservation.vole.origin}</td>
              <td className="border px-4 py-2">{reservation.vole.destination}</td>
              <td className="border px-4 py-2">{reservation.vole.date}</td>
              <td className="border px-4 py-2">{reservation.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handlePrint(reservation._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Imprimer
                </button>
                <button
                  onClick={() => handleStatusUpdate(reservation._id, 'nouveau statut')}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Mettre à jour le statut
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedReservation && (
        <PDFDownloadLink
          document={
            <Document>
              <Page size="A6">
                <View style={styles.section}>
                  <View style={styles.header}>
                    <Text style={styles.companyName}>Gabaon Airline</Text>
                    <Text style={styles.companyAddress}>Rd Congo Goma commune de goma</Text>
                  </View>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>PNR</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{selectedReservation.ticket.PNR}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Origine</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{selectedReservation.ticket.vole.origin}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Email</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{selectedReservation.ticket.vole.email}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Destination</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{selectedReservation.ticket.vole.destination}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Date</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{selectedReservation.ticket.vole.date}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Statut</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{selectedReservation.ticket.status}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Type de billet</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{selectedReservation.ticket.ticketType}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>QR Code</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <QRCodeCanvas value={JSON.stringify(selectedReservation.ticket)} />
                      </View>
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          }
          fileName="ticket.pdf"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Télécharger le PDF
        </PDFDownloadLink>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  section: { 
    margin: 10, 
    padding: 10, 
    flexGrow: 1 
  },
  header: {
    marginBottom: 20,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  companyAddress: {
    fontSize: 12,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
  },
});

export default ReservationsTable;
