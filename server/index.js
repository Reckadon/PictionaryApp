const express = require("express");
const path = require("path");

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
