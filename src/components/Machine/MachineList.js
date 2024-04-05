import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import * as XLSX from 'xlsx'; // Importing all functions and objects as XLSX
import { saveAs } from 'file-saver';

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
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/machines');
      setMachines(response.data.map(({ _id, ...rest }) => ({ _id, ...rest })));
    } catch (error) {
      console.error('Erreur lors de la récupération des machines :', error);
      setMachines([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette machine ?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/machines/${id}`);
        setMachines(machines.filter(machine => machine._id !== id));
        setSnackbarMessage('Machine supprimée avec succès.');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Erreur lors de la suppression de la machine :', error);
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
      setSnackbarMessage('Machine mise à jour avec succès.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la machine :', error);
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(machines);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Machines');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'machines.xlsx');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box mb={3}>
          <Link to="/machines/add" style={{ textDecoration: 'none', marginBottom: '25px' }}>
            <Button variant="contained" startIcon={<AddIcon />}>
              Ajouter une machine
            </Button>
          </Link>
          <Button variant="contained" onClick={handleDownloadExcel} style={{ marginLeft: '10px' }}>
            Télécharger Excel
          </Button>
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
                    Modifier
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(machine._id)}
                    sx={{ backgroundColor: '#f44336', color: '#fff' }}
                  >
                    Supprimer
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
      <Footer />
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="lg">
        <DialogTitle>Modifier la machine</DialogTitle>
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
                placeholder={`Entrez ${key.split('_').join(' ')}`}
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleFormSubmit} color="primary" variant="contained">
            Modifier
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
