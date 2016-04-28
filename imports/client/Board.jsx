import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Camera from "./Camera";
import Sky from "./Sky";
import Floor from "./Floor";
import AmbientLight from "./AmbientLight";
import StarLight from "./StarLight";

import Grid from "./Grid";
import Structure from "./Structure";
import Party from "./Party";
import Text from "./Text";

export default class Board extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getStructures(structures) {
    return structures.map(
      function(structure, i) {
        return <Structure data={structure} key={i}/>;
      }
    );
  }

  getParties(parties) {
    return parties.map(
      function(party, i) {
        return <Party data={party} partyID={i} key={i}/>;
      }
    );
  }

  getPreGameUI(turn) {
    if (turn == 0) {
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

  getReadinessUI(party, partyID) {
    let text, positionX;

    switch (party.ready) {
      case true:
        text = "Ready";
        break;
      case false:
        text = "Not ready";
        break;
    }

    switch (partyID) {
      case 0:
        positionX = Variables.tileSize * (2);
        break;
      case 1:
        positionX = Variables.tileSize * (Variables.tilesPerRow - 3);
        break;

    }

    return (
      <Text
        text={text}
        size={Variables.tileSize * 0.25}
        color="black"
        position={[
          positionX,
          0,
          Variables.tileSize * (Variables.tilesPerColumn * 0.5),
        ]}
        rotation={[
          -90,
          0,
          0,
        ]}
      />
    );
  }

  render() {
    return (
      <Scene
        id="board"
        vr-mode-ui={{
          enabled: true,
        }}
      >

        <Camera
          id="camera"
          far={Variables.clipRange * 1.5}
          state={this.props.state}
        />

        <Sky/>
        <Floor/>

        <AmbientLight/>
        <StarLight/>

        <Entity
          id="center"
          position={[
            -Variables.tileSize * Variables.tilesPerRow * 0.5,
            0,
            -Variables.tileSize * Variables.tilesPerColumn * 0.5,
          ]}
        >

          <Grid/>
          {this.getStructures(this.props.game.structures)}
          {this.getParties(this.props.game.parties)}

          {this.getPreGameUI(this.props.game.turn)}
          {this.getReadinessUI(this.props.game.parties[0], 0)}
          {this.getReadinessUI(this.props.game.parties[1], 1)}

        </Entity>

      </Scene>
    );
  }

}
