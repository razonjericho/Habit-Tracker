import React, { useState } from 'react';

function Register () {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const [ registerError, setRegisterError ] = useState("");
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
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setRegisterError("");

        try {
            if (password !== confirmPassword) {
                setRegisterError("Passwords do not match");
                return;
            }

            setIsRegistering(true);
        } catch (err) {
            setRegisterError("Invalid email or password");
            console.error('Error, unable to register', err);
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

                <button 
                    type="submit"
                    disabled={isRegistering}
                >
                    {isRegistering ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;