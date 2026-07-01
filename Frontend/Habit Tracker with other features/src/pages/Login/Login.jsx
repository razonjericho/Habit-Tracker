import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../Context/AuthenticationContext';

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthenticationContext);
    const [ loginError, setLoginError ]  = useState("");

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
            await login(email, password);
            setLoginError("");
            navigate(`/`);
        } catch (err) {
            setLoginError("Invalid email or password");
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

                {loginError && (
                    <p>{loginError}</p>
                )}

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;