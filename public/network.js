document.addEventListener('DOMContentLoaded', async () => {
    const networkTitle = document.getElementById('networkTitle');
    const stationsContainer = document.getElementById('stations');

    // Haal netwerk-ID op uit de URL
    const urlParams = new URLSearchParams(window.location.search);
    const networkId = urlParams.get('id');

    if (!networkId) {
        stationsContainer.innerHTML = "<p>Geen netwerk-ID opgegeven.</p>";
        return;
    }

    try {
        // Vraag netwerkgegevens op via de API
        const response = await axios.get(`http://api.citybik.es/v2/networks/${networkId}`);
        const data = await response.json();

        // Zet de titel van de pagina
        networkTitle.textContent = `Stations in ${data.network.name}`;

        // Controleer of er stations zijn
        if (!data.network.stations || data.network.stations.length === 0) {
            stationsContainer.innerHTML = "<p>Geen stations gevonden.</p>";
            return;
        }

        // Stations weergeven
        stationsContainer.innerHTML = ""; // Clear de loading tekst
        data.network.stations.forEach(station => {
            const stationDiv = document.createElement('div');
            stationDiv.className = 'station';
            stationDiv.innerHTML = `
                <h3>${station.name}</h3>
                <p><strong>Fietsen beschikbaar:</strong> ${station.free_bikes}</p>
                <p><strong>Docking stations:</strong> ${station.empty_slots}</p>
            `;
            stationsContainer.appendChild(stationDiv);
        });

    } catch (error) {
        stationsContainer.innerHTML = "<p>Fout bij het laden van stations.</p>";
        console.error(error);
    }
});

