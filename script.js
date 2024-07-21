const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
const clientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';
let token = '';

const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    token = data.access_token;
};

const getArtists = async () => {
    const result = await fetch('https://api.spotify.com/v1/artists?ids=3TVXtAsR1Inumwj472S9r4,1Xyo4u8uXC1ZmMpatF05PJ', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    displayArtists(data.artists);
};

const displayArtists = (artists) => {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<h2>Artists</h2>';
    artists.forEach(artist => {
        contentDiv.innerHTML += `<p>${artist.name}</p>`;
    });
};

const getAlbums = async () => {
    const result = await fetch('https://api.spotify.com/v1/albums?ids=4aawyAB9vmqN3uQ7FjRGTy,0vF9l4P8Q7vGaPCv3xaFFX', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    displayAlbums(data.albums);
};

const displayAlbums = (albums) => {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<h2>Albums</h2>';
    albums.forEach(album => {
        contentDiv.innerHTML += `<p>${album.name}</p>`;
    });
};

document.getElementById('artists-link').addEventListener('click', () => {
    getToken().then(getArtists);
});

document.getElementById('albums-link').addEventListener('click', () => {
    getToken().then(getAlbums);
});

window.onload = () => {
    getToken().then(getArtists);
};
