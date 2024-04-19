import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Snackbar, IconButton, MenuItem, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Line, Pie, Bar } from 'react-chartjs-2';

const ITEMS_PER_PAGE = 10;

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
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('nom');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchArmoires();
  }, [currentPage, sortField, sortOrder]);

  const fetchArmoires = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/armoires`, {
        params: {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          sortField,
          sortOrder,
        }
      });

      // Parse ID as number before setting the state
      const sortedArmoires = response.data.map(armoire => ({
        ...armoire,
        _id: parseInt(armoire._id)
      }));

      setArmoires(sortedArmoires);
    } catch (error) {
      console.error('Erreur lors de la récupération des armoires :', error);
      setArmoires([]);
    }
  };

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
      setSnackbarMessage('Erreur lors de la suppression de l\'armoire.');
      setSnackbarOpen(true);
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
        const response = await axios.put(`http://localhost:5000/api/armoires/${selectedArmoire._id}`, formData);
        // Update the armoire in the state with the response data
        setArmoires(
          armoires.map((armoire) =>
            armoire._id === selectedArmoire._id ? response.data : armoire
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

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Armoire Energie Consumption (kWh)',
      data: [650, 590, 800, 810, 560, 550, 400], // Example air consumption data in kWh
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box mb={3} sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/armoires/add" style={{ textDecoration: 'none', marginRight: '10px' }}>
            <Button variant="contained" startIcon={<AddIcon />}>
              Ajouter une armoire
            </Button>
          </Link>
          <Button variant="contained" onClick={handleDownloadExcel} style={{ marginRight: '10px' }}>
            Télécharger Excel
          </Button>
          <Box>
            <Typography variant="subtitle1" component="span" sx={{ marginRight: '10px' }}>
              Trier par:
            </Typography>
            <TextField
              select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              size="small"
              sx={{ marginRight: '10px' }}
            >
              <MenuItem value="nom">Nom</MenuItem>
              <MenuItem value="tgbt_id">ID</MenuItem>
              {/* Add more fields as needed */}
            </TextField>
            <TextField
              select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              size="small"
            >
              <MenuItem value="asc">Croissant</MenuItem>
              <MenuItem value="desc">Décroissant</MenuItem>
            </TextField>
          </Box>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Line data={chartData1} />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Pie data={pieChartData} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Bar data={barChartData} />
            </Box>
          </Grid>
        </Grid>

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
      <Footer />
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="lg">
        <DialogTitle>Modifier l&apos;armoire</DialogTitle>
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
