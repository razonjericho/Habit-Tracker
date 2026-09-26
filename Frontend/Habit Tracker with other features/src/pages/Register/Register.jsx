import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, TextField, Button, Link, Alert } from "@mui/material";
import { API_URL } from '../../config';
import "./Register.css"

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [registerError, setRegisterError] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const navigate = useNavigate();

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

            setRegisterSuccess(
                "Account created successfully! Redirecting to login..."
            );

            setTimeout(() => {
                navigate(`/auth/login`);
            }, 2000);

        } catch (err) {
            setRegisterError(err.response.data.error);
            console.error(err.response.data);

        } finally {
            setIsRegistering(false);
        }
    }

    return (
        <Container className="register-container">
            <Card className="register-card">
                <CardContent className="register-card-content">
                    <Typography
                        variant="h2"
                        align="center"
                        className="register-title"
                    >
                        Create Your Account
                    </Typography>

                    <Typography
                        variant="body1"
                        align="center"
                        className="register-description"
                    >
                        Your habit journey starts here.
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        className="register-form"
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
                            className="register-field"
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
                            className="register-field"
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
                            className="register-field"
                        />

                        {registerError && (
                            <Alert
                                severity="error"
                                className="register-error"
                            >
                                {registerError}
                            </Alert>
                        )}

                        {registerSuccess && (
                            <Alert
                                severity="success"
                                className="register-success"
                            >
                                {registerSuccess}
                            </Alert>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isRegistering}
                            className="register-button"
                        >
                            {isRegistering
                                ? "Creating Account..."
                                : "Create Account"
                            }
                        </Button>

                    </Box>

                    <Box className="register-login">
                        <Typography
                            variant="body2"
                            className="register-login-description"
                        >
                            Already have an account?
                        </Typography>

                        <Link
                            underline="none"
                            onClick={() => navigate("/auth/login")}
                            className="register-login-link"
                        >
                            Log in
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Register;