import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Snackbar, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import { Bar, Pie, Line } from 'react-chartjs-2';

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [formData, setFormData] = useState({
    production: '',
    interfaceweb: '',
    saisie_prodautomatique: '',
    objectif_khw_t: '',
    energie_nominal: '5',
    indicateur_cible_kwh_t: '',
    indicateur_cible_kwh_km: '',
    adressip: '',
    nom: '',
    isactive: '',
    dossier: '',
    dossierprod: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/machines');
      setMachines(response.data.map(({ _id, ...rest }) => ({ _id, ...rest })));
    } catch (error) {
      setError('Error fetching machines.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this machine?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/machines/${id}`);
        setMachines(machines.filter(machine => machine._id !== id));
        setSnackbarMessage('Machine deleted successfully.');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error deleting machine:', error);
        setSnackbarMessage('Error deleting machine.');
        setSnackbarOpen(true);
      }
    }
  };

  const handleModify = (machine) => {
    setSelectedMachine(machine);
    setFormData(machine);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMachine(null);
    setFormData({ ...formData, energie_nominal: '5' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/machines/${selectedMachine._id}`, formData);
      handleCloseDialog();
      fetchMachines();
      setSnackbarMessage('Machine updated successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating machine:', error);
      setSnackbarMessage('Error updating machine.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const chartData1 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Armoire Energie Consumption (kWh)',
      data: [120, 190, 30, 50, 20, 30], // Example air consumption data in kWh
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
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [{
      label: 'Armories',
      data: [300, 200, 100, 150, 250], // Example air consumption data in kWh
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

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Armoire Energie Consumption (kWh)',
      data: [650, 590, 800, 810, 560, 550, 400], // Example air consumption data in kWh
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1
    }]
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box mb={3}>
          <Link to="/machines/add" style={{ textDecoration: 'none', marginBottom: '25px' }}>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add a Machine
            </Button>
          </Link>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box mb={3}>
                <Typography variant="h5">Bar Chart</Typography>
                <Bar data={chartData1} />
              </Box>
            </Grid>
            <Grid item xs={12} md={2}> {/* Adjusted md prop from 4 to 3 */}
              <Box mb={5}>
                <Typography variant="h6">Pie Chart</Typography>
                <Pie data={pieChartData} />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}> {/* Adjusted md prop from 4 to 3 */}
              <Box mb={3}>
                <Typography variant="h5">Line Chart</Typography>
                <Line data={lineChartData} />
              </Box>
            </Grid>
          </Grid>
          {machines.map(machine => (
            <Card key={machine._id} sx={{ marginBottom: '10px', borderRadius: '10px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {Object.entries(machine)
                    .filter(([key]) => key !== '__v')
                    .map(([key, value], index) => (
                      <li key={index} style={{ marginBottom: '5px' }}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                </ul>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleModify(machine)}
                    sx={{ marginRight: '20px', backgroundColor: '#1976d2', color: '#fff' }}
                  >
                    Modify
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(machine._id)}
                    sx={{ backgroundColor: '#f44336', color: '#fff' }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
      <Footer />
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="lg">
        <DialogTitle>Edit Machine</DialogTitle>
        <DialogContent>
          {Object.entries(formData).map(([key, value], index) => (
            <Box key={index} sx={{ marginBottom: '30px' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {key.split('_').join(' ')}
              </Typography>
              <TextField
                name={key}
                value={value}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                placeholder={`Enter ${key.split('_').join(' ')}`}
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleFormSubmit} color="primary" variant="contained">
            Modify
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </DashboardLayout>
  );
};

export default MachineList;
