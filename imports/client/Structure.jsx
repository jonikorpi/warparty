import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Text from "./Text";

export default class Structure extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getPosition(position) {
    return [
      position[0] * Variables.tileSize + Variables.tileSize * 0.5,
      position[1] * Variables.tileSize + Variables.tileSize * Variables.tileSizeFactor * 0.5,
      position[2] * Variables.tileSize + Variables.tileSize * 0.5,
    ];
  }

  render() {
    return (
      <Entity
        class="structure"
        geometry={{
          primitive: "box",
          width: Variables.tileSize * Variables.tileSizeFactor,
          height: Variables.tileSize * Variables.tileSizeFactor,
          depth: Variables.tileSize * Variables.tileSizeFactor,
        }}
        material={{
          color: "grey",
        }}
        position={this.getPosition(this.props.data.position)}
      >

        <Text
          text={this.props.data.duration}
          size={Variables.tileSize/2}
          position={[
            -Variables.tileSize/4,
            Variables.tileSize/2,
            Variables.tileSize/4,
          ]}
          rotation={[-90,0,0]}
        />

      </Entity>
    );
  }

}
