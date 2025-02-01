import express from "express";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";
import crypto from "crypto";

env.config();
const app = express();
const port = 3000;
const saltRounds = 10;
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bank",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

db.connect();

app.use(cors(corsOptions));
app.use(express.json());
// app.use(
//   session({
//     secret: "TOPSECRETWORD",
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       secure: false,
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const storedPassword = result.rows[0].password;
      bcrypt.compare(password, storedPassword, async (err, isMatch) => {
        if (err) {
          return console.log(err);
        } else if (isMatch) {
          const user = result.rows[0];
          const sessionId = crypto.randomUUID();
          await db.query("UPDATE users SET session_id = $1 WHERE id = $2", [
            user.id,
            sessionId,
          ]);
          res.cookie("session_id", sessionId);
          return res.json({ isAuthenticated: true });
        } else {
          return res.json({
            isAuthenticated: false,
            message: "Incorrect Password",
          });
        }
      });
    } else {
      return res.json({
        isAuthenticated: false,
        message: "Incorrect Username",
      });
    }
  } catch (err) {
    return console.log(err);
  }
});

app.post("/register", async (req, res) => {
  const registerData = req.body;
  const password = registerData.password;
  const fName = registerData.fName;
  const lName = registerData.lName;
  const email = registerData.email;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkResult.rows.length > 0) {
      res.json({ message: "User Already Exists, Log In" });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [fName, lName, email, hash]
          );
          const user = result.rows[0];
          const sessionId = crypto.randomUUID();
          await db.query("UPDATE users SET session_id = $1 WHERE id = $2", [
            sessionId,
            user.id,
          ]);
          res.cookie("session_id", sessionId, {
            httpOnly: true,
            sameSite: "None",
          });
          return res.json({ isAuthenticated: true });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
