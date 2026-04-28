import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRouter from "./routes/auth.route";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}: http://localhost:${port}`);
});
