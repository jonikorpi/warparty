import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Tile from "./Tile";

export default class Player extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getTiles(data) {
    let tiles = [];

    for (let row=0; row<Variables.tilesPerColumn; row++) {
      for (let column=0; column<Variables.tilesPerRow; column++) {
        tiles.push([column, 0, row]);
      }
    }

    return tiles.map(
      function(tile, i) {
        return <Tile position={[tile[0], tile[1], tile[2]]} key={i}/>;
      }
    );
  }

  render() {
    return (
      <Entity
        id="grid"
        position={[
          -Variables.tileSize * Variables.tilesPerRow * 0.5,
          0,
          -Variables.tileSize * Variables.tilesPerColumn * 0.5,
        ]}
      >

        {this.getTiles()}

      </Entity>
    );
  }

}
