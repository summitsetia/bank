import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const corsOptions = {
  orgin: ["htttp://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
