import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import EditUserProfile from "../../../layouts/profile/components/Edituser/editUserProfile.js";
import adminAvatar from "../../../assets/images/admin-user-icon-3.jpg";
import SoftInput from "components/SoftInput";
import Pagination from "@mui/material/Pagination";

function ProfilesList({ title, profiles }) {
  const [editingUserId, setEditingUserId] = useState(null);
  const [username, setUsername] = useState();
  const [role, setRole] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleEditUser = (userId, username, role) => {
    setEditingUserId(userId);
    setUsername(username);
    setRole(role);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  // Function to handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Calculate start and end index of users to display based on current page
  const startIndex = (currentPage - 1) * 5;
  const endIndex = Math.min(startIndex + 5, profiles.length);

  // Filtered and paginated users
  const paginatedUsers = profiles
    .filter((profile) =>
      profile.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(startIndex, endIndex);

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox pr={1}>
          <SoftInput
            placeholder="Search"
            icon={{ component: "search", direction: "left" }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SoftBox>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {paginatedUsers.map(({ _id, username, role }) => (
            <SoftBox key={_id} component="li" display="flex" alignItems="center" justifyContent="space-between" py={1} mb={1}>
              <SoftBox display="flex" alignItems="center">
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
              </SoftBox>
              <SoftButton type="button" variant="gradient" color="info" onClick={() => handleEditUser(_id, username, role)}>
                Edit User
              </SoftButton>
            </SoftBox>
          ))}
        </SoftBox>
        <Pagination
          count={Math.ceil(profiles.length / 5)} // Total number of pages
          page={currentPage}
          onChange={handlePageChange}
        />
      </SoftBox>
      {editingUserId && (
        <EditUserProfile
          userId={editingUserId}
          username={username}
          role={role}
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
