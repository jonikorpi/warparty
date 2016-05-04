import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

export default class StarLight extends Component {
  render() {
    return (
      <Entity
        id="starLight"
        light={{
          type: "directional",
          intensity: 1,
        }}
        position={[2, 2, -2]}
      />
    );
  }
}
