const express = require("express");
const path = require("path");
const morgan = require("morgan");

const BUILD_PATH = path.join(__dirname, "..", "build");
const PORT = process.env.PORT || 5000;

const app = express();

app.set("trust proxy");

// Force HTTPS redirection for HTTP requests.
app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] === "https") {
        next();
    } else {
        res.redirect(`https://${req.headers.host}${req.url}`);
    }
});

app.use(express.static(BUILD_PATH));
app.use(morgan("combined"));

app.get("*", (_req, res) => {
    res.sendFile(path.join(BUILD_PATH, "index.html"));
});

app.listen(PORT, () => {});

module.exports = app;
