import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Party from "./Party";
import Text from "./Text";

export default class PreMatch extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getPreGameUI(state) {
    if (state == "created") {
      return (
        <Text
          text="<- Equip your heroes"
          size={Variables.tileSize * 0.25}
          color="red"
          position={[
            Variables.tileSize * 1.5,
            0,
            Variables.tileSize * (Variables.tilesPerColumn - 0.5),
          ]}
          rotation={[
            -90,
            0,
            0,
          ]}
        />
      );
    }
  }

  render() {
    return (
      <Entity
        id="pre-match"
      >

        {/*{this.getPreGameUI(this.props.game.state)}*/}

      </Entity>
    );
  }

}
