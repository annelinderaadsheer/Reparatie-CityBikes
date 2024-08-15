const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/networks', async (req, res) => {
    try {
        const response = await axios.get('http://api.citybik.es/v2/networks');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.get('/network/:id', async (req, res) => {
    const networkId = req.params.id;
    try {
        const response = await axios.get(`http://api.citybik.es/v2/networks/${networkId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});