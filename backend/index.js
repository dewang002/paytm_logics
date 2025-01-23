const express = require("express");
const mainRoute = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3030;
app.use(cors())
app.use(bodyParser)
app.use(express.json());
app.use("/api/v1", mainRoute);

app.listen(port, () => {
  console.log("running at port "+port);
});
