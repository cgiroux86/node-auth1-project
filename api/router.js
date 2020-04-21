const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../knex/knexConfig");
const authenticator = require("./utils");

router.get("/", (req, res) => {
  db("sessions")
    .then((sessions) => res.status(200).json(sessions))
    .catch((err) => res.status(500).json(err));
});

router.get("/users", authenticator, (req, res) => {
  console.log(req.session);
  db("users")
    .then((found) => res.status(200).json(found))
    .catch((err) => res.status(500).json(err));
});

router.post("/register", (req, res) => {
  const rounds = process.env.HASH_ROUNDS || 10;
  const { username, password } = req.body;
  const hashed = bcrypt.hashSync(password, rounds);
  const user = { username, password: hashed };

  db("users")
    .insert(user)
    .then((u) => {
      res.status(201).json(u);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db("users")
    .where({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.logged = true;
        res.status(200).json({ message: `welcome back ${user.username}` });
      } else {
        res.status(401).json({ error: "forbidden" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
