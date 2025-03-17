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
        const response = await fetch(`https://api.citybik.es/v2/networks/${networkId}`);
        const networkData = await response.json(); // Haal de JSON data op

        // Verander de titel van de pagina
        networkTitle.textContent = `Stations in ${networkData.network.name}`;

        // Controleer of er stations zijn
        if (!networkData.network.stations || networkData.network.stations.length === 0) {
            stationsContainer.innerHTML = "<p>Geen stations gevonden.</p>";
            return;
        }

        // Stations weergeven
        stationsContainer.innerHTML = ''; // Clear de container
        networkData.network.stations.forEach(station => {
            const stationDiv = document.createElement('div');
            stationDiv.className = 'station';
            stationDiv.innerHTML = `
                <h3>${station.name}</h3>
                <p>🚲 Fietsen: ${station.free_bikes}</p>
                <p>🔌 Docking slots: ${station.empty_slots}</p>
                <p class="status ${station.free_bikes > 0 ? 'available' : 'empty'}">
                    ${station.free_bikes > 0 ? '✅ Beschikbaar' : '❌ Geen fietsen'}
                </p>
            `;
            stationsContainer.appendChild(stationDiv);
        });

    } catch (error) {
        stationsContainer.innerHTML = "<p>Fout bij het laden van stations.</p>";
        console.error('Foutmelding:', error);
    }
});
