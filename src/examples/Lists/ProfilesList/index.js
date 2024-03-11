
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";
// @mui material components
import Card from "@mui/material/Card";
import adminAvatar from "../../../assets/images/admin-user-icon-3.jpg"
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

function ProfilesList({ title, profiles }) {
  const renderProfiles = profiles.map(({  username, role }) => (
    <SoftBox key={username} component="li" display="flex" alignItems="center" py={1} mb={1}>
  <SoftBox mr={2}>
    <SoftAvatar src={adminAvatar} alt="something here" variant="rounded" shadow="md" />
  </SoftBox>
  <SoftBox
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    justifyContent="center"
  >
    <SoftTypography variant="button" fontWeight="medium">
      {username}
    </SoftTypography>
    <SoftTypography variant="caption" color="text">
      {role}
    </SoftTypography>
    
  </SoftBox>
  <SoftButton type="submit" variant="gradient" color="info" style={{ marginLeft: 'auto' }}>
      Edit User
  </SoftButton>
</SoftBox>

    
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfilesList;
