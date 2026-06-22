const express = require("express");

const app = express();

const PORT = 5100;

app.listen(PORT, () =>
{
    console.log(`Hello Wrld. We are running on port ${PORT}`);
});