import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: '',
            playlistTracks: [],
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }
    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.ID === track.ID)) {
            return;
        } else {
            this.setState(
                {
                    playlistTracks: [...this.state.playlistTracks, track]
                }
            );
        }
    }
    removeTrack(track) {
        this.setState({
            playlistTracks: this.state.playlistTracks.filter(element => element !== track)
        })
    }

    updatePlaylistName(name) {
        this.setState({
            playlistName: name
        });
    }
    savePlaylist() {
        const tracksURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.URI);
        Spotify.savePlaylist(this.state.playlistName, tracksURIs);

        if (this.state.playlistName) {
            this.setState({
                playlistTracks: [],
            });
        }
        this.updatePlaylistName('');
    }
    search(term) {
        Spotify.search(term)
            .then(searchResults => this.setState({
                searchResults: searchResults
            }));
    }
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults onAdd={this.addTrack}
                                       searchResults={this.state.searchResults}
                        />
                        <Playlist onSave={this.savePlaylist}
                                  onNameChange={this.updatePlaylistName}
                                  onRemove={this.removeTrack}
                                  playlistName={this.state.playlistName}
                                  playlistTracks={this.state.playlistTracks}
                                  searchResults={this.state.searchResults}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
