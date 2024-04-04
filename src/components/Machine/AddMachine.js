import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Paper, CircularProgress, Snackbar } from '@mui/material';
import { green, red } from '@mui/material/colors';
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

const AddMachine = () => {
  const initialFormData = {
    production: false,
    interfaceweb: false,
    saisie_prodautomatique: false,
    objectif_khw_t: '',
    energie_nominal: 5,
    indicateur_cible_kwh_t: '',
    indicateur_cible_kwh_km: '',
    adressip: '',
    nom: '',
    isactive: '',
    dossier: '',
    dossierprod: '',
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState(red[600]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/machines', formData);
      setSnackbarMessage("Machine ajoutée avec succès.");
      setSnackbarColor(green[600]);
      setSnackbarOpen(true);
      setFormData({ ...initialFormData });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la machine :', error);
      setSnackbarMessage("Une erreur est survenue lors de l'ajout de la machine. Veuillez réessayer plus tard.");
      setSnackbarColor(red[600]);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box p={3}>
        <Typography variant="h5" align="center" gutterBottom>
          Ajouter une machine
        </Typography>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Grid container spacing={3}>
            {Object.entries(formData).map(([fieldName, value]) => {
              if (fieldName === 'production' || fieldName === 'interfaceweb' || fieldName === 'saisie_prodautomatique') {
                return null; // Skip checkboxes
              }
              return (
                <Grid item xs={12} key={fieldName}>
                  <TextField
                    name={fieldName}
                    label={fieldName.split('_').join(' ')}
                    value={value}
                    onChange={handleFormChange}
                    fullWidth
                    variant="outlined"
                    size="medium" // Make the field size bigger
                    placeholder={`Entrez ${fieldName.split('_').join(' ').toLowerCase()}`}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button onClick={handleFormSubmit} disabled={loading} color="primary" variant="contained">
              {loading ? <CircularProgress size={24} /> : 'Ajouter'}
            </Button>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            sx={{ '& .MuiSnackbarContent-root': { backgroundColor: snackbarColor } }}
          />
        </Paper>
      </Box>
    </DashboardLayout>
  );
};

export default AddMachine;
