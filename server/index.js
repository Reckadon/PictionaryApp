import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
