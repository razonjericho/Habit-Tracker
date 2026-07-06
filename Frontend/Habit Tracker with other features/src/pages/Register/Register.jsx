import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            setRegisterSuccess("Successfully Registered");
            setTimeout(() => {
                    navigate(`/auth/login`);
                }, 3000);
        } catch (err) {
            setRegisterError(err.response.data.error);
            console.error(err.response.data);
        } finally {
            setIsRegistering(false);
        }
    };

    

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        disabled={isRegistering}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        disabled={isRegistering}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={handleChange}
                        disabled={isRegistering}
                        required
                    />
                </div>

                {registerError && (
                    <p className='register-error'>{registerError}</p>
                )}

                {registerSuccess && (
                    <p className='register-error'>{registerSuccess}</p>
                )}

                <button 
                    type="submit"
                    disabled={isRegistering}
                >
                    {isRegistering ? "Registering..." : "Register"}
                </button>
            </form>

            <p>Already Have an Account?</p>
                    <button 
                    type="submit"
                    disabled={isRegistering}
                    onClick={(event) => navigate("/auth/login")}
                    >
                    {"Login"}
                </button>
        </div>
    );
}

export default Register;