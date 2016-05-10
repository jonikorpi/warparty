import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Text from "./Text";

export default class MatchUI extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <Entity
        position={
          [
            (Variables.tilesPerRow / 3) * Variables.tileSize * 1.5,
            0,
            0,
          ]
        }
      >

        <Text
          text="MatchUI"
        />

      </Entity>
    );
  }

}
