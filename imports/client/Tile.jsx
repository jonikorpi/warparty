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
      position[0] + Variables.tileSize * 0.5,
      0,
      position[2] + Variables.tileSize * 0.5,
    ];
  }

  getColor(type) {
    switch (type) {
      case 0:
        return "black";
        break;
      case 1:
        return "rgb(161,193,110)";
        break;
    }
  }

  render() {
    return (
      <Entity
        class="tile"
        geometry={{
          primitive: "box",
          width: Variables.tileSize,
          height: Variables.tileSize,
          depth: Variables.tileSize,
        }}
        material={{
          color: this.getColor(this.props.type),
        }}
        type={this.props.type}
        position={this.getPosition(this.props.position)}
      >

      </Entity>
    );
  }

}
