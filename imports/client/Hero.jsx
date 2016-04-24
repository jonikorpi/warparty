import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Player extends Component {

  onPlayerClick(event) {
    console.log("player clicked");
  }

  startPlayerHover(event) {
    // console.log(event);
  }

  endPlayerHover(event) {
    // console.log(event);
  }

  render() {
    return (
      <Motion
        style={{
          playerLocationX: spring(this.props.position[0], Variables.springConfig),
          playerLocationY: spring(this.props.position[1], Variables.springConfig),
          playerLocationZ: spring(this.props.position[2], Variables.springConfig),
        }}
      >
        {interpolation =>
          <Entity
            id="player"
            class="player"
            geometry={{
              primitive: "box",
              width: 0.414,
              height: 1.618,
              depth: 0.236,
            }}
            material={{
              color: "#fff",
            }}
            onClick={this.onPlayerClick}
            onMouseEnter={this.startPlayerHover}
            onMouseLeave={this.endPlayerHover}
            rotation={[0, this.props.facingTowards, 0]}
            position={[
              interpolation.playerLocationX + Variables.tileSize * 0.5,
              interpolation.playerLocationY + 1.618*0.5,
              interpolation.playerLocationZ + Variables.tileSize * 0.5,
            ]}
          >
          </Entity>
        }
      </Motion>
    );
  }

}
