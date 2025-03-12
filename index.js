const express = require('express');
const axios = require('axios');
// const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Route voor de netwerken
app.get('/networks', async (req, res) => {
    try {
        const response = await axios.get('http://api.citybik.es/v2/networks');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Route voor een specifiek netwerk
app.get('/network/:id', async (req, res) => {
    const networkId = req.params.id;
    try {
        const response = await axios.get("http://api.citybik.es/v2/networks/${networkId}");
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});


// Route voor de stationspagina

// app.get('/network/:id/stations', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'stations.html'));
// });

app.listen(port, () => {
    console.log("Server running at http://localhost:3000");
});;

