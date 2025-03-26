const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const artistContainer = document.querySelector('.grid-container');

function requestApi(searchTerm) {
    const url = `http://localhost:5500/api-artists/artists.json`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Dados da API antes do filtro:", data);

            // Acesse o array de artistas através da propriedade 'artists'
            const artists = data.artists;

            const filteredArtists = artists.filter(artist =>
                artist.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            console.log("Dados filtrados:", filteredArtists);
            displayResults(filteredArtists);
        })
        .catch(error => console.error("Erro na API:", error));
}

// Restante do seu código...


function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");

    artistContainer.innerHTML = ''; // Limpa os resultados anteriores

    if (!result || result.length === 0) {
        console.log("Nenhum artista encontrado.");
        artistContainer.innerHTML = '<p>Nenhum artista encontrado</p>';
        return;
    }

    result.forEach(artist => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");

        artistCard.innerHTML = `
            <div class="card-img">
                <img src="${artist.urlImg}" alt="${artist.name}" class="artist-img">
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
           <div class="card-text">
    <a title="${artist.name}" class="vst" href="#">
        <span class="artist-name">${artist.name}</span>
    </a>
    <span class="artist-categorie">${artist.genre}</span>
</div>        `;

        artistContainer.appendChild(artistCard);
    });
}

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    console.log("Termo digitado:", searchTerm); // Depuração

    if (searchTerm === '') {
        console.log("Campo de busca vazio, restaurando playlists...");
        resultPlaylist.classList.remove("hidden");
        resultArtist.classList.add("hidden");
        return;
    }

    requestApi(searchTerm);
});
