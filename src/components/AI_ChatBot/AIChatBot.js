import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Snackbar, Checkbox, Grid, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { ref } from 'yup';




const ChatBot = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState(red[600]);
  const [isActive, setIsActive] = useState('oui'); // State for is active radio button
  const [tgbtId, setTgbtId] = useState(''); // State for TGBT ID dropdown

  const apiKey = process.env.REACT_APP_API_KEY;


  const [name,setName] = useState('')
  
  
  
  
  
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
            throw new Error('Failed to generate response');
          }
      
          const data = await response.json();

         console.log(data)

          const generatedContent = data.choices[0]?.message?.content || '';
    
          console.log(name);
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
    setName(document.getElementById('serine').value);

    console.log("nameeeee",name)
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
  <h1 key={index}>{result1.text}</h1>

))}
</>


       )       
       }
    
<SoftBox boxShadow={3} borderRadius="12px" p={3} sx={{
  backgroundImage: "linear-gradient(to right, #4ecdc4, #556270)",
}}>
  <Typography variant="h5" align="center" gutterBottom>
    Assistant d&apos;information sur les équipements industriels
  </Typography>
  <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2} justify="center">
      <Grid item xs={8}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SoftInput {...register("nom", { required: true })} placeholder="Besoin de renseignements sur un équipements industriels ? Tapez votre demande ici." />
        </div>
      </Grid>
      <Grid item xs={12} align="center">
        <SoftButton variant="gradient" color="info" size="large" type="submit">
          Envoyer
        </SoftButton>
      </Grid>
    </Grid>
  </form>
</SoftBox>


        
      </Box>
    </DashboardLayout>
  );
};

export default ChatBot;
