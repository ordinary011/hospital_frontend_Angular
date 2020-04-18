const express = require('express');

const app = express();

app.use(express.static('./client'));

app.get("/", (req, res, next) => {
  res.sendFile("./client/index.html");
});

app.listen(4200, () => console.log("listenming on port 4200"));
