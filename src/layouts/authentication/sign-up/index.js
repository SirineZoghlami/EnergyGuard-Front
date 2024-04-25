import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";



import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { register } from '../../../actions/authActions'; 
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';



// ...Other imports

// ...imports



function SignUp() {
  
  const dispatch = useDispatch(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(""); 
  const navigateTo = useNavigate();
  const rolesEnum = ['Administrator', 'Energy Manager', 'Operator'];
  

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
     
        
      await dispatch(register({ username, password, role, navigateTo }));
      console.log("User created successfully");
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <BasicLayout title="Sign up!" description="Energy Guard" image={curved6}>
      <Card>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={2}>
              <SoftInput placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2}>
              <div className="form-group mt-3">
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
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
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </SoftBox>
            <SoftBox display="flex" justifyContent="center" alignItems="center">
              <SoftButton type="submit" variant="gradient" color="primary">
                Sign Up
              </SoftButton>
            </SoftBox>
            <SoftBox display="flex" justifyContent="center" alignItems="center">
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;


