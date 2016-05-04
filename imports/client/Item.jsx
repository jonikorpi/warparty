import React, { Component } from "react";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";
import {Armor, Left, Right} from "../Items";

import Text from "./Text";

export default class Item extends Component {

  constructor(props) {
    super();

    this.getItem = this.getItem.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {

  }

  getPosition(slot) {
    switch (slot) {
      case 0:
        return [0,0,0];
      case 1:
        return [
          -Variables.heroWidth*0.5,
          0,
          0,
        ];
      case 2:
        return [
          Variables.heroWidth*0.5,
          0,
          0,
        ];
    }
  }

  getItem(type, slot, spinning, onClick) {
    let category, animation;

    switch (slot) {
      case 0:
        category = Armor;
        break;
      case 1:
        category = Left;
        break;
      case 2:
        category = Right;
        break;
    }

    if (spinning) {
      animation = (
        <Animation
          attribute="rotation"
          dur={Variables.longTime(5)}
          fill="forwards"
          to="0 360 0"
          repeat="indefinite"
          easing="linear"
        />
      );
    }
    else {
      animation = false;
    }

    return (
      <Entity
        material={category[type].material}
        geometry={category[type].geometry}
        onClick={this.onClick}
      >

        {animation}

      </Entity>
    );
  }

  getHighlightEffect(highlight) {
    if (highlight) {
      return (
        <Entity
          geometry={{
            primitive: "box",
            width: Variables.tileSize,
            height: Variables.tileSize * 0.1,
            depth: Variables.tileSize,
          }}
          position={[
            0,
            (Variables.tileSize * -0.5) + (Variables.tileSize * 0.1 * 0.5),
            0,
          ]}
          material={{
            color: "yellow",
          }}
        />
      );
    }
  }

  onClick() {
    if (this.props.doOnClick) {
      this.props.doOnClick(
        this.props.heroID,
        this.props.slot,
        this.props.data
      );
    }
  }

  render() {
    return (
      <Entity
        class="item"
        data-item-id={this.props.data}
        position={this.props.position || this.getPosition(this.props.slot)}
      >

        {this.getItem(
          this.props.data,
          this.props.slot,
          this.props.spinning
        )}

        {this.getHighlightEffect(this.props.highlight)}

      </Entity>
    );
  }

}
