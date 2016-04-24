import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";
import "aframe-mouse-cursor-component";

import Variables from "../Variables";

import Cursor from "./Cursor";

export default class Camera extends Component {

  getCameraAltitude(state) {
    const width = state.width;
    const height = state.height;
    const maxAspectRatio = (Variables.tilesPerRow/5.5) * (Variables.cameraPositionAngle / 90);
    let aspectRatio = (width / height);

    if (aspectRatio > maxAspectRatio) {
      aspectRatio = maxAspectRatio;
    }

    return (Variables.tilesPerRow/10) * (Variables.cameraPositionAngle / 90) / aspectRatio;
  }

  getVRCameraAltitude(state) {
    return 1;
  }

  render() {
    return (
      <Entity
        id="camera"
        rotation={[
          90 - Variables.cameraPositionAngle,
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
            this.props.state.inVR ? this.getVRCameraAltitude(this.props.state) : this.getCameraAltitude(this.props.state),
            0,
          ]}
          rotation={[
            (90 - Variables.cameraPositionAngle) * -1,
            0,
            0,
          ]}
        >

          <Entity
            camera={{
              far: this.props.far || 10000,
              near: this.props.near || 0.001,
            }}
            rotation={[
              -Variables.cameraPositionAngle,
              0,
              0
            ]}
            look-controls={{ enabled: this.props.state.inVR || this.props.state.devMode }}
            wasd-controls={{ enabled: this.props.state.devMode }}
            mouse-cursor={ !this.props.state.inVR }
          >

            {/*<Cursor/>*/}

          </Entity>

        </Entity>

      </Entity>
    );
  }

}
