import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Arm from "./HeroModel/Arm";
import MainLeg from "./HeroModel/MainLeg";
import SecondaryLeg from "./HeroModel/SecondaryLeg";
import Joint from "./HeroModel/Joint";

export default class Hero extends Component {

  constructor(props) {
    super();

    let bodyHeight = Variables.heroHeight;
    let upperBodyHeight = bodyHeight / Math.pow(1.618, 2);
    let   neckToHead = upperBodyHeight / Math.pow(1.618, 2);
    let     neckHeight = upperBodyHeight / Math.pow(1.618, 4);
    let     neckWidth = neckHeight / 1.618;
    let     neckDepth = neckHeight / 1.618;
    let     headHeight = neckToHead - neckHeight;
    let     headWidth = headHeight / 1.618;
    let     headDepth = headHeight;
    let   navelToNeck = upperBodyHeight / Math.pow(1.618, 1);
    let     torsoHeight = upperBodyHeight / Math.pow(1.618, 1);
    let     torsoWidth = headHeight * 2;
    let     torsoDepth = headHeight;
    let     armHeight = navelToNeck;
    let     armWidth = armHeight / Math.pow(1.618, 3);
    let     armDepth = armHeight / Math.pow(1.618, 3);
    let lowerBodyHeight = bodyHeight / Math.pow(1.618, 1);
    let   footToKnee = lowerBodyHeight / Math.pow(1.618, 2);
    let     footHeight = footToKnee / Math.pow(1.618, 4);
    let     footWidth = footHeight;
    let     footDepth = footHeight * 4;
    let     calfHeight = footToKnee - footHeight;
    let     calfWidth = footWidth * 1.146;
    let     calfDepth = footWidth * 1.236;
    let   kneeToNavel = lowerBodyHeight / Math.pow(1.618, 1);
    let     thighHeight = kneeToNavel / Math.pow(1.618, 1);
    let     thighWidth = calfWidth * 1.5;
    let     thighDepth = calfWidth * 1.146;
    let     hipsHeight = kneeToNavel / Math.pow(1.618, 2);
    let     hipsWidth = headWidth * 2;
    let     hipsDepth = thighWidth;
    let     forearmHeight = kneeToNavel / Math.pow(1.618, 2);
    let     forearmWidth = forearmHeight / Math.pow(1.618, 3);
    let     forearmDepth = forearmHeight / Math.pow(1.618, 3);
    let     palmHeight = (kneeToNavel / Math.pow(1.618, 3)) / 2;
    let     palmWidth = forearmWidth * Math.pow(1.618, 1);
    let     palmDepth = forearmDepth / Math.pow(1.618, 1);
    let     fingersHeight = palmHeight;
    let     fingersWidth = palmWidth;
    let     fingersDepth = palmDepth;

    this.state = {
      body: {
        height: bodyHeight,
        upperHeight: upperBodyHeight,
        lowerHeight: lowerBodyHeight,
        neckToHead: neckToHead,
        navelToNeck: navelToNeck,
        footToKnee: footToKnee,
        kneeToNavel: kneeToNavel,
      },
      head: {
        height: headHeight,
        width: headWidth,
        depth: headDepth,
        joint: [0, 0, 0],
      },
      neck: {
        height: neckHeight,
        width: neckWidth,
        depth: neckDepth,
      },
      torso: {
        height: torsoHeight,
        width: torsoWidth,
        depth: torsoDepth,
        joint: [0, -10, 0],
      },
      hips: {
        height: hipsHeight,
        width: hipsWidth,
        depth: hipsDepth,
      },
      legs: {
        footHeight: footHeight,
        footWidth: footWidth,
        footDepth: footDepth,
        calfHeight: calfHeight,
        calfWidth: calfWidth,
        calfDepth: calfDepth,
        thighHeight: thighHeight,
        thighWidth: thighWidth,
        thighDepth: thighDepth,
        left: {
          ankleJoint: [-15, -15, -10],
          kneeJoint:  [0, 0, 0],
          thighJoint: [0, 0, 0],
        },
        right: {
          ankleJoint: [-15, -15, -10],
          kneeJoint:  [0, 0, 0],
          thighJoint: [0, 0, 0],
        },
      },
      arms: {
        armHeight: armHeight,
        armWidth: armWidth,
        armDepth: armDepth,
        forearmHeight: forearmHeight,
        forearmWidth: forearmWidth,
        forearmDepth: forearmDepth,
        palmHeight: palmHeight,
        palmWidth: palmWidth,
        palmDepth: palmDepth,
        fingersHeight: fingersHeight,
        fingersWidth: fingersWidth,
        fingersDepth: fingersDepth,
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
  }

  componentWillMount() {

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

  torsoJoint(state) {
    return [
      state.torso.joint[0],
      state.torso.joint[1] + (state.legs.left.ankleJoint[1] * -1),
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

  getLeg(leg) {
    let newLeg = Object.assign({}, leg);

    newLeg.ankleJoint = [
      leg.ankleJoint[0],
      leg.ankleJoint[1],
      leg.ankleJoint[2],
    ];

    newLeg.kneeJoint = [
      leg.kneeJoint[0] + (newLeg.ankleJoint[0] * -2),
      leg.kneeJoint[1],
      leg.kneeJoint[2],
    ];

    newLeg.thighJoint = [
      leg.thighJoint[0] + (newLeg.kneeJoint[0] / -2),
      leg.thighJoint[1],
      leg.thighJoint[2] + (newLeg.ankleJoint[2] * -1),
    ];

    return newLeg;
  }

  render() {
    return (
      <MainLeg
        model={this.state}
        leg={this.getLeg(this.state.legs.left)}
        position={[
          0,
          this.state.legs.footHeight * 0.5 - this.state.body.height * 0.5,
          this.state.legs.footDepth / -2,
        ]}
      >

        <Joint
          className="main-thigh-joint"
          position={[
            0,
            this.state.legs.thighHeight * 0.5,
            0,
          ]}
          rotation={this.getLeg(this.state.legs.left).thighJoint}
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

            <Joint
              className="secondary-thigh-joint"
              position={[
                this.state.hips.width / 2,
                this.state.hips.height / -2,
                0,
              ]}
              rotation={this.getLeg(this.state.legs.right).thighJoint}
            >
              <SecondaryLeg
                model={this.state}
                leg={this.getLeg(this.state.legs.right)}
              >
              </SecondaryLeg>
            </Joint>

            <Joint
              className="torsoJoint"
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
                  model={this.state}
                  arm={this.state.arms.left}
                  position={[
                    -this.state.torso.width * 0.5,
                    this.state.torso.height * 0.5,
                    0,
                  ]}
                />
                <Arm
                  model={this.state}
                  arm={this.state.arms.right}
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
                  <Joint
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
                  </Joint>
                </Entity>
              </Entity>
            </Joint>
          </Entity>
        </Joint>
      </MainLeg>
    );
  }

}
