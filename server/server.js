import express from "express";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import passport from "passport";
import { Strategy } from "passport-local";
import env from "dotenv";
import bcrypt from "bcrypt";

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
app.use(
  session({
    secret: "TOPSECRETWORD",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new Strategy({ usernameField: "email" }, async function verify(
    email,
    password,
    cb
  ) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (result.rows.length > 0) {
        const storedPassword = result.rows[0].password;
        bcrypt.compare(password, storedPassword, (err, isMatch) => {
          if (err) {
            return cb(err);
          } else if (isMatch) {
            return cb(null, result.rows[0]); // isAuthenticated() to true
          } else {
            return cb(null, false, { message: "Invalid Credentials" }); // isAuthenticated() to false
          }
        });
      } else {
        return cb(null, false, { message: "User Not Found" });
      }
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  db.query("SELECT * FROM users WHERE id = $1", [id], (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows[0]);
  });
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

// app.get("/logout", (req, res) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

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
      res.send("User Already Exists, Log In");
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
          req.login(user, (err) => {
            console.log("success");
            res.json({ isAuthenticated: "true" });
          });
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
