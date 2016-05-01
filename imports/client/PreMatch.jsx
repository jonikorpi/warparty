import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import PartySelector from "./PartySelector";

export default class PreMatch extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <Entity
        id="pre-match"
      >

        <PartySelector/>

      </Entity>
    );
  }

}
