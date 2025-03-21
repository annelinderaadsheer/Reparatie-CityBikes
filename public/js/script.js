document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('filterInput'); // Filteren netwerken
    const networksContainer = document.getElementById('networks'); // Netwerken weergeven
    const viewMoreBtn = document.getElementById('viewMoreBtn'); // Meer netwerken tonen
    let networksData = []; 
    let displayedNetworks = 6;

    // Netwerken renderen
    function renderNetworks(networks) {
        networksContainer.innerHTML = '';  // Alle netwerken verwijderen
        networks.slice(0, displayedNetworks).forEach(network => {  // Eerste 6 netwerken tonen
            const networkDiv = document.createElement('div');
            networkDiv.className = 'network';
            networkDiv.innerHTML = `
                <h2>${network.name}</h2>
                <p><a href="network.html?id=${network.id}">Bekijk Stations</a></p>
            `;
            networksContainer.appendChild(networkDiv);
        });

        // "View More" knop alleen tonen als er meer netwerken zijn
        if (networks.length > displayedNetworks) {
            viewMoreBtn.style.display = 'inline-block';  
        } else {
            viewMoreBtn.style.display = 'none';  
        }
    }

    // Data ophalen van de API
    fetch('/networks')
        .then(response => response.json()) // Data wordt omgezet naar JSON
        .then(data => {
            networksData = data.networks;  // Bewaar de volledige data
            renderNetworks(networksData);  // Render de eerste 6 netwerken
        })
        .catch(error => console.error('Error fetching data:', error));

    // Filteren op basis van input
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


// View transitions
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", async (event) => {
            event.preventDefault();
            const url = event.target.href;
            
            if (!document.startViewTransition) {
                window.location.href = url; // Fallback voor niet-ondersteunde browsers
                return;
            }

            document.startViewTransition(async () => {
                const response = await fetch(url);
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                document.body.innerHTML = doc.body.innerHTML;
                window.history.pushState({}, "", url);
            });
        });
    });
});