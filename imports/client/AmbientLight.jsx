import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

export default class AmbientLight extends Component {
  render() {
    return (
      <Entity
        id="ambientLight"
        light={{
          type: "ambient",
          color: "hsl(0, 0%, 10%)",
        }}
      />
    );
  }
}
