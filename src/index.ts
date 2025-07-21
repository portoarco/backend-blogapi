import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import accountRouter from "./routers/account.router"
import authRouter from "./routers/auth.router";
import cors from "cors"; //pakai npm i -D @types/cors



// PORT Config
const PORT: string = process.env.PORT || "5000";
// API Config
const app: Application = express();
// CORS Middleware (firewall hubungkan ke seluruh aplikasi)
app.use(cors());

// Middleware Config
app.use(express.json());
// Landing Page
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>Landing Page</h1>");
});
// Router Config
app.use("/accounts", accountRouter);
app.use("/auth", authRouter);

// PORT LISTENER
app.listen(PORT, () => {
  console.info(`API is running at http://localhost:${PORT}`);
});
