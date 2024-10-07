// BoardingPassPDF.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
  },
});

const BoardingPassPDF = ({ reservation }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Carte d'Embarquement</Text>
        <Text style={styles.text}><strong>PNR:</strong> {reservation.PNR}</Text>
        <Text style={styles.text}><strong>Vol:</strong> {reservation.vole.origin} - {reservation.vole.destination}</Text>
        <Text style={styles.text}><strong>Passager:</strong> {reservation.user.name}</Text>
        <Text style={styles.text}><strong>Portique:</strong> {reservation.gate}</Text>
        <Text style={styles.text}><strong>Siège:</strong> {reservation.seat}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Bagages</Text>
        {reservation.bagages.map(baggage => (
          <Text style={styles.text} key={baggage._id}>
            {baggage.type} - {baggage.dimensions} - {baggage.poids} kg
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default BoardingPassPDF;
