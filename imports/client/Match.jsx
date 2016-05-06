import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Structure from "./Structure";
import Party from "./Party";
import Text from "./Text";

export default class Match extends Component {

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
      <Entity id="match">

        {this.getParties([this.props.match.leftParty, this.props.match.rightParty])}
        {this.getStructures(this.props.match.structures)}

        {/*
          {this.getReadinessUI(this.props.game.parties[0], 0)}
          {this.getReadinessUI(this.props.game.parties[1], 1)}
        */}

      </Entity>
    );
  }

}
