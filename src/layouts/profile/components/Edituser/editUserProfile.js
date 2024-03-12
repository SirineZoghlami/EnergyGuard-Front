import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUser } from "../../../../actions/users.js";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

function EditUserProfile({ userId, onCancel }) {
  const [editedUsername, setEditedUsername] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const rolesEnum = ['Administrator', 'Energy Manager', 'Operator'];
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    if (userId) {
      dispatch(getUsers(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setEditedUsername(user.username);
      setEditedRole(user.role);
    }
  }, [user]);

  const handleSave = () => {
    const updatedUser = { username: editedUsername, role: editedRole };
    dispatch(updateUser(userId, updatedUser));
    onCancel();
  };

  return (
    <SoftBox>
      <SoftTypography variant="h6">Edit User Profile</SoftTypography>
      <SoftInput
        placeholder="Username"
        value={editedUsername}
        onChange={(e) => setEditedUsername(e.target.value)}
      />
      <SoftBox mb={2}>
        <div className="form-group mt-3">
          <select
            className="form-select"
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
          >
            <option value="">Select User Role</option>
            {rolesEnum.map((role, index) => ( // Changed variable name from editedRole to role
              <option key={index} value={role}> {/* Changed variable name from editedRole to role */}
                {role}
              </option>
            ))}
          </select>
        </div>
      </SoftBox>
      <SoftButton onClick={handleSave}>Save</SoftButton>
      <SoftButton onClick={onCancel}>Cancel</SoftButton>
    </SoftBox>
  );
}

EditUserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditUserProfile;
