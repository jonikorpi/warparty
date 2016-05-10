import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Text from "./Text";

export default class PartyDisplay extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getPosition(partyID) {
    let position = [
      0,
      0,
      0,
    ];

    switch (partyID) {
      case 0:
        position[0] = (Variables.tilesPerRow / 3 * 0.5) * Variables.tileSize;
        break;
      case 1:
        position[0] = (Variables.tilesPerRow / 3 * 2) * Variables.tileSize + (Variables.tilesPerRow / 3 * 0.5) * Variables.tileSize;
        break;
    }

    return position;
  }

  render() {
    return (
      <Entity
        position={this.getPosition(this.props.partyID)}
      >

        <Text
          text="Party display"
        />

      </Entity>
    );
  }

}
