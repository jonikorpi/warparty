import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Hero from "./Hero";

export default class Party extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  getHeroes(heroes, partyID) {
    const party = partyID || 0;

    return heroes.map(
      function(hero, i) {
        return <Hero data={hero} party={party} key={i}/>;
      }
    );
  }

  render() {
    return (
      <Entity
        class="party"
      >

        {this.getHeroes(this.props.data.heroes, this.props.partyID)}

      </Entity>
    );
  }

}
