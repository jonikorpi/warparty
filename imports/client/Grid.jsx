import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Tile from "./Tile";

export default class Grid extends Component {

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
          0,
          0,
          0,
        ]}
      >

        {this.getTiles()}

      </Entity>
    );
  }

}
