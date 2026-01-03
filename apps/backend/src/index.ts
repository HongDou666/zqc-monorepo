// import express, { type Request, type Response } from "express";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9000;

const staticPath = path.resolve(__dirname, "../../../dist");
app.use(express.static(staticPath));

// app.get("/", (req: Request, res: Response) => {
//   res.json({ message: "Hello Express! GET" });
// });

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
