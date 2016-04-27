import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Effect from "./Effect";

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

  getEffects(effects) {
    if (effects.length > 0) {
      return effects.map(
        function(effect, i) {
          return <Effect data={effect} key={i}/>;
        }
      );
    }
  }

  getRotation(party) {
    let rotation = 0;

    switch (party) {
      case 0:
        rotation = -90;
        break;
      case 1:
        rotation = 90;
        break;
    }

    return rotation;
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
              width: Variables.heroWidth,
              height: Variables.heroHeight,
              depth: Variables.heroDepth,
            }}
            material={{
              color: "red",
            }}
            onClick={this.onPlayerClick}
            onMouseEnter={this.startPlayerHover}
            onMouseLeave={this.endPlayerHover}
            rotation={[
              0,
              this.getRotation(this.props.party),
              0,
            ]}
            position={[
              interpolation.heroPositionX + Variables.tileSize * 0.5,
              interpolation.heroPositionY + Variables.heroHeight * 0.5,
              interpolation.heroPositionZ + Variables.tileSize * 0.5,
            ]}
          >

            {this.getEffects(this.props.data.effects)}

          </Entity>
        }
      </Motion>
    );
  }

}
