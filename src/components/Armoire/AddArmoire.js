import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Snackbar, Checkbox, Grid, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
//
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";




const AddArmoire = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState(red[600]);
  const [isActive, setIsActive] = useState('oui'); // State for is active radio button
  const [tgbtId, setTgbtId] = useState(''); // State for TGBT ID dropdown

  const apiKey = "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"


  const [name,setName] = useState('')
  
  
  
  const description ="react project for beginners"
  
  
  const [result,setResult  ] = useState([])
  

  
  
  useEffect(() => {
    async function generateSubTasks() {
      if(name !==''){

        try {
          const generatedSubTasks = { value: [] };
    
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              messages: [{ role: "system", content:`helooo give me  3 ideas for travling destinations in ${name} ` }],
              model: "gpt-3.5-turbo",
            })
          });
    
          if (!response.ok) {
            throw new Error('Failed to generate sub-tasks');
          }
    
          const data = await response.json();
          const generatedContent = data.choices[0]?.message?.content || '';
    
          console.log(name);
          console.log(description);
          console.log(generatedContent);
    
          const generatedTasks = generatedContent.split('\n').map(task => {
            return {
              text: task.trim(),
            };
          });
    
          generatedSubTasks.value = [...generatedSubTasks.value, ...generatedTasks];
    
          setResult(generatedSubTasks.value);
          console.log(generatedSubTasks.value);
          return generatedSubTasks.value;
        } catch (error) {
          console.error('Error generating sub-tasks:', error);
          return [];
        }
      }
   
    }
  
    generateSubTasks();
  }, [name]);
  

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.interfaceweb = isActive === 'oui'; // Convert isActive to boolean
      await axios.post('http://localhost:5000/api/armoires', data);
      setSnackbarMessage("Armoire ajoutée avec succès.");
      setSnackbarColor(green[600]);
      setSnackbarOpen(true);
      reset(); // Reset the form after successful submission
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

 const handleOnClick = () => {
  const newName = document.getElementById('serine').value;
  setName(newName);
  console.log("nameeeee", newName);
};



  return (
    <DashboardLayout>

      <DashboardNavbar />
      <Box p={3}>
        <input id="serine" type="text" placeholder='put name' >
        
    
        </input>

        <SoftButton onClick={(handleOnClick)}> </SoftButton>
       <h1> generated:</h1>
       {name !=='' && (

<>
{result.map((result1 , index) =>(
  <h1 key={index}>{index}{result1.text}</h1>

))}
</>


       )       
       }
    
        <SoftBox boxShadow={3} borderRadius="12px" p={3} sx={{
          backgroundImage: "linear-gradient(to right, #4ecdc4, #556270)",
        }}>
        <Typography variant="h5" align="center" gutterBottom>
          Ajouter une armoire
        </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Checkbox {...register("interfaceweb")} />
                <SoftTypography variant="button" fontWeight="regular">
                  Activer l&apos;interface Web
                </SoftTypography>
              </Grid>
              <Grid item xs={6}>
                <SoftInput {...register("nom", { required: true })} placeholder="Nom" />
              </Grid>
              <Grid item xs={6}>
                <SoftInput {...register("dossier")} placeholder="Dossier" />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <SoftInput {...register("adressip", { required: true })} placeholder="Adresse IP" />
                  </Grid>
                  <Grid item xs={6}>
                    <SoftInput {...register("objectif_khw_t")} placeholder="Objectif Khw_t" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} align="center">
                <SoftButton variant="gradient" color="info" size="large" type="submit">
                  Ajouter
                </SoftButton>
              </Grid>
            </Grid>
          </form>
        </SoftBox>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ '& .MuiSnackbarContent-root': { backgroundColor: snackbarColor } }}
        />
      </Box>
    </DashboardLayout>
  );
};

export default AddArmoire;
