import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../../Variables";

export default class Joint extends Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <Entity
        className={`joint ${this.props.className}`}
        position={this.props.position}
        rotation={this.props.rotation}
        geometry={{
          primitive: "sphere",
          radius: Variables.heroHeight / 40,
        }}
        material={{
          color: "yellow",
        }}
      >

        {this.props.children}

      </Entity>
    );
  }

}
