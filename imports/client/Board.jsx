import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Camera from "./Camera";
import Sky from "./Sky";
import Floor from "./Floor";
import AmbientLight from "./AmbientLight";
import StarLight from "./StarLight";

import Grid from "./Grid";

import PreMatch from "./PreMatch";
import Match from "./Match";

export default class Board extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getMatchComponentByState(match) {
    if (match) {
      return (
        <Match match={match}/>
      );
    }
    else {
      return (
        <PreMatch/>
      );
    }
  }

  render() {
    return (
      <Scene
        id="scene"
        vr-mode-ui={{
          enabled: true,
        }}
      >

        <Camera
          id="camera"
          far={Variables.clipRange * 1.5}
          width={this.props.gameState.width}
          height={this.props.gameState.height}
          inVR={this.props.gameState.inVR}
          devMode={this.props.gameState.devMode}
        />

        <Sky/>
        <Floor/>
        <AmbientLight/>
        <StarLight/>

        <Entity
          id="board"
          position={[
            -Variables.tileSize * Variables.tilesPerRow * 0.5,
            0,
            -Variables.tileSize * Variables.tilesPerColumn * 0.5,
          ]}
        >

          <Grid/>

          {this.getMatchComponentByState(this.props.match)}

          {/*{this.getStructures(this.props.game.structures)}
          {this.getParties(this.props.game.parties)}

          {this.getPreGameUI(this.props.game.state)}
          {this.getReadinessUI(this.props.game.parties[0], 0)}
          {this.getReadinessUI(this.props.game.parties[1], 1)}*/}

        </Entity>

      </Scene>
    );
  }

}
