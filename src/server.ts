import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  return res.send({ message: "Hello World" });
});

app.post("/", (req, res) => {
  return res.json({ message: "Os dados foram salvos com sucesso!" });
});

app.listen(3333, () => console.log("Server is running!"));
