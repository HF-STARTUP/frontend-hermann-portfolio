"use client";

import React from "react";
import {AdminDataTableDisplayProps} from "@/types/dataDisplayTable";
import AdminTableDisplayData from "@/components/display/AdminTableDisplayData";
import {useRequestAccounting} from "@/hooks/acounting/useAcounting";
import {AccountingModel} from "@/model/accounting/Accounting";
import Loading from "@/components/ui/Loader";
import {Document, Page, PDFDownloadLink, StyleSheet, Text, View} from '@react-pdf/renderer';


export type ReceiptProps = {
    date: string,
    username: string,
    receipt: string,
    coutPanne: string,
    objectif: string,
    ecart: string
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});


const MyDocument = ({data}: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                {data.head.map((header: any, index: number) => (
                    <Text key={index}>{header}</Text>
                ))}
            </View>
            {data.body.map((row: any, index: any) => (
                <View key={index} style={styles.section}>
                    {row.map((cell: any, idx: any) => (
                        <Text key={idx}>{cell}</Text>
                    ))}
                </View>
            ))}
        </Page>
    </Document>
);

const DownloadPdf = ({data}: { data: any }) => (
    <PDFDownloadLink document={<MyDocument data={data}/>} fileName="receipts.pdf">
        {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
);


const ReceiptsContent: React.FC = () => {

    const {data: accountings, isLoading} = useRequestAccounting()
    const [tablesDatas, setTableData] = React.useState<AccountingModel[]>()

    const statusAccountsDisplay: AdminDataTableDisplayProps = {
        head: [
            'Date',
            'Nom du chauffeur',
            'Recette',
            'Coût panne',
            'Objectif',
            'Ecart',
            'Marque de véhicule',
            'Marque de véhicule',
            'Marque de véhicule',
            'Marque de véhicule',
            'Marque de véhicule',
            'Marque de véhicule',
            'Marque de véhicule',
            'Marque de véhicule',
            'Marque de véhicule',
            'Marque de véhicule',
            'Modèle du véhicule'
        ],
        body: accountings?.map((r) => [
            r.creatingAt,
            r.driverName,
            '' + r.recette,
            '' + r.objective,
            '' + r.objective,
            '' + r.ecart,
            '' + r.vehicleBrand,
            '' + r.vehicleBrand,
            '' + r.vehicleBrand,
            '' + r.vehicleBrand,
            '' + r.vehicleBrand,
            '' + r.vehicleBrand,
            '' + r.vehicleBrand,
            '' + r.vehicleBrand,
            '' + r.vehicleModel
        ]),
        footer: ['Total', '-',
            '' + accountings?.reduce((s, v) => s + (v.recette || 0), 0),
            '' + accountings?.reduce((s, v) => s + (v.objective || 0), 0),
            '' + accountings?.reduce((s, v) => s + (v.objective || 0), 0),
            '' + accountings?.reduce((s, v) => s + (v.ecart || 0), 0),
            '-',
            '-'
        ]
    }


    if (isLoading) {

        return (
            <div>
                <Loading/>
            </div>
        )
    }

    if (accountings?.length) {
        return (
            <div>
                <AdminTableDisplayData data={statusAccountsDisplay}/>
                <DownloadPdfButton data={statusAccountsDisplay}/>
            </div>
        )
    }
}


const DownloadPdfButton = ({data}: { data: any }) => (
    <PDFDownloadLink document={<MyDocument data={data}/>} fileName="receipts.pdf">
        {({blob, url, loading, error}) =>
            loading ? (
                'Loading document...'
            ) : (
                // <button style={{padding: '10px', fontSize: '16px', backgroundColor: 'blue', color: 'white'}}>
                //     Download now!
                // </button>
                <div></div>
            )
        }
    </PDFDownloadLink>
);

export default ReceiptsContent
