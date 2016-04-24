import React, { Component } from "react";
import classNames from "classnames";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";
import "aframe-mouse-cursor-component";

import Variables from "../Variables";

import Cursor from "./Cursor";

export default class Camera extends Component {

  render() {
    return (
      <Entity
        id="camera"
        rotation={[
          90 - Variables.cameraPositionAngle,
          0,
          0,
        ]}
      >

        <Entity
          position={[
            0,
            Variables.cameraAltitude,
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
            look-controls={{ enabled: this.props.inVR || this.props.devMode }}
            wasd-controls={{ enabled: this.props.devMode }}
            mouse-cursor={ !this.props.inVR }
          >

            {/*<Cursor/>*/}

          </Entity>

        </Entity>

      </Entity>
    );
  }

}
