// LoginPage.tsx
import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import useUser from "../Hooks/useUser/useUser";
import {Helmet} from "react-helmet";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {LoginUser} = useUser();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleLogin = (): void => {
    // Implement your login functionality here
      LoginUser(email, password);
  };

  return (
    <Container maxWidth="sm">
      <Helmet>
          <meta charSet={"utf-8"} />
          <title>Login - Ursura</title>
      </Helmet>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >

        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
