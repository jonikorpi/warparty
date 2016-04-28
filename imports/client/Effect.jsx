import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Text from "./Text";

export default class Hero extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getEffectName(type) {
    switch (type) {
      case 1:
        return "Stun";
      case 2:
        return "Root";
    }
  }

  render() {
    return (
      <Entity
        rotation={[
          -90,
          0,
          0,
        ]}
        position={[
          0,
          Variables.heroHeight * 0.618,
          0,
        ]}
      >

        <Text
          text={`${this.getEffectName(this.props.data.type)} (${this.props.data.duration})`}
          size={Variables.tileSize*0.125}
          position={[
            0,
            -2 * this.props.index * Variables.tileSize*0.125,
            0,
          ]}
          color="yellow"
        />

      </Entity>
    );
  }

}
