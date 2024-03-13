// EditUserProfile.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../../../actions/users.js";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

function EditUserProfile({ userId, onCancel,username,role }) {
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedRole, setEditedRole] = useState(role);
  const rolesEnum = ['Administrator', 'Energy Manager', 'Operator'];
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
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
            {rolesEnum.map((role, index) => ( 
              <option key={index} value={role}> 
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
  userId: PropTypes.string,
  onCancel: PropTypes.func,
};

export default EditUserProfile;
