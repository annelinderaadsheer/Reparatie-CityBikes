document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('filterInput');
    const networksContainer = document.getElementById('networks');
    let networksData = []; 

    // Functie om de netwerken te renderen
    function renderNetworks(networks) {
        networksContainer.innerHTML = '';
        networks.forEach(network => {
            const networkDiv = document.createElement('div');
            networkDiv.className = 'network';
            networkDiv.innerHTML = `
                <h2>${network.name}</h2>
                <p><strong>ID:</strong> ${network.id}</p>
                <p><a href="/network/${network.id}">View Stations</a></p>
            `;
            networksContainer.appendChild(networkDiv);
        });
    }

    // Data ophalen en renderen
    fetch('/networks')
        .then(response => response.json())
        .then(data => {
            networksData = data.networks; // Bewaar de volledige dataset
            renderNetworks(networksData); // Render alle netwerken bij de start
        })
        .catch(error => console.error('Error fetching data:', error));

    // Filteren op basis van invoer
    filterInput.addEventListener('input', () => {
        const filterText = filterInput.value.toLowerCase();
        const filteredNetworks = networksData.filter(network =>
            network.name.toLowerCase().includes(filterText)
        );
        renderNetworks(filteredNetworks); // Render gefilterde netwerken
    });
});
