import React, { Component } from "react";
import Track from "components/Track";
import Tone from "tone";

export default class TrackGrid extends Component {
  constructor(props) {
    super(props);
    Tone.Transport.bpm.value = props.bpm;
    //add a limiter to prevent clipping.
    Tone.Master.chain(new Tone.Limiter(-6));
    //stores Ids of tracks that are playing
    this.activeTrackIds = new Set();
    this.activateTrack = this.activateTrack.bind(this);
    this.deactivateTrack = this.deactivateTrack.bind(this);
  }

  activateTrack(trackId) {
    this.activeTrackIds.add(trackId);
  }

  deactivateTrack(trackId) {
    this.activeTrackIds.delete(trackId);
  }

  render() {
    const tracks = this.props.samples.map((trackSamples, index) => (
      <Track
        key={index}
        index={index}
        samples={trackSamples}
        effectsNode={this.props.effectChains[index].getAudioNode()}
        activateTrack={id => {
          this.activateTrack(id);
        }}
        deactivateTrack={id => {
          this.deactivateTrack(id);
        }}
        getNumActiveTracks={() => {
          return this.activeTrackIds.size;
        }}
      />
    ));

    return (
      <div
        className="flex-container-row center-contents section TrackGrid"
      >
        {tracks}
      </div>
    );
  }
}
