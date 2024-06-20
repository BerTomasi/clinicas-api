const express = require('express');
const cors = require('cors');
const https = require("https");
const fs = require("fs");
const rotas = require('./routers/rotas');

const app = express();
const helmet = require('helmet');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(helmet());
app.use(rotas);

app.listen(process.env.PORT || 3003, () => {});

module.exports = app;