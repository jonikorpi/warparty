import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Floor extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <Entity
        id="floor"
        geometry={{
          primitive: "plane",
          width: Variables.clipRange*2,
          height: Variables.clipRange*2,
        }}
        material={{
          color: "white",
          transparent: true,
          opacity: 0.146,
        }}
        position={[0,0,0]}
        rotation={[-90, 0, 0]}
      >

      </Entity>
    );
  }

}
