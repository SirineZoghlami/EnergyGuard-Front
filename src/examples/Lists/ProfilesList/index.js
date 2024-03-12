import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import EditUserProfile from "../../../layouts/profile/components/Edituser/editUserProfile.js";
import adminAvatar from "../../../assets/images/admin-user-icon-3.jpg";

function ProfilesList({ title, profiles }) {
  const [editingUserId, setEditingUserId] = useState(null); // Store the ID of the user being edited

  const handleEditUser = (userId) => {
    setEditingUserId(userId); // Set the user ID for editing
  };

  const handleCancelEdit = () => {
    setEditingUserId(null); // Clear the editing user ID
  };

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {profiles.map(({ _id, username, role }) => (
            <SoftBox key={_id} component="li" display="flex" alignItems="center" py={1} mb={1}>
              <SoftBox mr={2}>
                <SoftAvatar src={adminAvatar} alt="something here" variant="rounded" shadow="md" />
              </SoftBox>
              <SoftBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                <SoftTypography variant="button" fontWeight="medium">
                  {username}
                </SoftTypography>
                <SoftTypography variant="caption" color="text">
                  {role}
                </SoftTypography>
              </SoftBox>
              <SoftButton type="button" variant="gradient" color="info" onClick={() => handleEditUser(_id)}>
                Edit User
              </SoftButton>
            </SoftBox>
          ))}
        </SoftBox>
      </SoftBox>
      {editingUserId && (
        <EditUserProfile
          userId={editingUserId} // Pass the user ID to EditUserProfile
          onCancel={handleCancelEdit}
        />
      )}
    </Card>
  );
}

ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProfilesList;
