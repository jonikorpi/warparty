import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";
import "aframe-text-component";

import Variables from "../Variables";

export default class Text extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getSize(size) {
    return size || Variables.tileSize/10;
  }

  render() {
    return (
      <Entity
        class="text"
        text={{
          text: this.props.text,
          style: this.props.style || "normal",
          size: this.getSize(this.props.size),
          height: this.props.height || this.getSize(this.props.size) * 0.034,
          font: "helvetiker",
          curveSegments: 12,
          bevelEnabled: false,
          bevelThickness: Variables.tileSize/10,
          bevelSize: Variables.tileSize/10,
        }}
        material={{
          color: this.props.color || "white",
        }}
        position={this.props.position || [0,0,0]}
        rotation={this.props.rotation || [0,0,0]}
        look-at={this.props.lookAtCamera ? "#camera" : ""}
      />
    );
  }

}
