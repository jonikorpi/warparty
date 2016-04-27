import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Tile extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getPosition(position) {
    return [
      position[0] * Variables.tileSize + Variables.tileSize * 0.5,
      position[1] * Variables.tileSize,
      position[2] * Variables.tileSize + Variables.tileSize * 0.5,
    ];
  }

  render() {
    return (
      <Entity
        class="tile"
        geometry={{
          primitive: "plane",
          width: Variables.tileSize * Variables.tileSizeFactor,
          height: Variables.tileSize * Variables.tileSizeFactor,
        }}
        material={{
          color: "white",
          side: "double",
        }}
        rotation={[-90, 0, 0]}
        position={this.getPosition(this.props.position)}
      >

      </Entity>
    );
  }

}
