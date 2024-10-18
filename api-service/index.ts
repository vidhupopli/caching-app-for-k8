import express from "express";
import "dotenv/config";
const serverPort = process.env.SERVER_PORT;

const app = express();

app.get("/", (req, res, next) => {
  res.send("Jai Gurudev | Narayan Narayan");
});

app.listen(serverPort, () => {
  console.log("started server @ port: ", serverPort);
});
