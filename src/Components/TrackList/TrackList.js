import './TrackList.css';
import React from 'react';
import {Track} from '../Track/Track';

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => <Track onRemove={this.props.onRemove}
                                                       onAdd={this.props.onAdd}
                                                       track={track}
                                                       key={track.ID}/>)}
            </div>
        )
    }
}