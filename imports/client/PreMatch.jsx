import React, { Component } from "react";
import { browserHistory } from "react-router";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import PartySelector from "./PartySelector";
import Text from "./Text";

export default class PreMatch extends Component {

  constructor(props) {
    super();

    this.createMatch = this.createMatch.bind(this);

    this.state = {
      state: "initial",
    };
  }

  componentDidMount() {

  }

  createMatch() {
    const that = this;
    const localStorageData = JSON.parse( localStorage.getItem("PartySelector") );

    that.setState({state: "creating"});

    Meteor.call(
      "matches.create",
      localStorageData.playerID,
      localStorageData.heroItems,
      function (error, matchID) {
        if (error) {
          that.setState({state: "error"});
          console.log(error);
        }
        else if (matchID) {
          that.setState({state: "redirecting"});
          browserHistory.push(`/${matchID}`);
        }
      }
    );
  }

  getPlayTextOffset(state) {
    if (state == "initial") {
      return Variables.tileSize * 0.375 * 0.5;
    }
    else {
      return Variables.tileSize * 0.375 * 0.333;
    }
  }

  getSmallText(state) {
    switch (state) {
      case "initial":
        return "";
      case "creating":
        return "Creating a game…";
      case "redirecting":
        return "Redirecting to game…";
      case "error":
        return "Error! Try again?";
    }
  }

  render() {
    return (
      <Entity id="pre-match">

        <Text
          class="logo"
          text="SOTAJOUKKO"
          position={[
            0,
            Variables.tileSize*0.236,
            0,
          ]}
        />

        <Entity
          class="start-playing-button"
          geometry={{
            primitive: "box",
            width: Variables.tileSize * 2,
            height: Variables.tileThickness,
            depth: Variables.tileSize,
          }}
          material={{
            color: "green",
          }}
          position={[
            Variables.tileSize * (Variables.tilesPerRow - 3) + (Variables.tileSize * 3 * 0.5),
            Variables.tileThickness * 0.5,
            Variables.tileSize * (Variables.tilesPerColumn * 0.5),
          ]}
          onClick={this.createMatch}
        >

          <Text
            text="PLAY"
            size={Variables.tileSize * 0.375}
            height={Variables.tileThickness}
            rotation={[
              -90,
              0,
              0,
            ]}
            position={[
              -Variables.tileSize * 0.375 * 1.6,
              Variables.tileThickness * 0.5 * 0.5,
              this.getPlayTextOffset(this.state.state),
            ]}
            onClick={this.createMatch}
          />

          <Text
            text={this.getSmallText(this.state.state)}
            size={Variables.tileSize * 0.125}
            height={Variables.tileThickness}
            rotation={[
              -90,
              0,
              0,
            ]}
            position={[
              -Variables.tileSize * 0.375 * 1.6,
              Variables.tileThickness * 0.5 * 0.5,
              Variables.tileSize * 0.375,
            ]}
            onClick={this.createMatch}
          />

        </Entity>

        <PartySelector/>

      </Entity>
    );
  }

}
