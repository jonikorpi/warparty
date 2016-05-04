// import React, { Component } from "react";
// import Aframe from "aframe";
// import {Animation, Entity, Scene} from "aframe-react";
// import _ from "lodash";
// import AframeDrawComponent from "aframe-draw-component";
// Aframe.registerComponent("draw", AframeDrawComponent.component);
// import "aframe-htmltexture-component";
//
// import Variables from "../Variables";
//
// export default class Html extends Component {
//
//   constructor(props) {
//     super();
//   }
//
//   componentDidMount() {
//     this.textId = _.uniqueId('text-');
//   }
//
//   render() {
//     return (
//       <Entity
//         class="html"
//         geometry={{
//           primitive: "plane",
//           width: this.props.width,
//           height: this.props.height,
//         }}
//         draw={{
//           width: this.props.width * Variables.textureSize,
//           height: this.props.height * Variables.textureSize,
//         }}
//         htmltexture={{
//           asset: `#${this.textId}`,
//         }}
//         transparent={true}
//         position={this.props.position || [0,0,0]}
//         look-at={this.props.lookAtCamera ? "#camera" : false}
//       >
//
//         <div id={this.textId}>
//           {this.props.children}
//         </div>
//
//       </Entity>
//     );
//   }
//
// }
