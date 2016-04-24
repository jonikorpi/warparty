import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";
import Combokeys from "combokeys";

import Variables from "../Variables";

import BoardContainer from "./Board";

export default class Game extends Component {

  constructor(props) {
    super();

    this.handleResize          = this.handleResize.bind(this);
    this.bindKeyboardShortcuts = this.bindKeyboardShortcuts.bind(this);
    this.toggleDevMode         = this.toggleDevMode.bind(this);
    this.startVR               = this.startVR.bind(this);
    this.stopVR                = this.stopVR.bind(this);

    this.state = {
      inVR: false,
      devMode: false,
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    window.addEventListener("enter-vr", this.startVR);
    window.addEventListener("exit-vr", this.stopVR);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.bindKeyboardShortcuts();
  }

  componentWillUnmount() {
    this.unbindKeyboardShortcuts();
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener("enter-vr", this.startVR);
    window.removeEventListener("exit-vr", this.stopVR);
  }

  handleResize() {
    this.setState({
      width: this.react.getBoundingClientRect().width,
      height: this.react.getBoundingClientRect().height,
    });
  }

  bindKeyboardShortcuts() {
    const that = this;
    let combokeys = new Combokeys(document.documentElement);

    combokeys.bind("g", function() { that.toggleDevMode(); });
    // combokeys.bind(["a", "left"], function() { that.move("left"); });
    // combokeys.bind(["d", "right"], function() { that.move("right"); });
    // combokeys.bind(["w", "up"], function() { that.move("up"); });
    // combokeys.bind(["s", "down"], function() { that.move("down"); });
  }

  unbindKeyboardShortcuts() {
    combokeys.detach();
  }

  toggleDevMode() {
    this.setState({
      devMode: !this.state.devMode,
    });
    console.log("Setting devMode to " + this.state.devMode);
  }

  startVR() {
    this.setState({
      inVR: true,
    });
  }

  stopVR() {
    this.setState({
      inVR: false,
    });
  }

  render() {
    return (
      <div
        id="react"
        className={
          classNames({
            "dev-mode": this.state.devMode,
            "in-vr": this.state.inVR,
          })
        }
        ref={(ref) => this.react = ref}
      >

        <BoardContainer
          devMode={this.state.devMode}
          inVR={this.state.inVR}
        />
      }

      </div>
    );
  }

}
