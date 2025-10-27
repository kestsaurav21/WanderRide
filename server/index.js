const express = require("express");

const app = express();

const PORT = 7700;

app.get("/test", (req, res) => {
  res.send("Hello testing the server");
});

app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
