import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/habitRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

console.log("CLIENT_URL =", process.env.CLIENT_URL);

app.use(cors({
    origin(origin, callback) {
        console.log("Request Origin:", origin);
        console.log("CLIENT_URL:", process.env.CLIENT_URL);
        callback(null, true);
    }
}));

app.use(express.json());

app.use("/habits", router);
app.use("/auth", authRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
