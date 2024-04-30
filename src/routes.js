import React from "react";
import SoftTypography from "components/SoftTypography";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import MachineList from "components/Machine/MachineList";
import AddMachine from "components/Machine/AddMachine";
import ArmoireList from "components/Armoire/ArmoireList";
import AddArmoire from "components/Armoire/AddArmoire";
import ArmoireStatistique from "components/Armoire/StatistiqueArmoire";
import ChatBot from "components/AI_ChatBot/AIChatBot";
import SimpleForm from "components/AI_ChatBot/Aichatbotcomp";
import GoogleCalendarComponent from "components/Calendier/Calender";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
 
  
  { type: "title", title: "Machines", key: "machines-pages" },

  {
    type: "collapse",
    name: "Machines",
    key: "machines",
    route: "/machines",
    icon: <Shop size="12px" />,
    component: <MachineList />,
    noCollapse: false,
  },
   // Add Machine route (conditionally rendered)
   {
    type: "collapse",
    name: "Ajouter machine",
    key: "add-machine",
    route: "/machines/add",
    icon: <Shop size="12px" />,
    component: <AddMachine />,
    noCollapse: true,
    hidden: true, 
  },
  { type: "title", title: "Armoires", key: "armoire-pages" },
   // Add Machine route (conditionally rendered)
   {
    type: "collapse",
    name: "Armoires",
    key: "list-armoire",
    route: "/armoire/list",
    icon: <Shop size="12px" />,
    component: <ArmoireList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ajouter armoire",
    key: "add-armoire",
    route: "/armoires/add",
    icon: <Shop size="12px" />,
    component: <AddArmoire />,
    noCollapse: true,
    hidden: true, // Flag to indicate that this route should not appear in the navigation menu
  }, 
  {
    type: "collapse",
    name: "Statistiques",
    key: "stat-armoire",
    route: "/armoires/statistiques",
    icon: <Shop size="12px" />,
    component: <ArmoireStatistique />,
    noCollapse: true,
    hidden: true, // Flag to indicate that this route should not appear in the navigation menu
  }, 
  { type: "title", title: "AI Chat", key: "ai-chatbot-pages" },
   // Add Machine route (conditionally rendered)
   {
    type: "collapse",
    name: "AI ChatBot",
    key: "ai-chatbot",
    route: "/chatbot",
    icon: <Shop size="12px" />,
    component: <SimpleForm/>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "test",
    key: "test",
    route: "/test",
    icon: <Shop size="12px" />,
    component: <ChatBot/>,
    noCollapse: true,
  },
  { type: "title", title: "Calendier de maintenance", key: "calender" },
  // Add Machine route (conditionally rendered)
  {
   type: "collapse",
   name: "Calendier",
   key: "calendier-maintenance",
   route: "/calendier-maintenance",
   icon: <Shop size="12px" />,
   component: <GoogleCalendarComponent/>,
   noCollapse: true,
 },
  


  
   
    
];

export default routes;
