import React, { useState } from 'react';
import { Box, Grid, Typography, CircularProgress, Snackbar } from '@mui/material';
import { red, green } from '@mui/material/colors';
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

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
  const [formErrors, setFormErrors] = useState({}); // State for form errors

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    // Clear validation error when user starts typing
    setFormErrors(prevState => ({ ...prevState, [name]: '' }));

    // Vérification du champ nom
    if (name === 'nom' && value.trim() === '') {
      setFormErrors(prevState => ({ ...prevState, [name]: 'Le nom est obligatoire' }));
    } else {
      setFormErrors(prevState => ({ ...prevState, [name]: '' }));
    }
  };

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      // Simple form validation before submitting
      const errors = {};
      if (!formData.nom.trim()) {
        errors.nom = 'Le nom est requis';
      }
      // Validation numérique pour les champs énergétiques
      if (isNaN(formData.energie_nominal)) {
        errors.energie_nominal = 'La valeur doit être numérique';
      }
      if (isNaN(formData.indicateur_cible_kwh_t)) {
        errors.indicateur_cible_kwh_t = 'La valeur doit être numérique';
      }
      if (isNaN(formData.indicateur_cible_kwh_km)) {
        errors.indicateur_cible_kwh_km = 'La valeur doit être numérique';
      }
      // Validation alphabétique pour le nom
      if (!/^[a-zA-Z\s]*$/.test(formData.nom.trim())) {
        errors.nom = 'Le nom doit contenir uniquement des lettres';
      }

      setFormErrors(errors);

      if (Object.keys(errors).length > 0) {
        setLoading(false);
        return;
      }
      
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
        <SoftBox
          boxShadow={3}
          borderRadius="12px"
          bgcolor="white"
          p={3}
          sx={{
            backgroundImage: "linear-gradient(to right, #4ecdc4, #556270)",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Ajouter une machine
          </Typography>
          <Grid container spacing={3}>
            {Object.entries(formData).map(([fieldName, value]) => {
              if (fieldName === 'production' || fieldName === 'interfaceweb' || fieldName === 'saisie_prodautomatique') {
                return null; // Skip checkboxes
              }
              return (
                <Grid item xs={6} key={fieldName}>
                  <SoftInput
                    name={fieldName}
                    label={fieldName.split('_').join(' ')}
                    value={value}
                    onChange={handleFormChange}
                    fullWidth
                    variant="outlined"
                    size="medium" // Make the field size bigger
                    placeholder={`Entrez ${fieldName.split('_').join(' ').toLowerCase()}`}
                    error={!!formErrors[fieldName]} // Check if there's an error for this field
                    helperText={formErrors[fieldName] || ' '} // Forcefully show error message
                  />
                </Grid>
              );
            })}
          </Grid>
          <Box display="flex" justifyContent="center" mt={3}>
            <SoftButton onClick={handleFormSubmit} disabled={loading} color="info" variant="contained">
              {loading ? <CircularProgress size={24} /> : 'Ajouter'}
            </SoftButton>
          </Box>
        </SoftBox>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          ContentProps={{
            style: { backgroundColor: snackbarColor }, // Set background color dynamically
          }}
        />
      </Box>
    </DashboardLayout>
  );
};

export default AddMachine;
