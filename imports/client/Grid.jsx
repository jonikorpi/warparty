import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Player extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <Entity
        id="grid"
        geometry={{
          primitive: "plane",
          width: Variables.tileSize * Variables.tilesPerRow,
          height: Variables.tileSize * Variables.tilesPerColumn,
        }}
        rotation={[-90, 0, 0]}
        material={{
          color: "#fff",
        }}
      >
      </Entity>
    );
  }

}
