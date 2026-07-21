import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { Container, Card, CardContent, Typography, Box, TextField, Button, Link, Alert } from "@mui/material"

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthenticationContext);
    const [ loginError, setLoginError ]  = useState("");
    const [ isLoggingIn, setIsLoggingIn ] = useState(false);

    function handleChange(event) {
    const { name, value } = event.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
        setLoginError("");
    }

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setIsLoggingIn(true);
            await login(email, password);
            navigate(`/`);
        } catch (err) {
            setLoginError("Invalid email or password");
            console.error('Error, unable to log in', err);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <Container 
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                
                py: {
                    xs: 3,
                    sm: 4,
                    md: 6,
                },

                px: {
                    xs: 2,
                    sm: 3,
                    md: 4,
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
                        Welcome Back
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
                        Sign in to continue your habit journey.
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
                            disabled={isLoggingIn}
                            required
                        />

                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            disabled={isLoggingIn}
                            required
                        /> 
                                
                        {loginError && (
                            <Alert severity="error">{loginError}</Alert>
                        )}

                        <Button 
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isLoggingIn}
                            sx={{
                                color: "white",
                                py: {
                                    xs: 1.25,
                                    sm: 1.4,
                                    md: 1.5,
                                },
                            }}
                        >
                            {isLoggingIn ? "Logging in..." : "Login"}
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
                            Don't have an account?
                        </Typography>

                        <Link 
                            underline="none"
                            onClick={() => navigate("/auth/register")}
                            sx={{
                                cursor: "pointer",
                                fontSize: {
                                    xs: "0.9rem",
                                    sm: "0.95rem",
                                    md: "1rem",
                                },
                            }}
                        >
                            {"Create an account"}
                        </Link>
                    </Box>

                    
                </CardContent>
            </Card>
        </Container>
    );
}

export default Login;