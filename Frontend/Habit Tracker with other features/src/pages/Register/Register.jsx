import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, TextField, Button, Link, Alert } from "@mui/material";
import { API_URL } from '../../config';

function Register () {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const [ registerError, setRegisterError ] = useState("");
    const [ registerSuccess, setRegisterSuccess ] = useState("");
    const [ isRegistering, setIsRegistering ] = useState(false);

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
            sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            px: {
                xs: 2,
                sm: 3,
                md: 4,
            },

            py: {
                xs: 3,
                sm: 4,
                md: 6,
            },
        }}
        >
            <Card
                sx={{
                    width: "100%",

                    maxWidth: {
                        xs: 420,
                        sm: 520,
                        md: 640,
                    },
                }}
            >
                <CardContent
                    sx={{
                        p: {
                            xs: 3,
                            sm: 4,
                            md: 5,
                        },
                    }}
                >
                    <Typography 
                        variant="h2"
                        align="center"
                        gutterBottom
                        sx={{
                            fontSize: {
                                xs: "2rem",
                                sm: "2.25rem",
                                md: "2.5rem",
                            },
                        }}
                    >
                        Create Your Account
                    </Typography>

                    <Typography 
                        variant="body1"
                        align="center"
                        gutterBottom
                        sx={{
                            fontSize: {
                                xs: "0.95rem",
                                sm: "1rem",
                                md: "1.05rem",
                            },
                        }}
                    >
                        Your habit journey starts here.
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",

                            gap: {
                                xs: 2,
                                sm: 2.5,
                                md: 3,
                            },

                            mt: {
                                xs: 3,
                                sm: 3.5,
                                md: 4,
                            },
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
                            sx={{
                                color: "white",
                                py: {
                                    xs: 1.25,
                                    sm: 1.4,
                                    md: 1.5,
                                },
                            }}
                        >
                            {isRegistering ? "Creating Account..." : "Create Account"}
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            textAlign: "center",

                            mt: {
                                xs: 3,
                                sm: 3.5,
                                md: 4,
                            },
                        }}
                    >
                        <Typography 
                            variant="body2"
                            sx={{
                                fontSize: {
                                    xs: "0.85rem",
                                    sm: "0.9rem",
                                    md: "0.95rem",
                                },
                            }}
                        >
                            Already have an account?
                        </Typography>

                        <Link 
                            underline="none"
                            onClick={() => navigate("/auth/login")}
                            sx={{
                                cursor: "pointer",
                                fontWeight: 500,
                                fontSize: {
                                    xs: "0.9rem",
                                    sm: "0.95rem",
                                    md: "1rem",
                                },
                            }}
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