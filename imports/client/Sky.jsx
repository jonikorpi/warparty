import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Sky extends Component {
  render() {
    return (
      <Entity
        id="sky"
        geometry={{
          primitive: "sphere",
          radius: Variables.clipRange,
        }}
        material={{
          // color: this.props.color || "#fff",
          shader: "flat",
          src: "url(/starfield.png)",
        }}
        scale={[1, 1, -1]}
      />
    );
  }
}
