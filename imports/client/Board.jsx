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

export default class World extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

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
          devMode={this.props.devMode}
          inVR={this.props.inVR}
          state={this.props.state}
        />

        <Sky/>
        <Floor/>

        <AmbientLight/>
        <StarLight/>

        <Grid/>

      </Scene>
    );
  }

}
