import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

const ArmoireStatistique = () => {
  const chartData1 = {
    labels: ['Machine 1', 'Machine 2', 'Machine 3', 'Machine 4', 'Machine 5', 'Machine 6'],
    datasets: [{
      label: 'Armoire Energy Consumption (kWh)',
      data: [120, 190, 30, 50, 20, 30], // Example energy consumption data in kWh
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  const pieChartData = {
    labels: ['Machine 1', 'Machine 2', 'Machine 3', 'Machine 4', 'Machine 5'],
    datasets: [{
      label: 'Armories',
      data: [300, 200, 100, 150, 250], // Example energy consumption data in kWh
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  };

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Armoire Energy Consumption (kWh)',
      data: [650, 590, 800, 810, 560, 550, 400], // Example energy consumption data in kWh
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  };

  const doughnutChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [{
      label: 'Armories',
      data: [30, 50, 20, 30, 45], // Example energy consumption data in kWh
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper variant="outlined">
              <Box p={2}>
                <Typography variant="h6" align="center">Line Chart</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Line data={chartData1} height={200} />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined">
              <Box p={2}>
                <Typography variant="h6" align="center">Pie Chart</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Pie data={pieChartData} height={200} />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined">
              <Box p={2}>
                <Typography variant="h6" align="center">Bar Chart</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Bar data={barChartData} height={200} />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined">
              <Box p={2}>
                <Typography variant="h6" align="center">Doughnut Chart</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Doughnut data={doughnutChartData} height={200} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default ArmoireStatistique;
