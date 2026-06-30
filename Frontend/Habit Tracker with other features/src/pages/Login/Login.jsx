import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../Context/AuthenticationContext';

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const API_URL = "http://localhost:3000";
    const { token, setToken } = useContext(AuthenticationContext);

    function handleChange(event) {
    const { name, value } = event.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            console.log("Context token before navigation:", response.data.token);
            localStorage.setItem(
                "token",
                response.data.token
            )
            setToken(response.data.token);
            navigate(`/`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
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
                        required
                    />
                </div>

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;