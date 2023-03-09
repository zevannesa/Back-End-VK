const express = require("express");
const users = require("./users.js");
const morgan = require("morgan");
const app = express();
const port = 3000;


//Middleware: Log dengan Morgan
app.use(morgan("combined"));

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:name", (req, res) => {
  users.forEach((e) => {
    if (req.params.name.toLowerCase() === e.name.toLowerCase()) {
      res.json(e);
    }
  });
  res.json({
    message: "Data user tidak ditemukan",
  });
});


// Middleware: Error Handling
const errorHandling = (err, req, res, next) => {
  res.json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
};
app.use(errorHandling);


// Middleware: 404 Routing Handling
app.use((req, res, next) => {
  res.json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));


