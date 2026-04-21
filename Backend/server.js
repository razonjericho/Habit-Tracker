import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/habitRoutes.js";

const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use("/habits", router);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
