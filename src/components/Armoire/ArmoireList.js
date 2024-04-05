import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Snackbar,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; // Import EditIcon and DeleteIcon
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ITEMS_PER_PAGE = 10; // Number of items per page

const ArmoireList = () => {
  const [armoires, setArmoires] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedArmoire, setSelectedArmoire] = useState(null);
  const [formData, setFormData] = useState({
    tgbt_id: '',
    nom: '',
    dossier: '',
    isactive: '',
    isprod: false,
    adressip: '',
    objectif_khw_t: '',
    interfaceweb: false,
    armoireprec: '',
    zone_id: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  useEffect(() => {
    fetchArmoires();
  }, [currentPage]); // Fetch armoires whenever currentPage changes

  const fetchArmoires = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/armoires?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
      setArmoires(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des armoires :', error);
      setArmoires([]);
    }
  };

  // Add pagination buttons to change the current page
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleModify = (armoire) => {
    setSelectedArmoire(armoire);
    setFormData(armoire);
    setOpenDialog(true);
  };

  const handleDelete = async (armoireId) => {
    try {
      await axios.delete(`http://localhost:5000/api/armoires/${armoireId}`);
      setArmoires(armoires.filter((armoire) => armoire._id !== armoireId));
      setSnackbarMessage('Armoire supprimée avec succès.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'armoire :', error);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseDialog = () => {
    setSelectedArmoire(null);
    setFormData({
      tgbt_id: '',
      nom: '',
      dossier: '',
      isactive: '',
      isprod: false,
      adressip: '',
      objectif_khw_t: '',
      interfaceweb: false,
      armoireprec: '',
      zone_id: '',
    });
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleFormSubmit = async () => {
    try {
      if (selectedArmoire) {
        await axios.put(`http://localhost:5000/api/armoires/${selectedArmoire._id}`, formData);
        setArmoires(
          armoires.map((armoire) =>
            armoire._id === selectedArmoire._id ? { ...armoire, ...formData } : armoire
          )
        );
        setSnackbarMessage('Armoire modifiée avec succès.');
      } else {
        const response = await axios.post('http://localhost:5000/api/armoires', formData);
        setArmoires([...armoires, response.data]);
        setSnackbarMessage('Armoire ajoutée avec succès.');
      }
      setSnackbarOpen(true);
      handleCloseDialog();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(armoires);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Armoires');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'armoires.xlsx');
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box mb={3}>
          <Link to="/armoires/add" style={{ textDecoration: 'none', marginBottom: '25px' }}>
            <Button variant="contained" startIcon={<AddIcon />}>
              Ajouter une armoire
            </Button>
          </Link>
          <Button variant="contained" onClick={handleDownloadExcel} style={{ marginLeft: '10px' }}>
            Télécharger Excel
          </Button>
          {armoires.map((armoire) => (
            <Card key={armoire._id} sx={{ marginBottom: '10px', borderRadius: '10px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {Object.entries(armoire)
                    .filter(([key]) => key !== '__v')
                    .map(([key, value], index) => (
                      <li key={index} style={{ marginBottom: '5px' }}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                </ul>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <IconButton
                    onClick={() => handleModify(armoire)}
                    sx={{ marginRight: '20px', backgroundColor: '#1976d2', color: '#fff' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(armoire._id)}
                    sx={{ backgroundColor: '#f44336', color: '#fff' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              sx={{ marginRight: '10px' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="subtitle1">{currentPage}</Typography>
            <IconButton
              onClick={handleNextPage}
              disabled={armoires.length < ITEMS_PER_PAGE}
              sx={{ marginLeft: '10px' }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Footer />
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="lg">
        <DialogTitle>Modifier l'armoire</DialogTitle>
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

export default ArmoireList;
