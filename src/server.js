const express = require("express");
const path = require("path");
const morgan = require("morgan");
const expressForceHttps = require("express-force-https");

const BUILD_PATH = path.join(__dirname, "..", "build");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(BUILD_PATH));
app.use(morgan("combined"));
app.use(expressForceHttps);

app.get("*", (_req, res) => {
    res.sendFile(path.join(BUILD_PATH, "index.html"));
});

app.listen(PORT, () => {});
