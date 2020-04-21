const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
require("dotenv").config();
const userRouter = require("./api/router");

const KnexSessionStore = require("connect-session-knex")(session);

const store = new KnexSessionStore({
  knex: require("./knex/knexConfig"),
  tablename: "sessions",
  createtable: true,
  clearInterval: 1000 * 60 * 60,
});

const sessionConfig = {
  name: "user",
  secret: process.env.SESSION_SECRET || "this is a secret session",
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  cookie: {
    maxAge: 1000 * 60,
    secure: process.env.USE_SECURE_COOKIES || false,
    httpOnly: true,
  },
  store: store,
};

server.use(express.json());
server.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:4001"],
  })
);
server.use(helmet());
server.use(session(sessionConfig));
server.use("/api", userRouter);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
