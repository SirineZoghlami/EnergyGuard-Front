import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PropTypes from 'prop-types';

const localizer = momentLocalizer(moment);

function Calendrier({ alarmes, updateCalendar }) {
  useEffect(() => {
    updateCalendar();
  }, [alarmes]);

  // Fonction pour générer une couleur aléatoire en format hexadécimal
  const randomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
  };



  const events = alarmes ? alarmes.map((event) => ({
    title: event.description,
    start: new Date(event.dateAlarme),
    end: new Date(event.dateAlarme),
    // Assigner une couleur de fond aléatoire à chaque événement
    backgroundColor: randomColor(),

  })) : [];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={"start"}
        endAccessor={"end"}
        style={{
          height: "1000px",
          width:"1000px", 

        }}
        eventPropGetter={(event)=> {
          return{
            style: {  backgroundColor: event.backgroundColor,
            },
          
          };
        }}
      />
    </div>
  );
}

Calendrier.propTypes = {
  alarmes: PropTypes.array.isRequired,
  updateCalendar: PropTypes.func.isRequired,
};

export default Calendrier;
