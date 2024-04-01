
import Grid from "@mui/material/Grid";
import {fetchUsers} from '../../api/userApi.js'
import SoftBox from "components/SoftBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import FacebookIcon from "@mui/icons-material/Facebook";


// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import { useEffect, useState } from "react";



function Overview() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    async function getUsers()  {
      const usersList = await fetchUsers();
      setUsersList(usersList.data);
    };
    getUsers()
  },[]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <PlatformSettings />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            
            <ProfileInfoCard
            
              title="Profile Information"
              info={{
                username: currentUser?.others.username,
                role: currentUser?.others.role,
              }}
              description="CofiCab Change Maker"
              social={[
                {
                  link: "https://www.facebook.com/CoficabTunisCCE",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },

              ]} 
              action={{ route: "", tooltip: "Edit Profile" }}
              
            />
            
     
          </Grid>
          <Grid item xs={12} xl={4}>
            <ProfilesList title="Users List" profiles={usersList} />
          </Grid>
        </Grid>
      </SoftBox>
      
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
