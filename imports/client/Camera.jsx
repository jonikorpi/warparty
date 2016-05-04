import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";
import "aframe-mouse-cursor-component";

import Variables from "../Variables";

import Cursor from "./Cursor";

export default class Camera extends Component {

  getCameraAltitude(width, height) {
    const boardAspectRatio =
      (Variables.tilesPerRow * Variables.tileSize) /
      ((Variables.tilesPerColumn * 1.5) * Variables.tileSize / (90 / Variables.cameraPositionAngle))
    ;
    let aspectRatio = (width / height);

    if (aspectRatio > boardAspectRatio) {
      aspectRatio = boardAspectRatio;
    }

    return (Variables.cameraPositionAngle / 90) / (aspectRatio / (Variables.tileSize * 11));
  }

  getVRCameraAltitude() {
    return 2;
  }

  render() {
    return (
      <Entity
        id="camera-container"
        rotation={[
          -Variables.cameraPositionAngle,
          0,
          0,
        ]}
        position={[
          0,
          0,
          Variables.tileSize * (Variables.tilesPerColumn/10) / (Variables.cameraPositionAngle / 90),
        ]}
      >

        <Entity
          position={[
            0,
            0,
            this.props.inVR ? this.getVRCameraAltitude() : this.getCameraAltitude(this.props.width, this.props.height),
          ]}
          rotation={[
            Variables.cameraPositionAngle,
            0,
            0,
          ]}
        >

          <Entity
            id="camera"
            camera={{
              far: this.props.far || 10000,
              near: this.props.near || 0.001,
            }}
            rotation={[
              -Variables.cameraPositionAngle,
              0,
              0
            ]}
            look-controls={{ enabled: this.props.inVR || this.props.devMode }}
            wasd-controls={{
              enabled: this.props.devMode,
              fly: true,
            }}
            mouse-cursor={ !this.props.inVR }
          >

            {/*<Cursor/>*/}

          </Entity>

        </Entity>

      </Entity>
    );
  }

}
