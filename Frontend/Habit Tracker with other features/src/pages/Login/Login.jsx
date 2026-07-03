import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../Context/AuthenticationContext';
import Register from '../Register/Register';

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
                        disabled={isLoggingIn}
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
                        disabled={isLoggingIn}
                        required
                    />
                </div>

                {loginError && (
                    <p className='login-error'>{loginError}</p>
                )}

                <button 
                    type="submit"
                    disabled={isLoggingIn}
                >
                    {isLoggingIn ? "Logging in..." : "Login"}
                </button>
            </form>

                <button 
                    type="submit"
                    disabled={isLoggingIn}
                    onClick={(event) => navigate("/auth/register")}
                >
                    {"Register"}
                </button>
        </div>
    );
}

export default Login;