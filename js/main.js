fetch('./data/players.json?v=' + new Date().getTime())
    .then(response => response.json())
    .then(players => {
        const playersDiv = document.getElementById('players');
        const searchInput = document.getElementById('searchInput');

        function displayPlayers(filteredPlayers) {
            playersDiv.innerHTML = '';

            filteredPlayers.forEach(player => {
                playersDiv.innerHTML += `
                    <div class="col-md-4 col-lg-3 mb-4">
                        <a href="player.html?id=${player.id}" class="text-decoration-none text-dark">
                            <div class="card player-card h-100 shadow-sm">
                                <img 
                                    src="${player.image}" 
                                    class="card-img-top player-photo" 
                                    alt="${player.player}"
                                >
                                <div class="card-body">
                                    <h5 class="card-title">${player.player}</h5>
                                    <p class="card-text mb-1"><strong>Position:</strong> ${player.position}</p>
                                    <p class="card-text mb-1"><strong>Age:</strong> ${player.age}</p>
                                    <p class="card-text"><strong>Nationality:</strong> ${player.nationality}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            });
        }

        displayPlayers(players);

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const searchValue = searchInput.value.toLowerCase();

                const filteredPlayers = players.filter(player =>
                    player.player.toLowerCase().includes(searchValue) ||
                    player.position.toLowerCase().includes(searchValue) ||
                    player.nationality.toLowerCase().includes(searchValue)
                );

                displayPlayers(filteredPlayers);
            });
        }
    })
    .catch(error => {
        console.error('Error loading players:', error);
    });