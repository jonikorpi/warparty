import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Text from "./Text";

export default class PartyControls extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  // getReadinessUI(party) {
  //   if (party.heroes.length > 0) {
  //     let text, positionX;
  //
  //     switch (party.ready) {
  //       case true:
  //         text = "Ready";
  //         break;
  //       case false:
  //         text = "Not ready";
  //         break;
  //     }
  //
  //     switch (partyID) {
  //       case 0:
  //         positionX = 0;
  //         break;
  //       case 1:
  //         positionX = Variables.tileSize * (Variables.tilesPerRow - 3);
  //         break;
  //     }
  //
  //     return (
  //       <Text
  //         key={partyID}
  //         text={text}
  //         size={Variables.tileSize * 0.375}
  //         color="white"
  //         position={[
  //           positionX,
  //           Variables.tileSize * 0.236,
  //           0,
  //         ]}
  //       />
  //     );
  //   }
  // }

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
          text="Party controls"
        />

      </Entity>
    );
  }

}
