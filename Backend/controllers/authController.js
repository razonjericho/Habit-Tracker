import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await db.query(
            `SELECT * from users WHERE email = ($1)`,
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await db.query(
            `
            INSERT INTO users (email, password_hash)
            VALUES ($1, $2)
            RETURNING id, email
            `,
            [email, hashedPassword]
        );

        const user = result.rows[0];

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register user" });
    }   
}

const logUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await db.query(
            `SELECT * from users WHERE email = ($1)`,
            [email]
        );

        if (existingUser.rows.length === 0) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const user = existingUser.rows[0];

        const isValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1m"
            }
        );

        res.status(200).json({ 
            message: "Login successful", 
            token }
        );

        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to log the user" });
    }
}

const getProfile = (req, res) => {
    res.json(req.user);
}

export { registerUser, logUser, getProfile };
