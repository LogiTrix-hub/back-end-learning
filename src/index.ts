import express from "express";
import cors from "cors";

const app = express();
// ToDo: remove row below when will start working with cors policy
app.use(cors());
const port = 3006;

app.get("/", (req, res) => {
  const a = 4;
  if (a > 5) {
    res.send("OK!");
  } else {
    res.send("Hello World!SADSADSAD");
  }
});

app.get("/users", (req, res) => {
  res.send({
    users: ["john", "john", "john", "john", "john", "john"],
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
