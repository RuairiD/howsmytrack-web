const express = require("express");
const path = require("path");
const morgan = require("morgan");

const BUILD_PATH = path.join(__dirname, "..", "build");
const PORT = process.env.PORT || 5000;

const app = express();

app.set("trust proxy");

app.use(express.static(BUILD_PATH));
app.use(morgan("combined"));

app.get("*", (req, res) => {
    // Force HTTPS redirection for HTTP requests.
    if (req.headers["x-forwarded-proto"] === "https") {
        res.sendFile(path.join(BUILD_PATH, "index.html"));
    } else {
        res.redirect(`https://${req.headers.host}${req.url}`);
    }
});

app.listen(PORT, () => {});
