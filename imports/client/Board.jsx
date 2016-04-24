import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Camera from "./Camera";
import Sky from "./Sky";
import Floor from "./Floor";
import AmbientLight from "./AmbientLight";
import StarLight from "./StarLight";

import Grid from "./Grid";
import Structure from "./Structure";
import Party from "./Party";

export default class Board extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getStructures(structures) {
    return structures.map(
      function(structure, i) {
        return <Structure data={structure} key={i}/>;
      }
    );
  }

  getParties(parties) {
    return parties.map(
      function(party, i) {
        return <Party data={party} key={i}/>;
      }
    );
  }

  render() {
    return (
      <Scene
        id="board"
        vr-mode-ui={{
          enabled: true,
        }}
      >

        <Camera
          id="camera"
          far={Variables.clipRange * 1.5}
          state={this.props.state}
        />

        <Sky/>
        <Floor/>

        <AmbientLight/>
        <StarLight/>

        <Entity
          id="center"
          position={[
            -Variables.tileSize * Variables.tilesPerRow * 0.5,
            0,
            -Variables.tileSize * Variables.tilesPerColumn * 0.5,
          ]}
        >

          <Grid/>
          {this.getStructures(this.props.game.structures)}
          {this.getParties(this.props.game.parties)}

        </Entity>

      </Scene>
    );
  }

}
