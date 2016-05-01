import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import ReactMixin from "react-mixin";
import ReactLocalStorage from "react-localstorage";
import { Random } from 'meteor/random';

import Variables from "../Variables";

import Party from "./Party";
import Text from "./Text";

export default class PartySelector extends Component {

  constructor(props) {
    super();

    this.state = {
      playerID: localStorage.playerID || Random.secret(43),
      heroItems: localStorage.heroItems || this.getDefaultHeroItems(),
    };
  }

  componentDidMount() {

  }

  getStateFilterKeys() {
    return [
      "playerID",
      "heroItems",
    ];
  }

  getDefaultHeroItems() {
    let heroItems = [];

    for (let i = 0; i < Variables.heroesPerParty; i++) {
      heroItems.push( { items: [0,1,2] } );
    };

    return heroItems;
  }

  getDefaultParty(heroItems) {
    let party = {
      heroes: [],
    };

    for (let i = 0; i < Variables.heroesPerParty; i++) {
      party.heroes.push(
        {
          position: [0, 0, Variables.tilesPerColumn-1-i],
          rotation: [0, 0, 0],
          items: heroItems[i].items,
        },
      )
    };

    return party;
  }

  render() {
    return (
      <Entity
        id="party-selector"
      >

        <Party
          data={this.getDefaultParty(this.state.heroItems)}
          partyID={0}
        />

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

      </Entity>
    );
  }

};

ReactMixin(PartySelector.prototype, ReactLocalStorage);
