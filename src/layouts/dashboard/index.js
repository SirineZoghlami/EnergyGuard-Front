import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [latestData, setLatestData] = useState({});
  const [debitData, setDebitData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/air_consomglobal");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const latestEntry = data[data.length - 1];
      setLatestData(latestEntry);
      const formattedData = data.map(entry => ({
        hour: entry.heure_de_fonction,
        debit: entry.debit_de_production_air,
        compressor: Math.floor(Math.random() * 3) + 1  // Randomly assign compressors 1, 2, or 3
      }));
      setDebitData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { pression_1, heurefonction, pression_2, temperature, pointderose, tauxdecharge, debit_de_production_air } = latestData;
  const todayDate = new Date().toLocaleDateString();

  // Filter data for compressors 1, 2, and 3
  const compressor1Data = debitData.filter(entry => entry.compressor === 1);
  const compressor2Data = debitData.filter(entry => entry.compressor === 2);
  const compressor3Data = debitData.filter(entry => entry.compressor === 3);

  // Calculate total debit for each compressor
  const totalDebitCompressor1 = compressor1Data.reduce((acc, entry) => acc + entry.debit, 0);
  const totalDebitCompressor2 = compressor2Data.reduce((acc, entry) => acc + entry.debit, 0);
  const totalDebitCompressor3 = compressor3Data.reduce((acc, entry) => acc + entry.debit, 0);

  const pieChartData = [
    { name: "Compressor 1", value: totalDebitCompressor1 },
    { name: "Compressor 2", value: totalDebitCompressor2 },
    { name: "Compressor 3", value: totalDebitCompressor3 }
  ];

  return (
    <DashboardLayout pageTitle="Bilan Journalier - Local Globale">
      <DashboardNavbar pageTitle="Bilan Journalier - Local Globale" />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {/* Your MiniStatisticsCard components here */}
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <h3>Information Génerale</h3>
          <br />
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Journée</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Pression 1</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Heure de fonction</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Pression 2</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Température</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Point de rosée</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Taux de charge</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Débit</th>
              </tr>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}></th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>unité</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>unité</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>unité</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>unité</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>unité</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>unité</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>unité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{todayDate}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{pression_1}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{heurefonction}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{pression_2}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{temperature}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{pointderose}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{tauxdecharge}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{debit_de_production_air}</td>
              </tr>
            </tbody>
          </table>
        </SoftBox>
        
        <SoftBox>
          <h3>Detail Global</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={debitData} margin={{ top: 50, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey="hour" label={{ value: 'Heure de fonction', position: 'insideBottom', offset: -10 }} />
              <YAxis label={{ value: 'Débit (m³/h)', angle: -90, position: 'insideLeft', offset: -10 }} />
              <Tooltip formatter={(value, name, props) => [`${value} m³/h`, 'Débit']} />
              <Line type="monotone" dataKey="debit" stroke="#3f51b5" strokeWidth={2} dot={{ stroke: '#3f51b5', strokeWidth: 2, r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
         
        </SoftBox>
        
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
