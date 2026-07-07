import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.css"
import { Container, Card, CardContent, Typography, Box, TextField, Button, Link, Alert } from "@mui/material"

function Register () {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const [ registerError, setRegisterError ] = useState("");
    const [ registerSuccess, setRegisterSuccess ] = useState("");
    const [ isRegistering, setIsRegistering ] = useState(false);

    const API_URL = "http://localhost:3000";

    function handleChange(event) {
    const { name, value } = event.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
        setRegisterError("");
        setRegisterSuccess("");
    }

    async function register(email, password) {
            await axios.post(`${API_URL}/auth/register`, {
                email,
                password
            });
        
    }

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setRegisterError("");
        setRegisterSuccess("");

        try {
            if (password !== confirmPassword) {
                setRegisterError("Passwords do not match");
                return;
            }
            setIsRegistering(true);
            await register(email, password);
            setRegisterSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => {
                    navigate(`/auth/login`);
                }, 2000);
        } catch (err) {
            setRegisterError(err.response.data.error);
            console.error(err.response.data);
        } finally {
            setIsRegistering(false);
        }
    };

    

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 4,
            }}
        >
            <Card
                sx={{
                    width: "100%",
                }}
            >
                <CardContent
                    sx={{
                        p: 4,
                    }}
                >
                    <Typography 
                        variant="h2"
                        align="center"
                        gutterBottom
                    >
                        Create Your Account
                    </Typography>

                    <Typography 
                        variant="body1"
                        align="center"
                        gutterBottom
                    >
                        Your habit journey starts here.
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mt:3
                        }}
                    >
                        <TextField 
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handleChange}
                            disabled={isRegistering}
                            required
                        />

                        <TextField 
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            disabled={isRegistering}
                            required
                        />         

                        <TextField 
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={handleChange}
                            disabled={isRegistering}
                            required
                        />

                        {registerError && (
                            <Alert severity="error">{registerError}</Alert>
                        )}

                        {registerSuccess && (
                            <Alert severity="success">{registerSuccess}</Alert>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isRegistering}
                        >
                            {isRegistering ? "Creating Account..." : "Create Account"}
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            textAlign:"center",
                            mt: 3,
                        }}
                    >
                        <Typography variant="body2">Already have an account?</Typography>

                        <Link 
                            underline="none"
                            onClick={() => navigate("/auth/login")}
                        >
                            {"Log in"}
                        </Link>
                    </Box>
                </CardContent>
            </Card>
            
        </Container>
    );
}

export default Register;