import React, { useState, useEffect } from 'react';
import { Card, Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';
import SoftBadge from 'components/SoftBadge';
import axios from 'axios';
import Calendrier from './Calendar';

function Alarme() {
  const [alarmes, setAlarmes] = useState([]);
  const [filteredAlarmes, setFilteredAlarmes] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [newAlarme, setNewAlarme] = useState({
    description: '',
    dateAlarme: '',
    heureAlarme: '',
    etatvu: false
  });
  // État pour gérer l'ouverture et la fermeture de la fenêtre modale du calendrier
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchAlarmes() {
      try {
        const response = await axios.get('http://localhost:5000/api/airalarmes/get');
        setAlarmes(response.data);
        setFilteredAlarmes(response.data);
      } catch (error) {
        setError('Error fetching alarms');
      }
    }
    fetchAlarmes();
  }, []);

  const handleFilterChange = e => {
    const value = e.target.value;
    setFilter(value);
    const filtered = alarmes.filter(alarme => alarme.description.toLowerCase().includes(value.toLowerCase()));
    setFilteredAlarmes(filtered);
  };
  // Fonction pour ouvrir la fenêtre modale du calendrier
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Fonction pour fermer la fenêtre modale du calendrier
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMarkAsSeen = async id => {
    try {
      const response = await axios.put(`http://localhost:5000/api/airalarmes/${id}/vue`);
      const updatedAlarmes = alarmes.map(alarme => {
        if (alarme._id === id) {
          return response.data;
        }
        return alarme;
      });
      setAlarmes(updatedAlarmes);
      setFilteredAlarmes(updatedAlarmes);
    } catch (error) {
      setError('Error marking alarm as seen');
    }
  };

  const handleAddAlarme = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/airalarmes/add', {
        id: newAlarme.id,
        typealarmeId: newAlarme.typealarmeId,
        equipementairId: newAlarme.equipementairId,
        description: newAlarme.description,
        dateAlarme: newAlarme.dateAlarme,
        heureAlarme: newAlarme.heureAlarme,
        etatvu: newAlarme.etatvu
      });
      setAlarmes([...alarmes, response.data]);
      setFilteredAlarmes([...alarmes, response.data]);
      setNewAlarme({
        id: '',
        typealarmeId: '',
        equipementairId: '',
        description: '',
        dateAlarme: '',
        heureAlarme: '',
        etatvu: false
      });
    } catch (error) {
      setError('Error adding alarme');
    }
  };

  const handleDeleteAlarme = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/airalarmes/delete/${id}`);
      const updatedAlarmes = alarmes.filter(alarme => alarme._id !== id);
      setAlarmes(updatedAlarmes);
      setFilteredAlarmes(updatedAlarmes);
    } catch (error) {
      setError('Error deleting alarme');
    }
  };

  const envoyerEmail = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/airalarmes/envoyer-email');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4} mx={12}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Alarmes et Événements</SoftTypography>
            </SoftBox>
            <SoftBox>
              {error && <p>{error}</p>}
 {/* Bouton pour ouvrir la fenêtre modale du calendrier */}
 <Button onClick={handleOpenModal} variant="contained" color="primary">Voir Calendrier</Button>
              {/* Fenêtre modale du calendrier */}
              <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Calendrier</DialogTitle>
                <DialogContent>
                  {/* Composant Calendrier */}
                  <Calendrier alarmes={filteredAlarmes} updateCalendar={() => {}} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} color="primary">Fermer</Button>
                </DialogActions>
              </Dialog>              {/* Reste du formulaire pour ajouter une nouvelle alarme */}
<SoftBox mb={2}>
  <SoftBox mb={1} ml={0.5}>
    <SoftTypography component="label" variant="caption" fontWeight="bold">Type alarme ID</SoftTypography>
  </SoftBox>
  <SoftInput type="Type ID" placeholder="Type ID" value={newAlarme.typealarmeId} onChange={e => setNewAlarme({ ...newAlarme, typealarmeId: e.target.value })} />
</SoftBox>
<SoftBox mb={2}>
  <SoftBox mb={1} ml={0.5}>
    <SoftTypography component="label" variant="caption" fontWeight="bold">Équipement ID</SoftTypography>
  </SoftBox>
  <SoftInput type="Équipement ID " placeholder="Équipement ID" value={newAlarme.equipementairId} onChange={e => setNewAlarme({ ...newAlarme, equipementairId: e.target.value })} />
</SoftBox>
<SoftBox mb={2}>
  <SoftBox mb={1} ml={0.5}>
    <SoftTypography component="label" variant="caption" fontWeight="bold">Description</SoftTypography>
  </SoftBox>
  <SoftInput type="Description " placeholder="Description" value={newAlarme.description} onChange={e => setNewAlarme({ ...newAlarme, description: e.target.value })} />
</SoftBox>
<TextField
  label="Date"
  type="date"
  value={newAlarme.dateAlarme}
  onChange={e => setNewAlarme({ ...newAlarme, dateAlarme: e.target.value })}
  fullWidth
  margin="normal"
  variant="outlined"
  InputLabelProps={{
    shrink: true,
  }}
/>
<TextField
  label="Heure"
  type="time"
  value={newAlarme.heureAlarme}
  onChange={e => setNewAlarme({ ...newAlarme, heureAlarme: e.target.value })}
  fullWidth
  margin="normal"
  variant="outlined"
  InputLabelProps={{
    shrink: true,
  }}
/>
<SoftBox >
  <SoftButton onClick={handleAddAlarme} variant="gradient" color="info">Add Alarme</SoftButton>
  <SoftButton onClick={envoyerEmail} variant="gradient" color="primary">Envoyer E-mail</SoftButton>
</SoftBox>

            </SoftBox>
          </Card>
        </SoftBox>
{/* Liste des alarmes filtrées */}


        <SoftBox mt={2} >
          <SoftBox mb={3}>
            <Card>
              <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter by description" />
              {filteredAlarmes.map(alarme => (
                <li key={alarme._id} style={{ listStyleType: 'none', marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                  <SoftTypography variant="button" fontWeight="medium">Description: {alarme.description}</SoftTypography>
                  <SoftTypography variant="caption" color="secondary">Date: {alarme.dateAlarme}</SoftTypography>
                  <SoftTypography variant="caption" color="secondary">Heure: {alarme.heureAlarme}</SoftTypography>
                  <SoftBadge variant="gradient" badgeContent={alarme.etatvu ? 'Vu' : 'Non vu'} color={alarme.etatvu ? 'success' : 'secondary'} size="xs" container />
                  <Button onClick={() => handleMarkAsSeen(alarme._id)} variant="contained" color="primary" style={{ marginLeft: '10px' }}>Mark as Seen</Button>
                  <Button onClick={() => handleDeleteAlarme(alarme._id)} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>Delete</Button>
                </li>
              ))}
            </Card>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Alarme;
