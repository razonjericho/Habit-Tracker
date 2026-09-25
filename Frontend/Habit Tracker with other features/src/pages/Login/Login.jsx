import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { Container, Card, CardContent, Typography, Box, TextField, Button, Link, Alert } from "@mui/material";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthenticationContext);
    const [loginError, setLoginError] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }

        setLoginError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setIsLoggingIn(true);

            await login(email, password);

            navigate(`/`);
        } catch (err) {
            setLoginError("Invalid email or password");
            console.error("Error, unable to log in", err);
        } finally {
            setIsLoggingIn(false);
        }
    }

    return (
        <Container className="login-container">
            <Card className="login-card">
                <CardContent className="login-card-content">

                    <Typography
                        variant="h2"
                        align="center"
                        className="login-title"
                    >
                        Welcome Back
                    </Typography>

                    <Typography
                        variant="body1"
                        align="center"
                        className="login-description"
                    >
                        Sign in to continue your habit journey.
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        className="login-form"
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
                            className="login-field"
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
                            className="login-field"
                        />

                        {loginError && (
                            <Alert
                                severity="error"
                                className="login-error"
                            >
                                {loginError}
                            </Alert>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isLoggingIn}
                            className="login-button"
                        >
                            {isLoggingIn ? "Logging in..." : "Login"}
                        </Button>
                    </Box>

                    <Box className="login-register">
                        <Typography
                            variant="body2"
                            className="login-register-description"
                        >
                            Don't have an account?
                        </Typography>

                        <Link
                            underline="none"
                            onClick={() => navigate("/auth/register")}
                            className="login-register-link"
                        >
                            Create an account
                        </Link>
                    </Box>

                </CardContent>
            </Card>
        </Container>
    );
}

export default Login;