import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../Context/AuthenticationContext';
import "./Login.css"
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
                        Welcome Back
                    </Typography>

                    <Typography 
                        variant="body1"
                        align="center"
                        gutterBottom
                    >
                        Sign in to continue your habit journey.
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
                        >
                            {isLoggingIn ? "Logging in..." : "Login"}
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            textAlign:"center",
                            mt: 3,
                        }}
                    >
                        <Typography variant="body2">Don't have an account?</Typography>

                        <Link 
                            underline="none"
                            onClick={() => navigate("/auth/register")}
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