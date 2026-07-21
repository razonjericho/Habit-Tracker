import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/habitRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin:  process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use("/habits", router);
app.use("/auth", authRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
