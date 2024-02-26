import express from 'express';
import 'dotenv/config';
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.send('Funcionou');
});
app.listen(port, () => console.log(`listening on port ${port}`));
