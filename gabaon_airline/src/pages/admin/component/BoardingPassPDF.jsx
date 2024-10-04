import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 10,
    },
    header: {
        fontSize: 18,
        marginBottom: 20,
    },
    text: {
        fontSize: 12,
    },
});

const BoardingPassPDF = ({ reservation }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Carte d'embarquement</Text>
                <Text style={styles.text}>PNR: {reservation.PNR}</Text>
                <Text style={styles.text}>Vol: {reservation.vole.flightNumber}</Text>
                <Text style={styles.text}>Nom: {reservation.user.name}</Text>
                <Text style={styles.text}>Porte: {reservation.gate}</Text>
                <Text style={styles.text}>Siège: {reservation.seat}</Text>
                <Text style={styles.text}>Bagages:</Text>
                {reservation.bagages.map((bagage, index) => (
                    <Text key={index} style={styles.text}>- {bagage.type}: {bagage.poids} kg</Text>
                ))}
                <Image src={reservation.qrCodeUrl} style={{ width: 100, height: 100, marginTop: 20 }} />
            </View>
        </Page>
    </Document>
);

export default BoardingPassPDF;
