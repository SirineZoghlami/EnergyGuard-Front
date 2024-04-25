



// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";


import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import { useState } from "react";
import { login } from '../../../actions/authActions'; // Import your login function from authActions
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';


function SignIn() {
  const dispatch = useDispatch(); 
  const [rememberMe, setRememberMe] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login({ username, password, navigateTo }));
        console.log("user signed in");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your username and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              username
            </SoftTypography>
          </SoftBox>
          <SoftInput type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center" justifyContent="space-between">
          <SoftBox display="flex" alignItems="center">
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <SoftTypography variant="button" fontWeight="regular" onClick={handleSetRememberMe} sx={{ cursor: "pointer", userSelect: "none" }}>
              &nbsp;&nbsp;Remember me
            </SoftTypography>
          </SoftBox>
          <SoftButton type="submit" variant="gradient" color="info">
            Sign In
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
