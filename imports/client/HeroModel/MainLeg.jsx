import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../../Variables";

import Joint from "./Joint";

export default class MainLeg extends Component {

  constructor(props) {
    super();

    this.state = {
      model: props.model,
      leg: props.leg,
    };
  }

  render() {
    return (
      <Entity
        className="foot"
        geometry={{
          primitive: "box",
          width:  this.state.model.legs.footWidth,
          height: this.state.model.legs.footHeight,
          depth:  this.state.model.legs.footDepth,
        }}
        position={this.props.position}
        material={{
          color: "red",
        }}
      >
        <Joint
          className="ankle-joint"
          position={[
            0,
            this.state.model.legs.footHeight * 0.5,
            this.state.model.legs.footDepth / 2,
          ]}
          rotation={this.state.leg.ankleJoint}
        >
          <Entity
            className="calf"
            geometry={{
              primitive: "box",
              width:  this.state.model.legs.calfWidth,
              height: this.state.model.legs.calfHeight,
              depth:  this.state.model.legs.calfDepth,
            }}
            position={[
              0,
              this.state.model.legs.calfHeight * 0.5,
              0,
            ]}
            material={{
              color: "cyan",
            }}
          >
            <Joint
              className="knee-joint"
              position={[
                0,
                this.state.model.legs.calfHeight * 0.5,
                0,
              ]}
              rotation={this.state.leg.kneeJoint}
            >
              <Entity
                className="thigh"
                geometry={{
                  primitive: "box",
                  width:  this.state.model.legs.thighWidth,
                  height: this.state.model.legs.thighHeight,
                  depth:  this.state.model.legs.thighDepth,
                }}
                position={[
                  0,
                  this.state.model.legs.thighHeight * 0.5,
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
    );
  }

}
