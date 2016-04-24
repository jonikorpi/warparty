import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Segment extends Component {

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
          width: Variables.tileSize * 0.91,
          height: Variables.tileSize * 0.91,
        }}
        material={{
          color: "white",
        }}
        rotation={[-90, 0, 0]}
        position={this.getPosition(this.props.position)}
      >

      </Entity>
    );
  }

}
