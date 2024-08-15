document.addEventListener('DOMContentLoaded', () => {
    fetch('/networks')
        .then(response => response.json())
        .then(data => {
            const networksContainer = document.getElementById('networks');
            data.networks.forEach(network => {
                const networkDiv = document.createElement('div');
                networkDiv.className = 'network';
                networkDiv.innerHTML = `
                    <h2>${network.name}</h2>
                    <p><strong>ID:</strong> ${network.id}</p>
                    <p><a href="/network/${network.id}">View Stations</a></p>
                `;
                networksContainer.appendChild(networkDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
