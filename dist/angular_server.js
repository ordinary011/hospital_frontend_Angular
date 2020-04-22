const express = require('express');

const app = express();

app.use(express.static('./client'));

app.get("/", (req, res, next) => {
  res.sendFile("./client/index.html");
});

const port = process.env.PORT || 4200;

app.listen(port, () => console.log("listenming on port 80"));
