import React, { Component } from "react";
import classNames from "classnames";
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

  render() {
    return (
      <Entity
        class="text"
        text={{
          text: this.props.text,
          style: this.props.style || "normal",
          size: this.props.size || Variables.tileSize/10,
          height: this.props.height || 0,
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
