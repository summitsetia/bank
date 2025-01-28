import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  res.status(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
