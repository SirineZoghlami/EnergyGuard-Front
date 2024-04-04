import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, CircularProgress, Snackbar } from '@mui/material';
import { green, red } from '@mui/material/colors';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

const AddArmoire = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState(red[600]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/armoires', values);
      setSnackbarMessage("Armoire ajoutée avec succès.");
      setSnackbarColor(green[600]);
      setSnackbarOpen(true);
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'armoire :', error);
      setSnackbarMessage("Une erreur est survenue lors de l'ajout de l'armoire. Veuillez réessayer plus tard.");
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
          Ajouter une armoire
        </Typography>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Formik
            initialValues={{ tgbt_id: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.tgbt_id) {
                errors.tgbt_id = 'Le TGBT ID est requis';
              }
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="tgbt_id"
                  type="text"
                  as={TextField}
                  label="TGBT ID"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  placeholder="Entrez le TGBT ID"
                  sx={{ marginBottom: 2 }}
                />
                <ErrorMessage name="tgbt_id" component="div" style={{ color: 'red' }} />
                <Button type="submit" disabled={isSubmitting || loading} color="primary" variant="contained" fullWidth>
                  {loading ? <CircularProgress size={24} /> : 'Ajouter'}
                </Button>
              </Form>
            )}
          </Formik>
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

export default AddArmoire;
