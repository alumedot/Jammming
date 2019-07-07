const clientId = 'f0fc4cde71de4e80b6a5333954214e98';
const redirectURI = 'http://localhost:3000/';
let accessToken = '';
let expiresIn = '';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (urlAccessToken && urlExpiresIn) {
            accessToken = urlAccessToken[1];
            expiresIn = urlExpiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
        }
    },
    search(term) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => {
                    return {
                        ID: track.id,
                        Name: track.name,
                        Artist: track.artists[0].name,
                        Album: track.album.name,
                        URI: track.uri,
                    }
                })
            } else {
                return [];
            }
        });
    },
    savePlaylist(playlistName, tracksURIs) {
        if (playlistName && tracksURIs && tracksURIs.length !== 0) {
            let headers = {
                Authorization: `Bearer ${accessToken}`
            };
            let userId = '';
            let playlistID = '';
            fetch('https://api.spotify.com/v1/me', {
                headers: headers
            })
                .then(response => response.json())
                .then(jsonResponse => userId = jsonResponse.id)
                .then(() => {
                    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                            name: playlistName,
                        }),
                    })
                        .then(response => response.json())
                        .then(jsonResponse => playlistID = jsonResponse.id)
                        .then(() => {
                            fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify({
                                    uris: tracksURIs
                                })
                            })
                                // .then(response => response.json())
                                // .then(responseJson => playlistID = responseJson.id);
                        })
                });
        }
    }
};

export default Spotify;