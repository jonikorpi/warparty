import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Hero extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

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
          heroPositionX: spring(Variables.tileSize * this.props.data.position[0], Variables.springConfig),
          heroPositionY: spring(Variables.tileSize * this.props.data.position[1], Variables.springConfig),
          heroPositionZ: spring(Variables.tileSize * this.props.data.position[2], Variables.springConfig),
        }}
      >
        {interpolation =>
          <Entity
            class="hero"
            geometry={{
              primitive: "box",
              width: Variables.tileSize * 0.414,
              height: Variables.tileSize * 1.618,
              depth: Variables.tileSize * 0.236,
            }}
            material={{
              color: "red",
            }}
            onClick={this.onPlayerClick}
            onMouseEnter={this.startPlayerHover}
            onMouseLeave={this.endPlayerHover}
            rotation={[0, this.props.data.facingTowards, 0]}
            position={[
              interpolation.heroPositionX + Variables.tileSize * 0.5,
              interpolation.heroPositionY + Variables.tileSize * 1.618*0.5,
              interpolation.heroPositionZ + Variables.tileSize * 0.5,
            ]}
          >
          </Entity>
        }
      </Motion>
    );
  }

}
