import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../../actions/users"; // Import your action to delete the user
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import breakpoints from "assets/theme/base/breakpoints";
import avatar from "assets/images/admin-user-icon-3.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const currentUserJson = localStorage.getItem("currentUser");
  const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
  const navigateTo = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    function handleTabsOrientation() {
      setTabsOrientation(window.innerWidth < breakpoints.values.sm ? "vertical" : "horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, []);

  const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    try {
      if (currentUser && currentUser.others._id) {
        console.log("Deleting user with ID:", currentUser.others._id);
        await dispatch(deleteUser(currentUser.others._id));
        // Successfully deleted user from the backend, now remove from local storage
        localStorage.removeItem("currentUser");
        // Redirect to the sign-in page after deleting the user
        navigateTo('/authentication/sign-in');
      } else {
        console.error("User ID not found or invalid.");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      // Handle error if deletion from backend fails
    }
  };

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(rgba(gradients.info.main, 0.6), rgba(gradients.info.state, 0.6))}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
        
          <Grid item>
            <SoftAvatar src={avatar} alt="profile-image" variant="rounded" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {currentUser?.others.username}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {currentUser?.others.role}
              </SoftTypography>
              
            </SoftBox>
           
          </Grid>
          
        </Grid>
        <SoftBox>
            <button
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "transparent",
                  border: "2px solid red",
                  color: "red",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s",
                  marginTop: "5px",
                  outline: "none",
                  fontWeight: "bold",
                }}
                onClick={handleDeleteUser}
              >
                Delete Account
              </button>
            </SoftBox>
      </Card>
    </SoftBox>
  );
}

export default Header;
