import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

export default class Cursor extends Component {

  render() {
    return (
      <Entity
        cursor={{
          fuse: false,
          maxDistance: Variables.cameraAltitude * 2,
        }}
        geometry={{
          primitive: "ring",
          radiusInner: Variables.cursorSize * Variables.cursorThickness,
          radiusOuter: Variables.cursorSize,
        }}
        material={{
          color: "white",
          shader: "flat",
        }}
        position={[
          0,
          0,
          -Variables.cursorDistance,
        ]}
      >

        <Animation
          begin="mousedown"
          easing="ease-out"
          attribute="scale"
          fill="both"
          to={[Variables.cursorShrink, Variables.cursorShrink, Variables.cursorShrink]}
          from="1 1 1"
          dur={Variables.shortTime(6)}
        />

        <Animation
          begin="mouseup"
          easing="ease-out"
          attribute="scale"
          fill="both"
          from={[Variables.cursorShrink, Variables.cursorShrink, Variables.cursorShrink]}
          to="1 1 1"
          dur={Variables.shortTime(6)}
        />

      </Entity>
    );
  }

}
