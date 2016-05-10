import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Structure from "./Structure";
import Party from "./Party";
import PartyDisplay from "./PartyDisplay";
import PartyControls from "./PartyControls";
import MatchUI from "./MatchUI";

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

  getPartyUIs(parties, matchState) {
    return parties.map(
      function(party, partyID) {
        if (party.playerID) {
          return (
            <PartyControls
              party={party}
              partyID={partyID}
              matchState={matchState}
              key={partyID}
            />
          );
        }
        else {
          return (
            <PartyDisplay
              party={party}
              partyID={partyID}
              matchState={matchState}
              key={partyID}
            />
          );
        }
      }
    );
  }

  render() {
    return (
      <Entity id="match">

        {this.getParties([this.props.match.leftParty, this.props.match.rightParty])}
        {this.getStructures(this.props.match.structures)}

        <Entity id="above-board-UIs"
          rotation={[-67.5, 0, 0]}
          position={[
            0,
            0,
            Variables.tileSize * -1.5,
          ]}
        >
          <MatchUI match={this.props.match}/>
          {this.getPartyUIs([this.props.match.leftParty, this.props.match.rightParty], this.props.match.state)}
        </Entity>

      </Entity>
    );
  }

}
