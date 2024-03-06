import React, { useState, useEffect } from 'react';
import { Card, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import axios from 'axios';

const MachineList = () => {
  const [machines, setMachines] = useState([]);
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
    __v: '0',
  });

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/machines');
      setMachines(response.data.map(({ _id, name, ...rest }) => ({ _id, name, ...rest })));
    } catch (error) {
      console.error('Error fetching machines:', error);
      setMachines([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this machine?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/machines/${id}`);
        setMachines(machines.filter(machine => machine._id !== id));
      } catch (error) {
        console.error('Error deleting machine:', error);
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
    setFormData({
      ...formData,
      energie_nominal: '5', // Reset energie_nominal to default value
    });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/machines/${selectedMachine._id}`, formData);
      handleCloseDialog();
      fetchMachines(); // Refresh machine list after modification
      alert('Machine updated successfully.');
    } catch (error) {
      console.error('Error updating machine:', error);
      alert('An error occurred while updating the machine. Please try again later.');
    }
  };

  const renderMachine = (machine) => (
    <Card key={machine._id} sx={{ marginBottom: '10px', borderRadius: '10px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
        <Box flex={1}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {Object.entries(machine)
              .filter(([key]) => !key.toLowerCase().includes('id'))
              .map(([key, value], index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
          </ul>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleModify(machine)}
            sx={{ marginRight: '20px' }}
          >
            Modifier
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(machine._id)}
            sx={{ borderRadius: '5px', padding: '10px 20px', marginLeft: '20px' }}
          >
            Supprimer
          </Button>
        </Box>
      </Box>
    </Card>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box mb={3}>
          {machines.map(renderMachine)}
        </Box>
      </Box>
      <Footer />
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="lg">
        <DialogTitle>Modifier la machine</DialogTitle>
        <DialogContent>
          {Object.entries(formData).map(([key, value], index) => (
            <TextField
              key={index}
              label={key.split('_').join(' ')}
              name={key}
              value={value}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: '30px', fontSize: '14px' }}
            />
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleFormSubmit} color="primary" variant="contained">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default MachineList;
