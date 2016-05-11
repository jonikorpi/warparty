import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../../Variables";

export default class Arm extends Component {

  constructor(props) {
    super();

    this.state = {
      body: props.body,
      arm: props.arm,
    };

    this.shoulderJoint = this.shoulderJoint.bind(this);
    this.elbowJoint = this.elbowJoint.bind(this);
    this.wristJoint = this.wristJoint.bind(this);
    this.knuckleJoint = this.knuckleJoint.bind(this);
  }

  componentDidMount() {

  }

  shoulderJoint(state) {
    return [
      state.arm.shoulderJoint[0],
      state.arm.shoulderJoint[1],
      state.arm.shoulderJoint[2],
    ];
  }

  elbowJoint(state) {
    return [
      state.arm.elbowJoint[0],
      state.arm.elbowJoint[1],
      state.arm.elbowJoint[2],
    ];
  }

  wristJoint(state) {
    return [
      state.arm.wristJoint[0],
      state.arm.wristJoint[1],
      state.arm.wristJoint[2],
    ];
  }

  knuckleJoint(state) {
    return [
      state.arm.knuckleJoint[0],
      state.arm.knuckleJoint[1],
      state.arm.knuckleJoint[2],
    ];
  }

  render() {
    return (
      <Entity
        className="shoulder-joint"
        position={this.props.position}
        rotation={this.shoulderJoint(this.state)}
        scale={this.props.scale}
      >
        <Entity
          className="arm"
          geometry={{
            primitive: "box",
            width:  this.state.body.arms.armWidth,
            height: this.state.body.arms.armHeight,
            depth:  this.state.body.arms.armDepth,
          }}
          position={[
            this.state.body.arms.armWidth * 0.5,
            this.state.body.arms.armHeight * 0.5,
            0,
          ]}
          material={{
            color: "cyan",
          }}
        >
          <Entity
            className="elbow-joint"
            position={[
              0,
              this.state.body.arms.armHeight * 0.5,
              0,
            ]}
            rotation={this.elbowJoint(this.state)}
          >
            <Entity
              className="forearm"
              geometry={{
                primitive: "box",
                width:  this.state.body.arms.forearmWidth,
                height: this.state.body.arms.forearmHeight,
                depth:  this.state.body.arms.forearmDepth,
              }}
              position={[
                0,
                this.state.body.arms.forearmHeight * 0.5,
                0,
              ]}
              material={{
                color: "red",
              }}
            >
              <Entity
                className="wrist-joint"
                position={[
                  0,
                  this.state.body.arms.forearmHeight * 0.5,
                  0,
                ]}
                rotation={this.wristJoint(this.state)}
              >
                <Entity
                  className="palm"
                  geometry={{
                    primitive: "box",
                    width:  this.state.body.arms.palmWidth,
                    height: this.state.body.arms.palmHeight,
                    depth:  this.state.body.arms.palmDepth,
                  }}
                  position={[
                    0,
                    this.state.body.arms.palmHeight * 0.5,
                    0,
                  ]}
                  material={{
                    color: "cyan",
                  }}
                >
                  <Entity
                    className="knuckle-joint"
                    position={[
                      0,
                      this.state.body.arms.palmHeight * 0.5,
                      0,
                    ]}
                    rotation={this.knuckleJoint(this.state)}
                  >
                    <Entity
                      className="fingers"
                      geometry={{
                        primitive: "box",
                        width:  this.state.body.arms.fingersWidth,
                        height: this.state.body.arms.fingersHeight,
                        depth:  this.state.body.arms.fingersDepth,
                      }}
                      position={[
                        0,
                        this.state.body.arms.fingersHeight * 0.5,
                        0,
                      ]}
                      material={{
                        color: "red",
                      }}
                    >

                    </Entity>
                  </Entity>
                </Entity>
              </Entity>
            </Entity>
          </Entity>
        </Entity>
      </Entity>
    );
  }

}
