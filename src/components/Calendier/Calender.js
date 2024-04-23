import React, { useState, useEffect } from 'react';
import { Box, Snackbar, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { red, green } from '@mui/material/colors';
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr'; // Import French locale

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

const GoogleCalendarComponent = () => {
    const [events, setEvents] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState(red[600]);

    useEffect(() => {
        // Fetch events from Google Calendar API
        const fetchEvents = async () => {
            try {
                // Perform GET request to fetch events
                const response = await axios.get('/api/events'); // Replace '/api/events' with your server-side endpoint
                // Assuming response.data contains events in the required format
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
                // Handle error and show snackbar message
                setSnackbarMessage('Échec de récupération des événements. Veuillez réessayer plus tard.');
                setSnackbarColor(red[600]);
                setSnackbarOpen(true);
            }
        };

        // Call the fetchEvents function when component mounts
        fetchEvents();
    }, []);
  
    const handleEventClick = (info) => {
        // Handle event click (e.g., delete/edit event)
        // Example: display event details in a dialog
        console.log(info.event); // This will log the event object to the console
    };
  
    const handleAddEvent = () => {
        setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
  
    const handleSaveEvent = async () => {
        try {
            // Perform POST request to server-side endpoint to add event
            await axios.post('/api/events', { title: eventTitle }); // Replace '/api/events' with your server-side endpoint
            setOpenDialog(false);
            // Refresh events by refetching
            fetchEvents();
        } catch (error) {
            console.error('Error adding event:', error);
            // Handle error and show snackbar message
            setSnackbarMessage('Erreur lors de l\'ajout de l\'événement. Veuillez réessayer plus tard.');
            setSnackbarColor(red[600]);
            setSnackbarOpen(true);
        }
    };
  
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Box p={3}>
                <SoftBox>
                    <Button onClick={handleAddEvent}>Ajouter un événement</Button>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        eventClick={handleEventClick}
                        locales={[frLocale]} // Set French locale for FullCalendar
                    />
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Ajouter un événement</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Titre de l'événement"
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                            />
                            {/* Other input fields for event details */}
                            <Button onClick={handleSaveEvent}>Enregistrer</Button>
                        </DialogContent>
                    </Dialog>
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

export default GoogleCalendarComponent;
