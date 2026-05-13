import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import apiRoutes from "./routes/index";

dotenv.config();
connectDB();
const corsConfig = {
  origin: [
    "http://localhost:4200",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:63735",
    "http://localhost:188.51.233.4",
    "https://angular-iti-final-project-ecomerece.vercel.app",
    "https://angular-iti-final-project-ecomerece-three.vercel.app",
  ],
};

const app = express();
app.use(cors(corsConfig));
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}: http://localhost:${port}`);
});
