import React, { Component } from "react";
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
      case 0:
        return "Default Armor";
      case 1:
        return "Default Shield";
      case 2:
        return "Default Sword";
    }
  }

  render() {
    return (
      <Entity
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
          color="grey"
        />

      </Entity>
    );
  }

}
