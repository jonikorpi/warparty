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

  render() {
    return (
      <Entity
        geometry={{
          primitive: "ring",
          radiusInner: Variables.heroWidth,
          radiusOuter: Variables.heroWidth*1.09,
        }}
        material={{
          color: "cyan",
        }}
        rotation={[
          -90,
          0,
          90,
        ]}
        position={[
          0,
          Variables.heroHeight * 0.618,
          0,
        ]}
      >

        <Text
          text={this.props.data.duration}
          size={Variables.tileSize*0.25}
          color="cyan"
        />

      </Entity>
    );
  }

}
