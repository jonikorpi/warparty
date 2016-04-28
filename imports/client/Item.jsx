import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Text from "./Text";

export default class Item extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getEffectName(type) {
    switch (type) {
      case 1:
        return "Armor";
      case 2:
        return "Shield";
      case 3:
        return "Sword";
    }
  }

  render() {
    return (
      <Entity
        rotation={[
          0,
          270,
          0,
        ]}
        position={[
          0,
          Variables.heroHeight * 0.5 - (2 * this.props.index * Variables.tileSize*0.125),
          Variables.heroWidth * 0.5,
        ]}
      >

        <Text
          text={`${this.getEffectName(this.props.data)}`}
          size={Variables.tileSize*0.125}
          position={[
            0,
            0,
            0,
          ]}
          rotation={[
            0,
            90,
            0,
          ]}
          color="cyan"
        />

      </Entity>
    );
  }

}
