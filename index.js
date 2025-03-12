const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

// ✅ API-endpoint voor netwerkdetails en stations
app.get('/api/network/:id', async (req, res) => {
    try {
        const response = await axios.get(`http://api.citybik.es/v2/networks/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
