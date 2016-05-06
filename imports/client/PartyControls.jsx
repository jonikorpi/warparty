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

  render() {
    return (
      <Text
        text="PartyControls"
      />
    );
  }

}
