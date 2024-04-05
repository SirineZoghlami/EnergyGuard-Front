import React, { useState, useEffect } from 'react';

import { Card, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import SoftBadge from 'components/SoftBadge';

import axios from 'axios';





function Alarme() {
  // State pour stocker toutes les alarmes
  const [alarmes, setAlarmes] = useState([]);
  // State pour stocker les alarmes filtrées
  const [filteredAlarmes, setFilteredAlarmes] = useState([]);
  // State pour gérer les erreurs
  const [error, setError] = useState('');
  // State pour gérer le filtre de recherche
  const [filter, setFilter] = useState('');
  // State pour stocker les informations d'une nouvelle alarme
  const [newAlarme, setNewAlarme] = useState({
    description: '',
    dateAlarme: '',
    heureAlarme: '',
    etatvu: false
  });

  useEffect(() => {
    // Fonction pour récupérer les alarmes depuis le backend
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

  // Fonction pour gérer le changement de filtre
  const handleFilterChange = e => {
    const value = e.target.value;
    setFilter(value);
    const filtered = alarmes.filter(alarme => alarme.description.toLowerCase().includes(value.toLowerCase()));
    setFilteredAlarmes(filtered);
  };

  // Fonction pour marquer une alarme comme vue
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

// Fonction pour ajouter une nouvelle alarme
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



  // Fonction pour supprimer une alarme
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
  // Fonction pour envoyer un e-mail
const envoyerEmail = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/airalarmes/envoyer-email');
    console.log(response.data); // Afficher la réponse de l'API pour le débogage
    // Afficher un message de succès ou effectuer d'autres actions nécessaires
  } catch (error) {
    console.error(error); // Gérer les erreurs en cas d'échec de l'envoi d'e-mail
  }
};

  

// Dans la fonction Alarme
return (
<DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4} mx={12}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Alarmes et Événements</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              {error && <p>{error}</p>}
      
      {/* Ajout des champs pour ajouter une nouvelle alarme */}
      <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              ID
            </SoftTypography>
          </SoftBox>
          <SoftInput type="ID" placeholder="ID" value={newAlarme.id}  onChange={e => setNewAlarme({ ...newAlarme, id: e.target.value })} />
        </SoftBox>
        
    
    <SoftBox mb={2}>
      <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
            Type alarme ID
            </SoftTypography>
          </SoftBox>
          <SoftInput type="Type ID" placeholder="Type ID" value={newAlarme.typealarmeId}
        onChange={e => setNewAlarme({ ...newAlarme, typealarmeId: e.target.value })} />
        </SoftBox>
        <SoftBox mb={2}>
      <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
            Équipement ID
            </SoftTypography>
          </SoftBox>
          <SoftInput type="Équipement ID " placeholder="Équipement ID" value={newAlarme.equipementairId}
        onChange={e => setNewAlarme({ ...newAlarme, equipementairId: e.target.value })} />
        </SoftBox>
    
        <SoftBox mb={2}>
      <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
            Description 
            </SoftTypography>
          </SoftBox>
          <SoftInput type="Description " placeholder="Description" value={newAlarme.description}
        onChange={e => setNewAlarme({ ...newAlarme, description: e.target.value })} />
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
          <SoftButton onClick={handleAddAlarme} variant="gradient" color="info" >
          Add Alarme
          </SoftButton>
          <SoftButton onClick={envoyerEmail} variant="gradient" color="primary">Envoyer E-mail</SoftButton>
        </SoftBox>


      </SoftBox>
    </Card>
  </SoftBox>
            
     {/* Liste des alarmes filtrées */}
      <SoftBox mt={2} >
         <SoftBox mb={3}>
            <Card>
              {/* Champ de recherche pour filtrer les alarmes par description */}
      <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter by description" />
              {filteredAlarmes.map(alarme => (
                <li key={alarme._id} style={{ listStyleType: 'none', marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                  {/* Affichage des informations de l'alarme */}
                  <SoftTypography variant="button" fontWeight="medium">
                    Description: {alarme.description}
                  </SoftTypography>
                  <SoftTypography variant="caption" color="secondary">
                    Date: {alarme.dateAlarme}
                  </SoftTypography>
                  <SoftTypography variant="caption" color="secondary">
                    Heure: {alarme.heureAlarme}
                  </SoftTypography>
                  <SoftBadge variant="gradient" badgeContent={alarme.etatvu ? 'Vu' : 'Non vu'} color={alarme.etatvu ? 'success' : 'secondary'} size="xs" container />
                  {/* Bouton pour marquer l'alarme comme vue */}
                  <Button onClick={() => handleMarkAsSeen(alarme._id)} variant="contained" color="primary" style={{ marginLeft: '10px' }}>Mark as Seen</Button>
                  {/* Bouton pour supprimer l'alarme */}
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