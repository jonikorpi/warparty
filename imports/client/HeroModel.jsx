import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Arm from "./HeroModel/Arm";

export default class Hero extends Component {

  constructor(props) {
    super();

    this.bodyHeight = Variables.heroHeight;

    this.upperBodyHeight = this.bodyHeight / Math.pow(1.618, 2);
      this.neckToHead = this.upperBodyHeight / Math.pow(1.618, 2);
        this.neckHeight = this.upperBodyHeight / Math.pow(1.618, 4);
        this.neckWidth = this.neckHeight / 1.618;
        this.neckDepth = this.neckHeight / 1.618;
        this.headHeight = this.neckToHead - this.neckHeight;
        this.headWidth = this.headHeight / 1.618;
        this.headDepth = this.headHeight;
      this.navelToNeck = this.upperBodyHeight / Math.pow(1.618, 1);
        this.torsoHeight = this.upperBodyHeight / Math.pow(1.618, 1);
        this.torsoWidth = this.headHeight * 2;
        this.torsoDepth = this.headHeight;
        this.armHeight = this.navelToNeck;
        this.armWidth = this.armHeight / Math.pow(1.618, 3);
        this.armDepth = this.armHeight / Math.pow(1.618, 3);

    this.lowerBodyHeight = this.bodyHeight / Math.pow(1.618, 1);
      this.footToKnee = this.lowerBodyHeight / Math.pow(1.618, 2);
        this.footHeight = this.footToKnee / Math.pow(1.618, 4);
        this.footWidth = this.footHeight;
        this.footDepth = this.footHeight * 4;
        this.calfHeight = this.footToKnee - this.footHeight;
        this.calfWidth = this.footWidth * 1.146;
        this.calfDepth = this.footWidth * 1.236;
      this.kneeToNavel = this.lowerBodyHeight / Math.pow(1.618, 1);
        this.thighHeight = this.kneeToNavel / Math.pow(1.618, 1);
        this.thighWidth = this.calfWidth * 1.5;
        this.thighDepth = this.calfWidth * 1.146;
        this.hipsHeight = this.kneeToNavel / Math.pow(1.618, 2);
        this.hipsWidth = this.headWidth * 2;
        this.hipsDepth = this.thighWidth;
        this.forearmHeight = this.kneeToNavel / Math.pow(1.618, 2);
        this.forearmWidth = this.forearmHeight / Math.pow(1.618, 3);
        this.forearmDepth = this.forearmHeight / Math.pow(1.618, 3);
        this.palmHeight = (this.kneeToNavel / Math.pow(1.618, 3)) / 2;
        this.palmWidth = this.forearmWidth * Math.pow(1.618, 1);
        this.palmDepth = this.forearmDepth / Math.pow(1.618, 1);
        this.fingersHeight = this.palmHeight;
        this.fingersWidth = this.palmWidth;
        this.fingersDepth = this.palmDepth;

    this.state = {
      body: {
        height: this.bodyHeight,
        upperHeight: this.upperBodyHeight,
        lowerHeight: this.lowerBodyHeight,
        neckToHead: this.neckToHead,
        navelToNeck: this.navelToNeck,
        footToKnee: this.footToKnee,
        kneeToNavel: this.kneeToNavel,
      },
      head: {
        height: this.headHeight,
        width: this.headWidth,
        depth: this.headDepth,
        joint: [0, 0, 0],
      },
      neck: {
        height: this.neckHeight,
        width: this.neckWidth,
        depth: this.neckDepth,
      },
      torso: {
        height: this.torsoHeight,
        width: this.torsoWidth,
        depth: this.torsoDepth,
        joint: [0, -10, 0],
      },
      hips: {
        height: this.hipsHeight,
        width: this.hipsWidth,
        depth: this.hipsDepth,
      },
      legs: {
        footHeight: this.footHeight,
        footWidth: this.footWidth,
        footDepth: this.footDepth,
        calfHeight: this.calfHeight,
        calfWidth: this.calfWidth,
        calfDepth: this.calfDepth,
        thighHeight: this.thighHeight,
        thighWidth: this.thighWidth,
        thighDepth: this.thighDepth,
        left: {
          ankleJoint: [-15, -15, -10],
          kneeJoint:  [0, 0],
          thighJoint: [0, 0, 0],
        },
        right: {
          ankleJoint: [0, 0, 0],
          kneeJoint:  [0, 0],
          thighJoint: [0, 0, 0],
        },
      },
      arms: {
        armHeight: this.armHeight,
        armWidth: this.armWidth,
        armDepth: this.armDepth,
        forearmHeight: this.forearmHeight,
        forearmWidth: this.forearmWidth,
        forearmDepth: this.forearmDepth,
        palmHeight: this.palmHeight,
        palmWidth: this.palmWidth,
        palmDepth: this.palmDepth,
        fingersHeight: this.fingersHeight,
        fingersWidth: this.fingersWidth,
        fingersDepth: this.fingersDepth,
        left: {
          shoulderJoint: [0, 0, 170],
          elbowJoint:    [-5, 30, 0],
          wristJoint:    [-5, 0, 0],
          knuckleJoint:  [-45, 0, 0],
        },
        right: {
          shoulderJoint: [0, 0, -130],
          elbowJoint:    [-10, 30, 0],
          wristJoint:    [-10, 0, 0],
          knuckleJoint:  [-15, 0, 0],
        },
      },
    };

    this.leftAnkleJoint = this.leftAnkleJoint.bind(this);
    this.leftKneeJoint = this.leftKneeJoint.bind(this);
    this.leftThighJoint = this.leftThighJoint.bind(this);
    this.torsoJoint = this.torsoJoint.bind(this);
    this.headJoint = this.headJoint.bind(this);
  }

  componentDidMount() {

  }

  leftAnkleJoint(state) {
    return [
      state.legs.left.ankleJoint[0],
      state.legs.left.ankleJoint[1],
      state.legs.left.ankleJoint[2],
    ];
  }

  leftKneeJoint(state) {
    return [
      (this.leftAnkleJoint(state)[0] * -2) + state.legs.left.kneeJoint[0],
      state.legs.left.kneeJoint[1],
      0,
    ];
  }

  leftThighJoint(state) {
    return [
      (this.leftKneeJoint(state)[0] / -2) + state.legs.left.thighJoint[0],
      state.legs.left.thighJoint[1],
      (state.legs.left.ankleJoint[2] * -1) + state.legs.left.thighJoint[2],
    ];
  }

  torsoJoint(state) {
    return [
      state.torso.joint[0],
      (this.leftAnkleJoint(state)[1] * -1) + state.torso.joint[1],
      state.torso.joint[2],
    ];
  }

  headJoint(state) {
    return [
      state.head.joint[0],
      (state.torso.joint[1] * -1) + state.head.joint[1],
      state.head.joint[2],
    ];
  }

  render() {
    return (
      <Entity
        className="left-foot"
        geometry={{
          primitive: "box",
          width:  this.state.legs.footWidth,
          height: this.state.legs.footHeight,
          depth:  this.state.legs.footDepth,
        }}
        position={[
          0,
          this.state.legs.footHeight * 0.5 - this.state.body.height * 0.5,
          this.state.legs.footDepth / -2,
        ]}
        material={{
          color: "red",
        }}
      >
        <Entity
          className="left-ankle-joint"
          position={[
            0,
            this.state.legs.footHeight * 0.5,
            this.state.legs.footDepth / 2,
          ]}
          rotation={this.leftAnkleJoint(this.state)}
        >
          <Entity
            className="left-calf"
            geometry={{
              primitive: "box",
              width:  this.state.legs.calfWidth,
              height: this.state.legs.calfHeight,
              depth:  this.state.legs.calfDepth,
            }}
            position={[
              0,
              this.state.legs.calfHeight * 0.5,
              0,
            ]}
            material={{
              color: "cyan",
            }}
          >
            <Entity
              className="left-knee-joint"
              position={[
                0,
                this.state.legs.calfHeight * 0.5,
                0,
              ]}
              rotation={this.leftKneeJoint(this.state)}
            >
              <Entity
                className="left-calf"
                geometry={{
                  primitive: "box",
                  width:  this.state.legs.thighWidth,
                  height: this.state.legs.thighHeight,
                  depth:  this.state.legs.thighDepth,
                }}
                position={[
                  0,
                  this.state.legs.thighHeight * 0.5,
                  0,
                ]}
                material={{
                  color: "red",
                }}
              >
                <Entity
                  className="left-thigh-joint"
                  position={[
                    0,
                    this.state.legs.thighHeight * 0.5,
                    0,
                  ]}
                  rotation={this.leftThighJoint(this.state)}
                >
                  <Entity
                    className="hips"
                    geometry={{
                      primitive: "box",
                      width:  this.state.hips.width,
                      height: this.state.hips.height,
                      depth:  this.state.hips.depth,
                    }}
                    position={[
                      this.state.hips.width * 0.5,
                      this.state.hips.height * 0.5,
                      0,
                    ]}
                    material={{
                      color: "cyan",
                    }}
                  >
                    <Entity
                      className="spine-joint"
                      position={[
                        0,
                        this.state.hips.height * 0.5,
                        0,
                      ]}
                      rotation={this.torsoJoint(this.state)}
                    >
                      <Entity
                        className="torso"
                        geometry={{
                          primitive: "box",
                          width:  this.state.torso.width,
                          height: this.state.torso.height,
                          depth:  this.state.torso.depth,
                        }}
                        position={[
                          0,
                          this.state.torso.height * 0.5,
                          0,
                        ]}
                        material={{
                          color: "red",
                        }}
                      >

                        <Arm
                          body={this.state}
                          arm={this.state.arms.left}
                          scale={[1,1,1]}
                          position={[
                            -this.state.torso.width * 0.5,
                            this.state.torso.height * 0.5,
                            0,
                          ]}
                        />
                        <Arm
                          body={this.state}
                          arm={this.state.arms.right}
                          scale={[1,1,1]}
                          position={[
                            this.state.torso.width * 0.5,
                            this.state.torso.height * 0.5,
                            0,
                          ]}
                        />

                        <Entity
                          className="neck"
                          geometry={{
                            primitive: "box",
                            width:  this.state.neck.width,
                            height: this.state.neck.height,
                            depth:  this.state.neck.depth,
                          }}
                          position={[
                            0,
                            this.state.torso.height * 0.5 + this.state.neck.height * 0.5,
                            0,
                          ]}
                          material={{
                            color: "cyan",
                          }}
                        >
                          <Entity
                            className="head-joint"
                            position={[
                              0,
                              this.state.neck.height * 0.5,
                              0,
                            ]}
                            rotation={this.headJoint(this.state)}
                          >
                            <Entity
                              className="neck"
                              geometry={{
                                primitive: "box",
                                width:  this.state.head.width,
                                height: this.state.head.height,
                                depth:  this.state.head.depth,
                              }}
                              position={[
                                0,
                                this.state.head.height * 0.5,
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
            </Entity>
          </Entity>
        </Entity>
      </Entity>
    );
  }

}
