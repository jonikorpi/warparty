import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Tile from "./Tile";

export default class Segment extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getTiles(data) {
    segmentX = data.loc[0];
    segmentZ = data.loc[1];

    let tiles = [];

    data.tiles.map(
      function(row, tileZ) {
        row.map(
          function(tile, tileX) {
            if (tile !== 0) {
              tiles.push(
                {
                  type: tile,
                  position: [tileX, 0, tileZ],
                }
              );
            }
          }
        )
      }
    );

    return tiles.map(
      function(tile, i) {
        return <Tile type={tile.type} position={tile.position} key={i}/>;
      }
    );
  }

  render() {
    return (
      <Entity
        class="segment"
        position={[
          this.props.data.loc[0] * Variables.tilesPerRow,
          0,
          this.props.data.loc[1] * Variables.tilesPerColumn,
        ]}
      >

        {this.getTiles(this.props.data)}

      </Entity>
    );
  }

}
