/** @format */

import React, { useState } from "react";
import AxiosService from "../api/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    error: {
      main: "#f44336",
    },
  },
});
const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
    .required("Password is required")
  });
  const handleSignin = async (values) => {
    try {
      setLoading(true);
      const response = await AxiosService.post("/signin", values);
      console.log(response.data);

const { message, token, userData } = response.data;
if (message) {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
  });
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("userData", JSON.stringify(userData));
  navigate("/home");
}
} catch (error) {
console.error(error.response);

if (error.response) {
  toast.error(error.response.data.message, {
   
    
  });
}else if (error.response) {
  toast.error(error.response.data.errors[0].msg, {
    position: toast.POSITION.TOP_CENTER,
  });
} else {
  toast.error("failed to signin please try again", {
   
   
  });
}
} finally {
setLoading(false);
}
};


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignin}
      >
        <Form>
          <Box
            component='div'
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              "& .MuiTextField-root": {
                m: 1,
                width: "25ch",
                marginBottom: "20px",
              },
              "& .required": {
                color: darkTheme.palette.error.main,
              },
            }}
            noValidate
            autoComplete='off'
          >
            <h2 style={{ marginBottom: "20px" }}>Signin</h2>
            <div>
              <Field
                name='email'
                type='text'
                as={TextField}
                label='Email'
                variant='outlined'
                className='required'
              />
              <ErrorMessage name='email' component='div' className='required' />
            </div>
            <div>
              <Field
                name='password'
                type={showPassword ? "text" : "password"}
                as={TextField}
                label='Password'
                variant='outlined'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className='required'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='required'
              />
            </div>
            <Button
              color='primary'
              variant='contained'
              type='submit'
              style={{ marginTop: "20px" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Signin"}
            </Button>
            <p style={{ marginTop: "20px" }}>
              <Link to='/forgot-password'>Forgot Password?</Link>
            </p>
            <p>
              Don't have an account? <Link to='/signup'>Signup</Link>
            </p>
          </Box>
        </Form>
      </Formik>
    </ThemeProvider>
  );
};

export default Signin;