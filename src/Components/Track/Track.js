import './Track.css';
import React from 'react';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    renderAction() {

        if (this.props.onAdd) {
            return (
                <button onClick={this.addTrack}
                        className="Track-action">
                    +
                </button>
            );
        } else {
            return (
                <button onClick={this.removeTrack}
                        className="Track-action">
                    -
                </button>
            )
        }
    }
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.Name}</h3>
                    <p>{this.props.track.Artist} | {this.props.track.Album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}