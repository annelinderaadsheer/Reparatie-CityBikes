document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('filterInput');
    const networksContainer = document.getElementById('networks');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    let networksData = []; 
    let displayedNetworks = 6; // Begin met het tonen van 6 netwerken

    // Functie om de netwerken te renderen
    function renderNetworks(networks) {
        networksContainer.innerHTML = '';  // Clear the existing networks
        networks.slice(0, displayedNetworks).forEach(network => {  // Show up to 'displayedNetworks'
            const networkDiv = document.createElement('div');
            networkDiv.className = 'network';
            networkDiv.innerHTML = `
                <h2>${network.name}</h2>
                <p><strong>ID:</strong> ${network.id}</p>
                <p><a href="network.html?id=${network.id}">Bekijk Stations</a></p>

            `;
            networksContainer.appendChild(networkDiv);
        });

        // Show or hide the "View More" button
        if (networks.length > displayedNetworks) {
            viewMoreBtn.style.display = 'inline-block';  // Show the button if there are more networks
        } else {
            viewMoreBtn.style.display = 'none';  // Hide the button if there are no more networks
        }
    }

    // Data ophalen en renderen
    fetch('/networks')
        .then(response => response.json())
        .then(data => {
            networksData = data.networks;  // Bewaar de volledige dataset
            renderNetworks(networksData);  // Render de eerste batch van 6 netwerken
        })
        .catch(error => console.error('Error fetching data:', error));

    // Filteren op basis van invoer
    filterInput.addEventListener('input', () => {
        const filterText = filterInput.value.toLowerCase();
        const filteredNetworks = networksData.filter(network =>
            network.name.toLowerCase().includes(filterText)
        );
        renderNetworks(filteredNetworks);  // Render gefilterde netwerken
    });

    // Klikken op de "View More" knop om meer netwerken weer te geven
    viewMoreBtn.addEventListener('click', () => {
        displayedNetworks += 6;  // Toon er 6 meer bij
        renderNetworks(networksData);  // Render de netwerken met de nieuwe limiet
    });
});
