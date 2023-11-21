const express = require("express");
var cors = require("cors");
const path = require("path");

const app = express();
const port = 4200;
// app.use(express.urlencoded({ extended: true }));

app.use(cors());

// app.get("/comments", (req, res) => {
//   res.send("Hello World!");
// });

// app.post("/comments", (req, res) => {
//   console.log("req.body", req);

//   res.send("Got a POST request");
// });

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const router = require("./src/route/index.js");

app.use("/", router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const app = require("./app");
// const debug = require("debug")("template-express-live-reload:server");
// const http = require("http");

// const port = normalizePort(process.env.PORT || "4200");
// app.set("port", port);

// const server = http.createServer(app);

// server.listen(port);
// server.on("error", onError);
// server.on("listening", onListening);

// function normalizePort(val) {
//   const port = parseInt(val, 10);
//   if (isNaN(port)) {
//     return val;
//   }
//   if (port >= 0) {
//     return port;
//   }
//   return false;
// }

// function onError(error) {
//   if (error.syscall !== "listen") {
//     throw error;
//   }

//   const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case "EACCES":
//       console.log(bind + " requires elevated privileges");
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.log(bind + " is already in use");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   const addr = server.address();
//   const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
//   debug("Listening on " + bind);
//   console.log("Listening on " + "http://localhost:" + addr.port);
// }
