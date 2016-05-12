import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../../Variables";

import Joint from "./Joint";

export default class Arm extends Component {

  constructor(props) {
    super();

    this.state = {
      model: props.model,
      arm: props.arm,
    };
  }

  render() {
    return (
      <Joint
        className="shoulder-joint"
        position={this.props.position}
        rotation={this.state.arm.shoulderJoint}
      >
        <Entity
          className="arm"
          geometry={{
            primitive: "box",
            width:  this.state.model.arms.armWidth,
            height: this.state.model.arms.armHeight,
            depth:  this.state.model.arms.armDepth,
          }}
          position={[
            0,
            this.state.model.arms.armHeight * 0.5,
            0,
          ]}
          material={{
            color: "cyan",
          }}
        >
          <Joint
            className="elbow-joint"
            position={[
              0,
              this.state.model.arms.armHeight * 0.5,
              0,
            ]}
            rotation={this.state.arm.elbowJoint}
          >
            <Entity
              className="forearm"
              geometry={{
                primitive: "box",
                width:  this.state.model.arms.forearmWidth,
                height: this.state.model.arms.forearmHeight,
                depth:  this.state.model.arms.forearmDepth,
              }}
              position={[
                0,
                this.state.model.arms.forearmHeight * 0.5,
                0,
              ]}
              material={{
                color: "red",
              }}
            >
              <Joint
                className="wrist-joint"
                position={[
                  0,
                  this.state.model.arms.forearmHeight * 0.5,
                  0,
                ]}
                rotation={this.state.arm.wristJoint}
              >
                <Entity
                  className="palm"
                  geometry={{
                    primitive: "box",
                    width:  this.state.model.arms.palmWidth,
                    height: this.state.model.arms.palmHeight,
                    depth:  this.state.model.arms.palmDepth,
                  }}
                  position={[
                    0,
                    this.state.model.arms.palmHeight * 0.5,
                    0,
                  ]}
                  material={{
                    color: "cyan",
                  }}
                >
                  <Joint
                    className="knuckle-joint"
                    position={[
                      0,
                      this.state.model.arms.palmHeight * 0.5,
                      0,
                    ]}
                    rotation={this.state.arm.knuckleJoint}
                  >
                    <Entity
                      className="fingers"
                      geometry={{
                        primitive: "box",
                        width:  this.state.model.arms.fingersWidth,
                        height: this.state.model.arms.fingersHeight,
                        depth:  this.state.model.arms.fingersDepth,
                      }}
                      position={[
                        0,
                        this.state.model.arms.fingersHeight * 0.5,
                        0,
                      ]}
                      material={{
                        color: "red",
                      }}
                    >

                    {this.props.children}

                    </Entity>
                  </Joint>
                </Entity>
              </Joint>
            </Entity>
          </Joint>
        </Entity>
      </Joint>
    );
  }

}
