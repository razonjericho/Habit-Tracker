import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let habits = [
    {id: 1, habit: "Wake up"},
    {id: 2, habit: "Pray"},
];

app.get("/", (req, res) => {
    try {

    } catch (err) {
        console.log(err)
    }
});

app.post("/post", (req, res) => {
    try {

    } catch (err) {
        console.log(err)
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
